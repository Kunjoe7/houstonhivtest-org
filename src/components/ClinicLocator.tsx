'use client'

import { useState, useEffect } from 'react'
import InteractiveMap from './InteractiveMap'

interface TestingSite {
  id: number
  name: string
  address: string
  phone: string
  hours: string
  services: string[]
  lat: number
  lng: number
  website?: string
}

// Real HIV testing locations in Houston
const houstonTestingSites: TestingSite[] = [
  {
    id: 1,
    name: "Legacy Community Health - Montrose",
    address: "1415 California St, Houston, TX 77006",
    phone: "(832) 548-5000",
    hours: "Mon-Fri 8AM-5PM, Sat 8AM-12PM",
    services: ["Free HIV Testing", "Rapid Results", "PrEP Services", "STD Testing"],
    lat: 29.7372,
    lng: -95.3914,
    website: "https://legacycommunityhealth.org"
  },
  {
    id: 2,
    name: "The Montrose Center",
    address: "401 Branard St, Houston, TX 77006",
    phone: "(713) 529-0037",
    hours: "Mon-Thu 9AM-9PM, Fri 9AM-5PM, Sat 9AM-1PM",
    services: ["Free HIV Testing", "LGBTQ+ Counseling", "Support Groups", "PrEP Navigation"],
    lat: 29.7370,
    lng: -95.3890,
    website: "https://montrosecenter.org"
  },
  {
    id: 3,
    name: "Harris Health System - Strawberry Health Center",
    address: "1100 Willow St, Houston, TX 77002",
    phone: "(713) 566-6400",
    hours: "Mon-Fri 7AM-7PM, Sat 8AM-4PM",
    services: ["Free HIV Testing", "Primary Care", "Women's Health", "Pharmacy"],
    lat: 29.7520,
    lng: -95.3698
  },
  {
    id: 4,
    name: "Avenue 360 Health & Wellness",
    address: "2441 High Star Dr, Houston, TX 77067",
    phone: "(713) 572-3060",
    hours: "Mon-Fri 8AM-5PM",
    services: ["HIV Testing", "Treatment Services", "Case Management", "Mental Health"],
    lat: 29.9499,
    lng: -95.4194,
    website: "https://avenue360.org"
  },
  {
    id: 5,
    name: "Houston Health Department - Northside Health Center",
    address: "8504 Schuller Rd, Houston, TX 77093",
    phone: "(832) 393-5427",
    hours: "Mon-Fri 7:30AM-4:30PM",
    services: ["Free HIV Testing", "STD Testing", "Immunizations", "Family Planning"],
    lat: 29.8463,
    lng: -95.3368
  },
  {
    id: 6,
    name: "Legacy Community Health - Southwest",
    address: "2001 Wilcrest Dr, Houston, TX 77042",
    phone: "(832) 548-5000",
    hours: "Mon-Fri 8AM-5PM",
    services: ["Free HIV Testing", "Bilingual Services", "Pediatric Care", "Dental"],
    lat: 29.7108,
    lng: -95.5847,
    website: "https://legacycommunityhealth.org"
  }
]

export default function ClinicLocator() {
  const [zipCode, setZipCode] = useState('')
  const [selectedSite, setSelectedSite] = useState<TestingSite | null>(null)
  const [filteredSites, setFilteredSites] = useState<TestingSite[]>(houstonTestingSites)
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null)
  const [loading, setLoading] = useState(false)
  const [mapCenter, setMapCenter] = useState({ lat: 29.7604, lng: -95.3698 }) // Houston center

  const handleZipSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!zipCode) return
    
    setLoading(true)
    
    // Simulate geocoding the ZIP code (in real app, use geocoding API)
    setTimeout(() => {
      // Filter sites based on proximity (simplified for demo)
      const filtered = houstonTestingSites.filter(site => {
        // Simple distance calculation based on ZIP code areas
        const zipAreas: {[key: string]: {lat: number, lng: number}} = {
          '77002': { lat: 29.7520, lng: -95.3698 }, // Downtown
          '77006': { lat: 29.7370, lng: -95.3890 }, // Montrose
          '77042': { lat: 29.7108, lng: -95.5847 }, // Southwest
          '77067': { lat: 29.9499, lng: -95.4194 }, // Northwest
          '77093': { lat: 29.8463, lng: -95.3368 }  // Northside
        }
        
        const zipLocation = zipAreas[zipCode]
        if (!zipLocation) return true // Show all if ZIP not in our list
        
        const distance = Math.sqrt(
          Math.pow(site.lat - zipLocation.lat, 2) + 
          Math.pow(site.lng - zipLocation.lng, 2)
        )
        return distance < 0.2 // Rough proximity filter
      })
      
      setFilteredSites(filtered.length > 0 ? filtered : houstonTestingSites)
      if (zipCode in {'77002': 1, '77006': 1, '77042': 1, '77067': 1, '77093': 1}) {
        const zipAreas: {[key: string]: {lat: number, lng: number}} = {
          '77002': { lat: 29.7520, lng: -95.3698 },
          '77006': { lat: 29.7370, lng: -95.3890 },
          '77042': { lat: 29.7108, lng: -95.5847 },
          '77067': { lat: 29.9499, lng: -95.4194 },
          '77093': { lat: 29.8463, lng: -95.3368 }
        }
        setMapCenter(zipAreas[zipCode])
      }
      setLoading(false)
    }, 1000)
  }

  const handleLocationSearch = () => {
    setLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setUserLocation(userLoc)
          setMapCenter(userLoc)
          
          // Sort sites by distance from user
          const sitesWithDistance = houstonTestingSites.map(site => ({
            ...site,
            distance: Math.sqrt(
              Math.pow(site.lat - userLoc.lat, 2) + 
              Math.pow(site.lng - userLoc.lng, 2)
            )
          })).sort((a, b) => a.distance - b.distance)
          
          setFilteredSites(sitesWithDistance)
          setLoading(false)
        },
        (error) => {
          setLoading(false)
          alert('Unable to get your location. Please try entering your ZIP code.')
        }
      )
    } else {
      setLoading(false)
      alert('Geolocation is not supported by this browser.')
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 3959 // Earth's radius in miles
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Find HIV Testing Near You
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Locate free, confidential HIV testing sites in the Houston area. 
          All locations are LGBTQ+ friendly and provide culturally competent care.
        </p>
      </div>

      {/* Search Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-6">
          {/* ZIP Code Search */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">📍</span>
              Search by ZIP Code
            </h3>
            <form onSubmit={handleZipSearch} className="space-y-4">
              <input
                type="text"
                placeholder="Enter ZIP code (e.g., 77006)"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pride-purple focus:border-transparent"
                pattern="[0-9]{5}"
                maxLength={5}
              />
              <button
                type="submit"
                disabled={loading || !zipCode}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? 'Searching...' : 'Find Testing Sites'}
              </button>
            </form>
          </div>

          {/* Location Search */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              Use My Location
            </h3>
            <p className="text-gray-600 mb-4 text-sm">
              Find the closest testing sites to your current location
            </p>
            <button
              onClick={handleLocationSearch}
              disabled={loading}
              className="btn-secondary w-full disabled:opacity-50"
            >
              {loading ? 'Locating...' : 'Use My Location'}
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map */}
      <InteractiveMap 
        sites={filteredSites}
        selectedSite={selectedSite}
        onSiteSelect={setSelectedSite}
        userLocation={userLocation}
      />

      {/* Testing Sites List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.map((site, index) => (
          <div 
            key={site.id} 
            className={`card cursor-pointer transition-all duration-200 ${
              selectedSite?.id === site.id ? 'ring-2 ring-pride-purple shadow-lg' : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedSite(selectedSite?.id === site.id ? null : site)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-pride-teal text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{site.name}</h4>
                <p className="text-sm text-gray-600">{site.address}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href={`tel:${site.phone}`} className="text-pride-purple hover:underline">
                  {site.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>🕒</span>
                {site.hours}
              </p>
              
              {userLocation && (
                <p className="flex items-center gap-2 text-pride-teal font-medium">
                  <span>📍</span>
                  {calculateDistance(userLocation.lat, userLocation.lng, site.lat, site.lng).toFixed(1)} miles away
                </p>
              )}
            </div>
            
            <div className="mt-3 flex flex-wrap gap-1">
              {site.services.slice(0, 2).map((service, idx) => (
                <span key={idx} className="text-xs bg-pride-purple/10 text-pride-purple px-2 py-1 rounded">
                  {service}
                </span>
              ))}
              {site.services.length > 2 && (
                <span className="text-xs text-gray-500">+{site.services.length - 2} more</span>
              )}
            </div>
            
            <div className="mt-4 flex gap-2">
              <button 
                className="btn-primary text-sm flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`https://maps.google.com/?q=${encodeURIComponent(site.address)}`, '_blank')
                }}
              >
                Get Directions
              </button>
              {site.website && (
                <button 
                  className="btn-secondary text-sm px-3"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(site.website, '_blank')
                  }}
                >
                  Website
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Info */}
      <div className="bg-gradient-to-r from-pride-purple/5 to-pride-teal/5 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-center mb-6">What to Expect</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">⏰</div>
            <h4 className="font-semibold mb-2">Quick & Easy</h4>
            <p className="text-sm text-gray-600">Most tests take 15-20 minutes with rapid results</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h4 className="font-semibold mb-2">Confidential</h4>
            <p className="text-sm text-gray-600">Your privacy is protected by law</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💝</div>
            <h4 className="font-semibold mb-2">Free Testing</h4>
            <p className="text-sm text-gray-600">No insurance or ID required at most locations</p>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

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

interface InteractiveMapProps {
  sites: TestingSite[]
  selectedSite: TestingSite | null
  onSiteSelect: (site: TestingSite | null) => void
  userLocation?: { lat: number; lng: number } | null
}

export default function InteractiveMap({ sites, selectedSite, onSiteSelect, userLocation }: InteractiveMapProps) {
  // Convert lat/lng to SVG coordinates for Houston area
  const mapBounds = {
    north: 30.1,
    south: 29.4,
    east: -95.0,
    west: -95.8
  }

  const convertToSVG = (lat: number, lng: number) => {
    const x = ((lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 800
    const y = ((mapBounds.north - lat) / (mapBounds.north - mapBounds.south)) * 600
    return { x: Math.max(20, Math.min(780, x)), y: Math.max(20, Math.min(580, y)) }
  }

  return (
    <div className="relative bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-2xl font-semibold">Houston HIV Testing Locations Map</h3>
        <p className="text-gray-600 mt-2">
          Click on map markers to view details and get directions
        </p>
      </div>
      
      <div className="relative">
        <svg
          width="100%"
          height="600"
          viewBox="0 0 800 600"
          className="bg-gradient-to-br from-blue-100 to-green-100"
        >
          {/* Houston area background with realistic features */}
          <defs>
            {/* Street grid pattern */}
            <pattern id="streets" width="50" height="50" patternUnits="userSpaceOnUse">
              <rect width="50" height="50" fill="#f8fafc"/>
              <path d="M 0 25 L 50 25 M 25 0 L 25 50" stroke="#e2e8f0" strokeWidth="1"/>
            </pattern>
            
            {/* Park/green space pattern */}
            <pattern id="parks" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#dcfce7"/>
              <circle cx="10" cy="10" r="3" fill="#16a34a" opacity="0.3"/>
            </pattern>
            
            {/* Water pattern */}
            <pattern id="water" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="#dbeafe"/>
              <path d="M 0 15 Q 7.5 10 15 15 Q 22.5 20 30 15" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.5"/>
            </pattern>
          </defs>
          
          {/* Base map with street grid */}
          <rect width="800" height="600" fill="url(#streets)" />
          
          {/* Geographic areas */}
          
          {/* Greater Houston area outline */}
          <ellipse cx="400" cy="300" rx="350" ry="250" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" opacity="0.7" />
          
          {/* Buffalo Bayou and waterways */}
          <path d="M 150 320 Q 250 310 350 320 Q 450 330 550 340 Q 650 350 750 360" 
                stroke="#3b82f6" strokeWidth="8" fill="none" opacity="0.8" />
          <path d="M 150 320 Q 250 310 350 320 Q 450 330 550 340 Q 650 350 750 360" 
                stroke="url(#water)" strokeWidth="20" fill="none" opacity="0.6" />
          
          {/* Ship Channel */}
          <path d="M 500 400 Q 600 420 700 450" 
                stroke="#1e40af" strokeWidth="6" fill="none" opacity="0.7" />
          
          {/* Major highways with realistic styling */}
          <g stroke="#374151" strokeWidth="4" fill="none" opacity="0.8">
            {/* I-45 (Gulf Freeway) */}
            <path d="M 200 100 Q 300 200 400 300 Q 500 400 600 500" strokeDasharray="0"/>
            {/* I-10 (Katy Freeway) */}
            <path d="M 50 300 L 750 300" strokeDasharray="0"/>
            {/* US-59/I-69 (Southwest/Eastex Freeway) */}
            <path d="M 100 500 Q 200 400 300 300 Q 400 200 500 100" strokeDasharray="0"/>
            {/* I-610 (Inner Loop) */}
            <ellipse cx="400" cy="300" rx="150" ry="120" fill="none" stroke="#374151" strokeWidth="3" opacity="0.6" />
            {/* Beltway 8 */}
            <ellipse cx="400" cy="300" rx="280" ry="220" fill="none" stroke="#6b7280" strokeWidth="2" opacity="0.5" />
          </g>
          
          {/* Highway labels */}
          <text x="300" y="95" textAnchor="middle" className="text-xs font-bold fill-gray-600">I-45</text>
          <text x="60" y="295" textAnchor="middle" className="text-xs font-bold fill-gray-600">I-10</text>
          <text x="110" y="485" textAnchor="middle" className="text-xs font-bold fill-gray-600">US-59</text>
          
          {/* Neighborhoods and districts */}
          
          {/* Downtown Houston */}
          <rect x="350" y="280" width="100" height="80" fill="#64748b" opacity="0.4" rx="5" stroke="#475569" strokeWidth="1"/>
          <rect x="360" y="290" width="15" height="25" fill="#374151" opacity="0.6"/>
          <rect x="380" y="285" width="12" height="30" fill="#374151" opacity="0.6"/>
          <rect x="400" y="295" width="18" height="20" fill="#374151" opacity="0.6"/>
          <rect x="425" y="288" width="14" height="27" fill="#374151" opacity="0.6"/>
          <text x="400" y="375" textAnchor="middle" className="text-sm font-bold fill-gray-800">Downtown</text>
          
          {/* Montrose District */}
          <rect x="300" y="320" width="80" height="60" fill="#a855f7" opacity="0.3" rx="5" stroke="#7c3aed" strokeWidth="1"/>
          <text x="340" y="355" textAnchor="middle" className="text-xs font-semibold fill-purple-800">Montrose</text>
          
          {/* Medical Center */}
          <rect x="380" y="380" width="90" height="70" fill="#dc2626" opacity="0.3" rx="5" stroke="#b91c1c" strokeWidth="1"/>
          <circle cx="410" cy="405" r="8" fill="#ef4444" opacity="0.6"/>
          <circle cx="435" cy="415" r="6" fill="#ef4444" opacity="0.6"/>
          <circle cx="450" cy="400" r="7" fill="#ef4444" opacity="0.6"/>
          <text x="425" y="435" textAnchor="middle" className="text-xs font-semibold fill-red-800">Medical Center</text>
          
          {/* Heights */}
          <rect x="320" y="220" width="70" height="50" fill="#059669" opacity="0.3" rx="3" stroke="#047857" strokeWidth="1"/>
          <text x="355" y="250" textAnchor="middle" className="text-xs font-semibold fill-green-800">Heights</text>
          
          {/* Galleria */}
          <rect x="250" y="280" width="60" height="50" fill="#d97706" opacity="0.3" rx="3" stroke="#b45309" strokeWidth="1"/>
          <text x="280" y="310" textAnchor="middle" className="text-xs font-semibold fill-orange-800">Galleria</text>
          
          {/* River Oaks */}
          <rect x="280" y="250" width="50" height="40" fill="#7c2d12" opacity="0.3" rx="3" stroke="#92400e" strokeWidth="1"/>
          <text x="305" y="275" textAnchor="middle" className="text-xs font-semibold fill-amber-900">River Oaks</text>
          
          {/* Midtown */}
          <rect x="360" y="340" width="50" height="35" fill="#be185d" opacity="0.3" rx="3" stroke="#9d174d" strokeWidth="1"/>
          <text x="385" y="362" textAnchor="middle" className="text-xs font-semibold fill-pink-800">Midtown</text>
          
          {/* Parks and green spaces */}
          <ellipse cx="330" cy="200" rx="25" ry="20" fill="url(#parks)" stroke="#16a34a" strokeWidth="1" opacity="0.8"/>
          <text x="330" y="205" textAnchor="middle" className="text-xs fill-green-800">Memorial Park</text>
          
          <ellipse cx="450" cy="250" rx="20" ry="15" fill="url(#parks)" stroke="#16a34a" strokeWidth="1" opacity="0.8"/>
          <text x="450" y="255" textAnchor="middle" className="text-xs fill-green-800">Discovery Green</text>
          
          {/* Airport */}
          <rect x="500" y="150" width="40" height="30" fill="#6b7280" opacity="0.4" rx="3" stroke="#4b5563" strokeWidth="1"/>
          <path d="M 510 160 L 530 165 L 510 170 Z" fill="#374151"/>
          <text x="520" y="185" textAnchor="middle" className="text-xs fill-gray-700">IAH</text>
          
          {/* Port of Houston */}
          <rect x="550" y="420" width="60" height="40" fill="#1e40af" opacity="0.3" rx="3" stroke="#1d4ed8" strokeWidth="1"/>
          <rect x="560" y="430" width="8" height="8" fill="#1e40af" opacity="0.6"/>
          <rect x="575" y="435" width="6" height="6" fill="#1e40af" opacity="0.6"/>
          <rect x="590" y="432" width="7" height="7" fill="#1e40af" opacity="0.6"/>
          <text x="580" y="450" textAnchor="middle" className="text-xs fill-blue-800">Port</text>
          
          {/* Testing site markers */}
          {sites.map((site, index) => {
            const { x, y } = convertToSVG(site.lat, site.lng)
            const isSelected = selectedSite?.id === site.id
            
            return (
              <g key={site.id}>
                {/* Marker shadow */}
                <circle
                  cx={x + 2}
                  cy={y + 2}
                  r={isSelected ? 18 : 15}
                  fill="rgba(0,0,0,0.2)"
                />
                
                {/* Marker */}
                <circle
                  cx={x}
                  cy={y}
                  r={isSelected ? 16 : 13}
                  fill={isSelected ? "#8b5cf6" : "#06b6d4"}
                  stroke="white"
                  strokeWidth="3"
                  className="cursor-pointer transition-all duration-200 hover:scale-110"
                  onClick={() => onSiteSelect(isSelected ? null : site)}
                />
                
                {/* Marker number */}
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-white text-xs font-bold pointer-events-none"
                >
                  {index + 1}
                </text>
                
                {/* Pulse animation for selected marker */}
                {isSelected && (
                  <circle
                    cx={x}
                    cy={y}
                    r="20"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="2"
                    opacity="0.6"
                    className="animate-ping"
                  />
                )}
              </g>
            )
          })}
          
          {/* User location marker */}
          {userLocation && (
            <g>
              {(() => {
                const { x, y } = convertToSVG(userLocation.lat, userLocation.lng)
                return (
                  <>
                    <circle
                      cx={x}
                      cy={y}
                      r="8"
                      fill="#ef4444"
                      stroke="white"
                      strokeWidth="2"
                      className="animate-pulse"
                    />
                    <circle
                      cx={x}
                      cy={y}
                      r="15"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-ping"
                    />
                  </>
                )
              })()}
            </g>
          )}
        </svg>
        
        {/* Map legend */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h4 className="font-semibold text-gray-800 mb-3">Map Legend</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-cyan-500 rounded-full border-2 border-white"></div>
              <span>HIV Testing Sites</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-purple-600 rounded-full border-2 border-white"></div>
              <span>Selected Site</span>
            </div>
            {userLocation && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
                <span>Your Location</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-blue-400 rounded"></div>
              <span>Buffalo Bayou</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-gray-400 rounded"></div>
              <span>Major Highways</span>
            </div>
          </div>
        </div>
        
        {/* Selected site tooltip */}
        {selectedSite && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-xl p-4 w-80 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <h5 className="font-semibold text-gray-900 text-lg">{selectedSite.name}</h5>
              <button
                onClick={() => onSiteSelect(null)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ×
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-2">{selectedSite.address}</p>
            <p className="text-sm text-gray-600 mb-2">📞 {selectedSite.phone}</p>
            <p className="text-sm text-gray-600 mb-3">🕒 {selectedSite.hours}</p>
            
            <div className="flex flex-wrap gap-1 mb-3">
              {selectedSite.services.slice(0, 3).map((service, idx) => (
                <span key={idx} className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                  {service}
                </span>
              ))}
            </div>
            
            <div className="flex gap-2">
              <button 
                className="flex-1 bg-purple-600 text-white text-sm px-3 py-2 rounded hover:bg-purple-700 transition-colors"
                onClick={() => window.open(`https://maps.google.com/?q=${encodeURIComponent(selectedSite.address)}`, '_blank')}
              >
                Get Directions
              </button>
              {selectedSite.website && (
                <button 
                  className="flex-1 bg-cyan-600 text-white text-sm px-3 py-2 rounded hover:bg-cyan-700 transition-colors"
                  onClick={() => window.open(selectedSite.website, '_blank')}
                >
                  Visit Website
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Zoom controls */}
        <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg">
          <button className="block p-3 hover:bg-gray-50 border-b border-gray-200">
            <span className="text-lg font-bold">+</span>
          </button>
          <button className="block p-3 hover:bg-gray-50">
            <span className="text-lg font-bold">−</span>
          </button>
        </div>
      </div>
    </div>
  )
}

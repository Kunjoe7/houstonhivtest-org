'use client'

import { useState } from 'react'

interface Event {
  id: number
  name: string
  date: string
  time: string
  location: string
  description: string
  link?: string
  featured?: boolean
}

export default function CommunityEvents() {
  // Mock data for community events
  const [events] = useState<Event[]>([
    {
      id: 1,
      name: "Pride Houston 2025",
      date: "June 28, 2025",
      time: "10:00 AM - 8:00 PM",
      location: "Downtown Houston",
      description: "Join us at Houston's biggest Pride celebration! Free HIV testing, community resources, and celebration of LGBTQ+ pride.",
      link: "https://pridehouston.org",
      featured: true
    },
    {
      id: 2,
      name: "Juneteenth Freedom Festival",
      date: "June 19, 2025",
      time: "12:00 PM - 6:00 PM",
      location: "Emancipation Park",
      description: "Celebrating freedom and community health. Free health screenings and HIV testing available.",
      link: "#",
      featured: false
    },
    {
      id: 3,
      name: "Houston Latin Fest",
      date: "July 12, 2025",
      time: "11:00 AM - 9:00 PM",
      location: "Miller Outdoor Theatre",
      description: "Celebrating Latino culture with health resources, including confidential HIV testing in Spanish.",
      link: "#",
      featured: false
    },
    {
      id: 4,
      name: "Black Health Matters Summit",
      date: "August 15, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "NRG Center",
      description: "Community health summit focusing on Black health equity, featuring free HIV testing and education.",
      link: "#",
      featured: false
    }
  ])

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gradient mb-4">
        Community Events & Outreach
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Connect with your community at upcoming events featuring free HIV testing, 
        health resources, and celebration of our diverse Houston communities.
      </p>

      <div className="grid gap-6 max-w-6xl mx-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className={`card text-left ${
              event.featured 
                ? 'bg-gradient-to-r from-pride-purple/10 to-pride-teal/10 border-pride-purple/30 ring-2 ring-pride-purple/20' 
                : ''
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">
              {/* Event Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                      {event.featured && <span className="text-2xl">🏳️‍🌈</span>}
                      {event.name}
                      {event.featured && (
                        <span className="bg-pride-purple text-white text-xs px-2 py-1 rounded-full">
                          FEATURED
                        </span>
                      )}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <span className="text-lg">📅</span>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">⏰</span>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-lg">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {event.description}
                </p>

                {/* Event Features */}
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-community-green/10 text-community-green text-xs px-3 py-1 rounded-full font-medium">
                    🧪 Free HIV Testing
                  </span>
                  <span className="bg-pride-teal/10 text-pride-teal text-xs px-3 py-1 rounded-full font-medium">
                    🏳️‍🌈 LGBTQ+ Friendly
                  </span>
                  <span className="bg-empowerment-gold/10 text-empowerment-gold text-xs px-3 py-1 rounded-full font-medium">
                    🌍 Culturally Inclusive
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <div className="lg:w-48 flex flex-col gap-3">
                {event.link && event.link !== '#' ? (
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-center"
                  >
                    Learn More
                  </a>
                ) : (
                  <button className="btn-secondary opacity-75 cursor-not-allowed">
                    More Info Soon
                  </button>
                )}
                
                {event.featured && (
                  <div className="text-center">
                    <p className="text-xs text-pride-purple font-semibold">
                      🎉 Don't miss this special event!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-12 card bg-gradient-to-r from-pride-pink/10 to-pride-yellow/10 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Want to Stay Updated?</h3>
        <p className="text-gray-700 mb-6">
          Get notified about upcoming community events, health fairs, and free testing opportunities in Houston.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">
            📧 Subscribe to Updates
          </button>
          <button className="btn-secondary">
            📱 Follow on Social Media
          </button>
        </div>
      </div>

      {/* Data Source Note */}
      <p className="text-xs text-gray-500 mt-6">
        Event information sourced from community partners and local organizations. 
        Dates and details subject to change.
      </p>
    </div>
  )
}

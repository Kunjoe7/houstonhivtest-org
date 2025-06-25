'use client'

import { useState } from 'react'

interface Organization {
  id: number
  name: string
  description: string
  website: string
  phone: string
  address?: string
  services: string[]
}

export default function SupportDirectory() {
  const [organizations] = useState<Organization[]>([
    {
      id: 1,
      name: "The Montrose Center",
      description: "LGBTQ community center with free walk-in HIV testing and support services",
      website: "https://montrosecenter.org",
      phone: "(713) 529-0037",
      address: "401 Branard St, Houston, TX 77006",
      services: ["Free HIV Testing", "Counseling", "Support Groups", "Youth Programs"]
    },
    {
      id: 2,
      name: "Legacy Community Health",
      description: "Community health clinics offering FREE, fast, confidential HIV testing across Houston",
      website: "https://legacycommunityhealth.org",
      phone: "(832) 548-5000",
      address: "Multiple locations throughout Houston",
      services: ["Free HIV Testing", "PrEP Services", "Treatment", "Bilingual Services"]
    }
  ])

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gradient mb-4">
        Community Support & Resources
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Connect with trusted local organizations offering HIV testing, support services, 
        and healthcare for Houston's LGBTQ+ and BIPOC communities.
      </p>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {organizations.map((org) => (
          <div key={org.id} className="card text-left">
            <h3 className="text-2xl font-bold mb-3 text-pride-purple">{org.name}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{org.description}</p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-xl">🌐</span>
                <a 
                  href={org.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-pride-teal hover:underline"
                >
                  Visit Website
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <a href={`tel:${org.phone}`} className="text-pride-teal hover:underline">
                  {org.phone}
                </a>
              </div>
              {org.address && (
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <span className="text-gray-600">{org.address}</span>
                </div>
              )}
            </div>

            <div>
              <h4 className="font-semibold mb-2">Services:</h4>
              <div className="flex flex-wrap gap-2">
                {org.services.map((service, index) => (
                  <span 
                    key={index}
                    className="bg-community-green/10 text-community-green text-xs px-3 py-1 rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 card bg-gradient-to-r from-trust-navy/10 to-pride-purple/10 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Need to Talk to Someone?</h3>
        <p className="text-gray-700 mb-6">
          These organizations provide confidential support, counseling, and resources. 
          Don't hesitate to reach out - your health and wellbeing matter.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-primary">
            📞 Crisis Support Hotline
          </button>
          <button className="btn-secondary">
            💬 Online Chat Support
          </button>
        </div>
      </div>
    </div>
  )
}

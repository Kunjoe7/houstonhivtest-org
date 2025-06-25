'use client'

import { useState } from 'react'
import HeroSection from '@/components/HeroSection'
import ChatbotScreening from '@/components/ChatbotScreening'
import ClinicLocator from '@/components/ClinicLocator'
import TestKitForm from '@/components/TestKitForm'
import CommunityEvents from '@/components/CommunityEvents'
import ReminderSignup from '@/components/ReminderSignup'
import SupportDirectory from '@/components/SupportDirectory'
import InfluencerCarousel from '@/components/InfluencerCarousel'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-pattern">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Risk Assessment */}
      <section id="risk-assessment" className="section-padding bg-gradient-to-r from-pride-purple/5 to-pride-teal/5">
        <div className="container-max">
          <ChatbotScreening />
        </div>
      </section>
      
      {/* Clinic Locator */}
      <section id="clinic-locator" className="section-padding bg-white">
        <div className="container-max">
          <ClinicLocator />
        </div>
      </section>
      
      {/* Test Kit Order Form */}
      <section id="test-kit" className="section-padding bg-gradient-to-r from-pride-purple/5 to-pride-teal/5">
        <div className="container-max">
          <TestKitForm />
        </div>
      </section>
      
      {/* Community Events */}
      <section id="events" className="section-padding bg-white">
        <div className="container-max">
          <CommunityEvents />
        </div>
      </section>
      
      {/* Influencer Stories */}
      <section id="stories" className="section-padding bg-gradient-to-r from-pride-pink/5 to-pride-yellow/5">
        <div className="container-max">
          <InfluencerCarousel />
        </div>
      </section>
      
      {/* Reminder Signup */}
      <section id="reminders" className="section-padding bg-white">
        <div className="container-max">
          <ReminderSignup />
        </div>
      </section>
      
      {/* Support Directory */}
      <section id="support" className="section-padding bg-gradient-to-r from-community-green/5 to-trust-navy/5">
        <div className="container-max">
          <SupportDirectory />
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </main>
  )
}

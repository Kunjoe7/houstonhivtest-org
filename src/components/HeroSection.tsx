'use client'

import { useState } from 'react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pride-purple via-pride-pink to-pride-teal overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-pattern opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 text-shadow">
          Know Your Status,
          <br />
          <span className="text-pride-yellow">Own Your Health</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Free, confidential HIV testing for Houston's LGBTQ+ and BIPOC communities. 
          <span className="block mt-2 font-semibold">Your health, your choice, your community.</span>
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a 
            href="#find-testing" 
            className="btn-primary bg-white text-pride-purple hover:bg-gray-100 text-lg px-8 py-4 w-full sm:w-auto"
          >
            🗺️ Find Testing Near Me
          </a>
          <a 
            href="#home-test" 
            className="btn-secondary bg-pride-yellow text-gray-900 hover:bg-pride-yellow/90 text-lg px-8 py-4 w-full sm:w-auto"
          >
            📦 Order Free Home Test
          </a>
        </div>
        
        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-6 text-white/80 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🔒</span>
            <span>100% Confidential</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">💝</span>
            <span>Completely Free</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">⚡</span>
            <span>Fast Results</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏳️‍🌈</span>
            <span>LGBTQ+ Friendly</span>
          </div>
        </div>
        
        {/* Pride Houston 2025 Banner */}
        <div className="mt-12 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
          <p className="text-white font-semibold text-lg">
            🏳️‍🌈 Pride Houston 2025 - June 28th
          </p>
          <p className="text-white/90 mt-1">
            Join us for free testing and community resources at the festival!
          </p>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  )
}

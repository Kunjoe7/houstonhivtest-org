'use client'

import { useState } from 'react'

export default function TestKitForm() {
  const [formData, setFormData] = useState({
    zipCode: '',
    name: '',
    contactMethod: 'email',
    contact: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      // Simulate SMS/Email confirmation
      if (formData.contactMethod === 'phone') {
        alert(`SMS sent to ${formData.contact}: "Thank you ${formData.name}! Your free HIV test kit is on the way. You'll receive tracking info within 24 hours."`)
      } else {
        alert(`Email sent to ${formData.contact}: "Thank you ${formData.name}! Your free HIV test kit is on the way."`)
      }
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <div className="text-center max-w-2xl mx-auto">
        <div className="card bg-gradient-to-r from-community-green/10 to-pride-teal/10 border-community-green/20">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-3xl font-bold text-community-green mb-4">
            Test Kit Requested!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Thank you, {formData.name}! Your free HIV test kit is on the way.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-2">What happens next:</h3>
            <ul className="text-left space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <span className="text-community-green">📦</span>
                Your kit will arrive in 3-5 business days in discreet packaging
              </li>
              <li className="flex items-center gap-2">
                <span className="text-community-green">📱</span>
                You'll receive tracking information via {formData.contactMethod}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-community-green">🔬</span>
                Follow the simple instructions included in your kit
              </li>
              <li className="flex items-center gap-2">
                <span className="text-community-green">⚡</span>
                Get results in 15 minutes from the comfort of your home
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({ zipCode: '', name: '', contactMethod: 'email', contact: '' })
            }}
            className="btn-secondary"
          >
            Request Another Kit
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gradient mb-4">
        Order Your Free Home Test Kit
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Get a free, FDA-approved HIV test kit delivered discreetly to your door. 
        No insurance required, completely confidential.
      </p>

      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* ZIP Code */}
            <div>
              <label htmlFor="zipCode" className="form-label">
                ZIP Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="77002"
                className="form-input"
                pattern="[0-9]{5}"
                maxLength={5}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                To confirm you're in our service area
              </p>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="form-label">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="form-input"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                For addressing your shipment
              </p>
            </div>
          </div>

          {/* Contact Method */}
          <div>
            <label htmlFor="contactMethod" className="form-label">
              Preferred Contact Method <span className="text-red-500">*</span>
            </label>
            <select
              id="contactMethod"
              name="contactMethod"
              value={formData.contactMethod}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="email">Email</option>
              <option value="phone">Text Message (SMS)</option>
            </select>
          </div>

          {/* Contact Info */}
          <div>
            <label htmlFor="contact" className="form-label">
              {formData.contactMethod === 'email' ? 'Email Address' : 'Phone Number'} <span className="text-red-500">*</span>
            </label>
            <input
              type={formData.contactMethod === 'email' ? 'email' : 'tel'}
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder={formData.contactMethod === 'email' ? 'your@email.com' : '(555) 123-4567'}
              className="form-input"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              For confirmation and follow-up only
            </p>
          </div>

          {/* Privacy Notice */}
          <div className="bg-gray-50 rounded-lg p-4 text-left">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔒</span>
              <div>
                <h4 className="font-semibold text-sm mb-1">Your Privacy is Protected</h4>
                <p className="text-xs text-gray-600">
                  Your information is confidential and will not be shared. 
                  We only use your contact info for kit delivery and optional follow-up support.
                </p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full text-lg py-4 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Processing Request...
              </span>
            ) : (
              '📦 Request Free Test Kit'
            )}
          </button>
        </form>

        {/* Additional Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🚚</div>
            <h4 className="font-semibold mb-1">Free Shipping</h4>
            <p className="text-sm text-gray-600">Delivered in 3-5 business days</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📦</div>
            <h4 className="font-semibold mb-1">Discreet Packaging</h4>
            <p className="text-sm text-gray-600">Plain packaging with no identifying marks</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-semibold mb-1">FDA Approved</h4>
            <p className="text-sm text-gray-600">Accurate and reliable results</p>
          </div>
        </div>
      </div>
    </div>
  )
}

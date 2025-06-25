'use client'

import { useState } from 'react'

export default function ReminderSignup() {
  const [formData, setFormData] = useState({
    period: '3',
    contactMethod: 'email',
    contact: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
      alert(`Reminder set! We'll check in with you in ${formData.period} months via ${formData.contactMethod}.`)
    }, 1000)
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
        <div className="card bg-gradient-to-r from-pride-teal/10 to-community-green/10">
          <div className="text-6xl mb-4">⏰</div>
          <h2 className="text-3xl font-bold text-community-green mb-4">
            Reminder Set!
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            We'll send you a gentle reminder in {formData.period} months to consider getting tested again.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({ period: '3', contactMethod: 'email', contact: '' })
            }}
            className="btn-secondary"
          >
            Set Another Reminder
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gradient mb-4">
        Stay on Top of Your Health
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Set a gentle reminder to get tested again. The CDC recommends sexually active gay and bisexual men 
        get tested every 3-6 months.
      </p>

      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label htmlFor="period" className="form-label">
              Remind me in:
            </label>
            <select
              id="period"
              name="period"
              value={formData.period}
              onChange={handleInputChange}
              className="form-input"
              required
            >
              <option value="3">3 months</option>
              <option value="6">6 months</option>
            </select>
          </div>

          <div>
            <label htmlFor="contactMethod" className="form-label">
              Contact method:
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
              <option value="sms">Text Message</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact" className="form-label">
              {formData.contactMethod === 'email' ? 'Email Address' : 'Phone Number'}
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
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full disabled:opacity-50"
          >
            {isLoading ? 'Setting Reminder...' : '⏰ Set My Reminder'}
          </button>
        </form>
      </div>
    </div>
  )
}

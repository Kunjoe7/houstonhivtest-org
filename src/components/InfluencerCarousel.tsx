'use client'

import { useState } from 'react'

interface Story {
  id: number
  name: string
  title: string
  quote: string
  videoUrl?: string
  platform: string
}

export default function InfluencerCarousel() {
  const [currentStory, setCurrentStory] = useState(0)
  const [stories] = useState<Story[]>([
    {
      id: 1,
      name: "Marcus Johnson",
      title: "Houston LGBTQ+ Advocate",
      quote: "Getting tested regularly is how I take care of myself and my community. It's quick, free, and gives me peace of mind.",
      platform: "Instagram"
    },
    {
      id: 2,
      name: "Sofia Rodriguez",
      title: "Community Health Leader",
      quote: "Conocer tu estado es poder. I get tested every 3 months because my health matters, and so does yours.",
      platform: "TikTok"
    },
    {
      id: 3,
      name: "Dr. James Williams",
      title: "Houston Healthcare Provider",
      quote: "HIV testing has never been easier or more accessible. I encourage all my patients to make it part of their routine healthcare.",
      platform: "YouTube"
    }
  ])

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length)
  }

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length)
  }

  const currentStoryData = stories[currentStory]

  return (
    <div className="text-center">
      <h2 className="text-4xl font-bold text-gradient mb-4">
        Community Voices
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Hear from trusted community leaders, advocates, and healthcare providers 
        about the importance of regular HIV testing.
      </p>

      <div className="max-w-4xl mx-auto">
        {/* Main Story Display */}
        <div className="card bg-gradient-to-r from-warmth-coral/10 to-pride-pink/10 mb-8">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Video/Image Placeholder */}
            <div className="lg:w-1/3">
              <div className="bg-gray-200 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎥</div>
                  <p className="text-sm text-gray-600">Video Story</p>
                  <p className="text-xs text-gray-500">{currentStoryData.platform}</p>
                </div>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:w-2/3 text-left">
              <blockquote className="text-xl italic text-gray-700 mb-6 leading-relaxed">
                "{currentStoryData.quote}"
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pride-purple rounded-full flex items-center justify-center text-white font-bold">
                  {currentStoryData.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-lg">{currentStoryData.name}</h4>
                  <p className="text-gray-600">{currentStoryData.title}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <button
            onClick={prevStory}
            className="btn-secondary px-4 py-2"
            aria-label="Previous story"
          >
            ← Previous
          </button>
          
          <div className="flex gap-2">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStory(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentStory ? 'bg-pride-purple' : 'bg-gray-300'
                }`}
                aria-label={`Go to story ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={nextStory}
            className="btn-secondary px-4 py-2"
            aria-label="Next story"
          >
            Next →
          </button>
        </div>

        {/* Call to Action */}
        <div className="card bg-gradient-to-r from-pride-purple/10 to-pride-teal/10">
          <h3 className="text-2xl font-bold mb-4">Share Your Story</h3>
          <p className="text-gray-700 mb-6">
            Want to inspire others in your community? Share your HIV testing experience 
            and help break down barriers to testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary">
              📹 Submit Your Story
            </button>
            <button className="btn-secondary">
              📱 Follow Our Campaign
            </button>
          </div>
        </div>
      </div>

      {/* Attribution */}
      <p className="text-xs text-gray-500 mt-6">
        Stories featured with permission. Part of Houston's "I am Life" community campaign.
      </p>
    </div>
  )
}

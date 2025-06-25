'use client'

import { useState } from 'react'

interface ScreeningQuestion {
  id: string
  question: string
  type: 'yes-no' | 'multiple' | 'number'
  options?: string[]
  weight: number
  category: 'behavioral' | 'medical' | 'demographic'
}

const screeningQuestions: ScreeningQuestion[] = [
  {
    id: 'sexual_activity',
    question: 'Have you been sexually active in the past 12 months?',
    type: 'yes-no',
    weight: 1,
    category: 'behavioral'
  },
  {
    id: 'multiple_partners',
    question: 'Have you had more than one sexual partner in the past 12 months?',
    type: 'yes-no',
    weight: 2,
    category: 'behavioral'
  },
  {
    id: 'unprotected_sex',
    question: 'Have you had unprotected sex (without condoms) in the past 12 months?',
    type: 'yes-no',
    weight: 3,
    category: 'behavioral'
  },
  {
    id: 'partner_status',
    question: 'Do you know the HIV status of all your sexual partners?',
    type: 'yes-no',
    weight: 2,
    category: 'behavioral'
  },
  {
    id: 'drug_use',
    question: 'Have you used injection drugs or shared needles in the past 12 months?',
    type: 'yes-no',
    weight: 4,
    category: 'behavioral'
  },
  {
    id: 'std_history',
    question: 'Have you been diagnosed with any sexually transmitted infections (STIs) in the past 12 months?',
    type: 'yes-no',
    weight: 3,
    category: 'medical'
  },
  {
    id: 'previous_test',
    question: 'When was your last HIV test?',
    type: 'multiple',
    options: ['Never tested', 'Within 3 months', '3-6 months ago', '6-12 months ago', 'More than 1 year ago'],
    weight: 2,
    category: 'medical'
  },
  {
    id: 'prep_use',
    question: 'Are you currently taking PrEP (pre-exposure prophylaxis)?',
    type: 'yes-no',
    weight: -1,
    category: 'medical'
  },
  {
    id: 'partner_hiv_positive',
    question: 'Do you have a sexual partner who is HIV positive?',
    type: 'yes-no',
    weight: 3,
    category: 'behavioral'
  },
  {
    id: 'symptoms',
    question: 'Have you experienced any flu-like symptoms, unexplained weight loss, or persistent infections recently?',
    type: 'yes-no',
    weight: 2,
    category: 'medical'
  }
]

export default function RiskScreening() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [showResults, setShowResults] = useState(false)
  const [isStarted, setIsStarted] = useState(false)

  const handleAnswer = (answer: string) => {
    const newAnswers = { ...answers, [screeningQuestions[currentQuestion].id]: answer }
    setAnswers(newAnswers)

    if (currentQuestion < screeningQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateRiskScore = () => {
    let score = 0
    screeningQuestions.forEach(question => {
      const answer = answers[question.id]
      if (answer === 'yes' || answer === 'Yes') {
        score += question.weight
      } else if (question.type === 'multiple' && answer) {
        // Special scoring for multiple choice questions
        if (question.id === 'previous_test') {
          if (answer === 'Never tested') score += 3
          else if (answer === 'More than 1 year ago') score += 2
          else if (answer === '6-12 months ago') score += 1
        }
      }
    })
    return Math.max(0, score) // Ensure score is not negative
  }

  const getRiskLevel = (score: number) => {
    if (score >= 8) return { level: 'High', color: 'red', recommendation: 'immediate' }
    if (score >= 4) return { level: 'Moderate', color: 'yellow', recommendation: 'soon' }
    if (score >= 1) return { level: 'Low-Moderate', color: 'orange', recommendation: 'consider' }
    return { level: 'Low', color: 'green', recommendation: 'routine' }
  }

  const resetScreening = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setIsStarted(false)
  }

  const riskScore = calculateRiskScore()
  const riskAssessment = getRiskLevel(riskScore)

  if (!isStarted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center">
          <div className="text-6xl mb-4">🩺</div>
          <h2 className="text-3xl font-bold text-gradient mb-4">
            HIV Risk Assessment
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
            Take this confidential screening to help determine if HIV testing is recommended for you. 
            This assessment is based on CDC guidelines and takes about 2-3 minutes.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
              <span>🔒</span>
              Your Privacy is Protected
            </h3>
            <ul className="text-sm text-blue-800 space-y-2">
              <li>• All responses are completely confidential</li>
              <li>• No personal information is collected or stored</li>
              <li>• Results are for educational purposes only</li>
              <li>• This does not replace professional medical advice</li>
            </ul>
          </div>

          <button
            onClick={() => setIsStarted(true)}
            className="btn-primary text-lg px-8 py-4"
          >
            Start Risk Assessment
          </button>
          
          <p className="text-sm text-gray-500 mt-4">
            Questions: {screeningQuestions.length} | Time: ~3 minutes
          </p>
        </div>
      </div>
    )
  }

  if (showResults) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">📊</div>
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Your Risk Assessment Results
          </h2>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Risk Level Display */}
          <div className={`rounded-xl p-6 mb-6 border-2 ${
            riskAssessment.color === 'red' ? 'bg-red-50 border-red-200' :
            riskAssessment.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
            riskAssessment.color === 'orange' ? 'bg-orange-50 border-orange-200' :
            'bg-green-50 border-green-200'
          }`}>
            <div className="text-center">
              <h3 className={`text-2xl font-bold mb-2 ${
                riskAssessment.color === 'red' ? 'text-red-700' :
                riskAssessment.color === 'yellow' ? 'text-yellow-700' :
                riskAssessment.color === 'orange' ? 'text-orange-700' :
                'text-green-700'
              }`}>
                {riskAssessment.level} Risk Level
              </h3>
              <p className={`text-lg ${
                riskAssessment.color === 'red' ? 'text-red-600' :
                riskAssessment.color === 'yellow' ? 'text-yellow-600' :
                riskAssessment.color === 'orange' ? 'text-orange-600' :
                'text-green-600'
              }`}>
                Risk Score: {riskScore}/15
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <span>💡</span>
              Recommendations Based on Your Assessment
            </h4>
            
            {riskAssessment.recommendation === 'immediate' && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>We strongly recommend getting tested for HIV as soon as possible.</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Schedule an appointment at a testing center today</li>
                  <li>• Consider asking about PrEP if you test negative</li>
                  <li>• Discuss your risk factors with a healthcare provider</li>
                  <li>• Consider testing every 3 months if you remain at high risk</li>
                </ul>
              </div>
            )}

            {riskAssessment.recommendation === 'soon' && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>HIV testing is recommended for you within the next few weeks.</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Schedule a test within the next 2-4 weeks</li>
                  <li>• Consider more frequent testing (every 6 months)</li>
                  <li>• Discuss prevention strategies with a healthcare provider</li>
                  <li>• Learn about PrEP if appropriate for your situation</li>
                </ul>
              </div>
            )}

            {riskAssessment.recommendation === 'consider' && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>HIV testing would be beneficial for you.</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Consider getting tested within the next few months</li>
                  <li>• Annual testing may be appropriate</li>
                  <li>• Discuss your risk factors with a healthcare provider</li>
                  <li>• Continue practicing safer sex</li>
                </ul>
              </div>
            )}

            {riskAssessment.recommendation === 'routine' && (
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Routine HIV testing is recommended as part of regular healthcare.</strong>
                </p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Annual testing is recommended for all sexually active adults</li>
                  <li>• Continue practicing safer sex</li>
                  <li>• Stay informed about HIV prevention</li>
                  <li>• Consider testing if your risk factors change</li>
                </ul>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <button
              onClick={() => {
                const locatorSection = document.getElementById('clinic-locator')
                if (locatorSection) {
                  locatorSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="btn-primary flex-1"
            >
              Find Testing Locations
            </button>
            <button
              onClick={() => {
                const kitSection = document.getElementById('test-kit')
                if (kitSection) {
                  kitSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="btn-secondary flex-1"
            >
              Order Home Test Kit
            </button>
          </div>

          {/* Additional Resources */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6">
            <h5 className="font-semibold text-blue-900 mb-2">Important Reminders</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• This assessment is for educational purposes only</li>
              <li>• Always consult with a healthcare provider for personalized advice</li>
              <li>• HIV testing is confidential and often free</li>
              <li>• Early detection leads to better health outcomes</li>
            </ul>
          </div>

          <div className="text-center">
            <button
              onClick={resetScreening}
              className="text-gray-600 hover:text-gray-800 underline"
            >
              Take Assessment Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = screeningQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / screeningQuestions.length) * 100

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {screeningQuestions.length}
          </span>
          <span className="text-sm text-gray-600">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-pride-purple h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h3>

        {question.type === 'yes-no' && (
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <button
              onClick={() => handleAnswer('yes')}
              className="btn-primary flex-1"
            >
              Yes
            </button>
            <button
              onClick={() => handleAnswer('no')}
              className="btn-secondary flex-1"
            >
              No
            </button>
          </div>
        )}

        {question.type === 'multiple' && question.options && (
          <div className="space-y-3 max-w-lg mx-auto">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full p-4 text-left border border-gray-300 rounded-lg hover:border-pride-purple hover:bg-purple-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        
        <button
          onClick={() => setShowResults(true)}
          className="text-gray-600 hover:text-gray-800 underline"
        >
          Skip to Results
        </button>
      </div>
    </div>
  )
}

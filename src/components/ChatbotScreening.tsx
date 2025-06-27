'use client'

import { useState, useEffect, useRef } from 'react'

interface Message {
  id: string
  type: 'bot' | 'user'
  content: string
  timestamp: Date
  options?: string[]
  isTyping?: boolean
}

interface ScreeningData {
  answers: { [key: string]: string }
  currentStep: string
  riskScore: number
}

const chatFlow = {
  welcome: {
    message: "Hi there! 👋 I'm here to help you understand if HIV testing might be right for you. This is a completely confidential conversation - no personal information is stored.",
    options: ["Let's start", "Tell me more about privacy"],
    next: {
      "Let's start": "intro",
      "Tell me more about privacy": "privacy"
    }
  },
  privacy: {
    message: "Great question! 🔒 Here's what you should know:\n\n• All your responses are completely confidential\n• No personal information is collected or stored\n• This assessment is for educational purposes only\n• Results don't replace professional medical advice\n\nReady to begin?",
    options: ["Yes, let's start", "I have more questions"],
    next: {
      "Yes, let's start": "intro",
      "I have more questions": "faq"
    }
  },
  faq: {
    message: "I'm here to help! This assessment is based on CDC guidelines and takes about 3-4 minutes. You can stop anytime, and I'll provide personalized recommendations at the end. What would you like to know?",
    options: ["How accurate is this?", "What happens with my answers?", "Let's start the assessment"],
    next: {
      "How accurate is this?": "accuracy",
      "What happens with my answers?": "data_privacy",
      "Let's start the assessment": "intro"
    }
  },
  accuracy: {
    message: "This assessment is based on CDC guidelines and medical research, but it's not a medical diagnosis. It helps identify if you might benefit from HIV testing. Only a healthcare provider can give you personalized medical advice.",
    options: ["Got it, let's start", "Tell me about data privacy"],
    next: {
      "Got it, let's start": "intro",
      "Tell me about data privacy": "data_privacy"
    }
  },
  data_privacy: {
    message: "Your answers stay right here in your browser - they're never sent to any server or stored anywhere. When you close this page, everything disappears. It's completely private!",
    options: ["Perfect, let's begin", "I'm ready to start"],
    next: {
      "Perfect, let's begin": "intro",
      "I'm ready to start": "intro"
    }
  },
  intro: {
    message: "Perfect! I'll ask you some questions about your health and lifestyle. Just answer honestly - there's no judgment here, and everything is confidential. 😊\n\nBefore we begin, I want to make sure this feels like a safe space for you:",
    options: ["I'm ready", "Tell me about safe spaces"],
    next: {
      "I'm ready": "cultural_affirmation",
      "Tell me about safe spaces": "trauma_informed"
    }
  },
  sexual_activity: {
    message: "Have you been sexually active in the past 12 months?",
    options: ["Yes", "No", "Prefer not to say"],
    next: {
      "Yes": "multiple_partners",
      "No": "drug_use",
      "Prefer not to say": "multiple_partners"
    },
    weight: { "Yes": 1, "Prefer not to say": 1 }
  },
  multiple_partners: {
    message: "Have you had more than one sexual partner in the past 12 months?",
    options: ["Yes", "No", "Prefer not to say"],
    next: {
      "Yes": "unprotected_sex",
      "No": "unprotected_sex",
      "Prefer not to say": "unprotected_sex"
    },
    weight: { "Yes": 2, "Prefer not to say": 1 }
  },
  unprotected_sex: {
    message: "Have you had unprotected sex (without condoms) in the past 12 months?",
    options: ["Yes", "No", "Sometimes", "Prefer not to say"],
    next: {
      "Yes": "partner_status",
      "No": "partner_status",
      "Sometimes": "partner_status",
      "Prefer not to say": "partner_status"
    },
    weight: { "Yes": 3, "Sometimes": 2, "Prefer not to say": 1 }
  },
  partner_status: {
    message: "Do you know the HIV status of all your sexual partners?",
    options: ["Yes, all negative", "No, I don't know", "Some I know, some I don't", "Not applicable"],
    next: {
      "Yes, all negative": "drug_use",
      "No, I don't know": "drug_use",
      "Some I know, some I don't": "drug_use",
      "Not applicable": "drug_use"
    },
    weight: { "No, I don't know": 2, "Some I know, some I don't": 1 }
  },
  drug_use: {
    message: "Have you used injection drugs or shared needles in the past 12 months?",
    options: ["Yes", "No", "Prefer not to say"],
    next: {
      "Yes": "std_history",
      "No": "std_history",
      "Prefer not to say": "std_history"
    },
    weight: { "Yes": 4, "Prefer not to say": 2 }
  },
  std_history: {
    message: "Have you been diagnosed with any sexually transmitted infections (STIs) in the past 12 months?",
    options: ["Yes", "No", "Not sure", "Prefer not to say"],
    next: {
      "Yes": "previous_test",
      "No": "previous_test",
      "Not sure": "previous_test",
      "Prefer not to say": "previous_test"
    },
    weight: { "Yes": 3, "Not sure": 1, "Prefer not to say": 1 }
  },
  previous_test: {
    message: "When was your last HIV test?",
    options: ["Never tested", "Within 3 months", "3-6 months ago", "6-12 months ago", "More than 1 year ago"],
    next: {
      "Never tested": "prep_use",
      "Within 3 months": "prep_use",
      "3-6 months ago": "prep_use",
      "6-12 months ago": "prep_use",
      "More than 1 year ago": "prep_use"
    },
    weight: { "Never tested": 3, "More than 1 year ago": 2, "6-12 months ago": 1 }
  },
  prep_use: {
    message: "Are you currently taking PrEP (pre-exposure prophylaxis)?",
    options: ["Yes", "No", "What's PrEP?"],
    next: {
      "Yes": "symptoms",
      "No": "symptoms",
      "What's PrEP?": "prep_info"
    },
    weight: { "Yes": -1 }
  },
  prep_info: {
    message: "PrEP is a daily medication that can prevent HIV infection when taken consistently. It's very effective for people at higher risk. You can ask your doctor about it!\n\nAre you currently taking PrEP?",
    options: ["Yes", "No", "I want to learn more"],
    next: {
      "Yes": "symptoms",
      "No": "symptoms",
      "I want to learn more": "symptoms"
    },
    weight: { "Yes": -1 }
  },
  symptoms: {
    message: "Have you experienced any flu-like symptoms, unexplained weight loss, or persistent infections recently?",
    options: ["Yes", "No", "Not sure"],
    next: {
      "Yes": "results",
      "No": "results",
      "Not sure": "results"
    },
    weight: { "Yes": 2, "Not sure": 1 }
  },
  results: {
    message: "Thanks for answering all my questions! 🎉 Let me analyze your responses and provide personalized recommendations...",
    options: [],
    next: {}
  },
  cultural_affirmation: {
    message: "Before we continue, I want to acknowledge your strength in taking care of your health. As a Black or Latino MSM, you're part of a resilient community that deserves affirming, culturally-competent care. 💪🏾🏳️‍🌈",
    options: ["Thank you for saying that", "Tell me more about culturally-competent care"],
    next: {
      "Thank you for saying that": "sexual_activity",
      "Tell me more about culturally-competent care": "cultural_care_info"
    }
  },
  cultural_care_info: {
    message: "Culturally-competent care means:\n\n🏳️‍🌈 Providers who understand LGBTQ+ experiences\n🌍 Respect for your cultural background and identity\n🛡️ Safe spaces free from discrimination\n💬 Healthcare that honors your whole self\n\nOur partner clinics are trained in providing affirming care for our community.",
    options: ["That's important to me", "Let's continue with the assessment"],
    next: {
      "That's important to me": "sexual_activity",
      "Let's continue with the assessment": "sexual_activity"
    }
  },
  trauma_informed: {
    message: "I understand that healthcare experiences haven't always been positive for our community. If any question feels uncomfortable, you can always choose 'Prefer not to say' or take a break. Your comfort and safety come first. 🤗",
    options: ["I appreciate that", "I'm ready to continue"],
    next: {
      "I appreciate that": "sexual_activity",
      "I'm ready to continue": "sexual_activity"
    }
  }
}

export default function ChatbotScreening() {
  const [messages, setMessages] = useState<Message[]>([])
  const [currentStep, setCurrentStep] = useState('welcome')
  const [screeningData, setScreeningData] = useState<ScreeningData>({
    answers: {},
    currentStep: 'welcome',
    riskScore: 0
  })
  const [isTyping, setIsTyping] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [userHasScrolled, setUserHasScrolled] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = (force: boolean = false) => {
    if (!messagesEndRef.current || !chatContainerRef.current) return
    
    const container = chatContainerRef.current
    const isNearBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 100
    
    // Only auto-scroll if user is near bottom or if forced
    if (force || (!userHasScrolled && isNearBottom)) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      })
    }
  }

  const handleScroll = () => {
    if (!chatContainerRef.current) return
    
    const container = chatContainerRef.current
    const isAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 50
    
    // Reset userHasScrolled if they scroll back to bottom
    if (isAtBottom) {
      setUserHasScrolled(false)
    } else {
      setUserHasScrolled(true)
    }
  }

  useEffect(() => {
    // Only scroll on new bot messages, not user messages
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1]
      if (lastMessage.type === 'bot') {
        setTimeout(() => scrollToBottom(), 100)
      }
    }
  }, [messages])

  useEffect(() => {
    // Initial welcome message
    addBotMessage(chatFlow.welcome.message, chatFlow.welcome.options)
  }, [])

  const addBotMessage = (content: string, options: string[] = [], delay: number = 1000) => {
    setIsTyping(true)
    
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content,
        timestamp: new Date(),
        options
      }
      
      setMessages(prev => [...prev, newMessage])
      setIsTyping(false)
    }, delay)
  }

  const addUserMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, newMessage])
  }

  const calculateRiskScore = (answers: { [key: string]: string }) => {
    let score = 0
    
    Object.entries(answers).forEach(([step, answer]) => {
      const stepData = chatFlow[step as keyof typeof chatFlow]
      if (stepData && 'weight' in stepData && stepData.weight) {
        const weight = stepData.weight[answer as keyof typeof stepData.weight]
        if (weight) {
          score += weight
        }
      }
    })
    
    return Math.max(0, score)
  }

  const getRiskAssessment = (score: number) => {
    if (score >= 8) return { 
      level: 'High', 
      color: 'red', 
      emoji: '🔴',
      recommendation: 'immediate',
      message: "Based on your responses, I recommend getting tested for HIV as soon as possible. This doesn't mean you have HIV - it just means testing would be a good idea given your risk factors."
    }
    if (score >= 4) return { 
      level: 'Moderate', 
      color: 'yellow', 
      emoji: '🟡',
      recommendation: 'soon',
      message: "Your responses suggest that HIV testing would be beneficial for you within the next few weeks. It's a good way to stay on top of your health!"
    }
    if (score >= 1) return { 
      level: 'Low-Moderate', 
      color: 'orange', 
      emoji: '🟠',
      recommendation: 'consider',
      message: "Based on your responses, HIV testing would be a good idea. Consider getting tested within the next few months as part of your regular healthcare."
    }
    return { 
      level: 'Low', 
      color: 'green', 
      emoji: '🟢',
      recommendation: 'routine',
      message: "Your risk appears to be low, but routine HIV testing is still recommended for all sexually active adults as part of regular healthcare."
    }
  }

  const handleOptionClick = (option: string) => {
    addUserMessage(option)
    
    const currentStepData = chatFlow[currentStep as keyof typeof chatFlow]
    if (!currentStepData) return

    // Update answers
    const newAnswers = { ...screeningData.answers }
    if ('weight' in currentStepData) {
      newAnswers[currentStep] = option
    }

    // Get next step
    const nextStep = currentStepData.next[option as keyof typeof currentStepData.next]
    
    if (nextStep === 'results') {
      // Calculate final results
      const finalScore = calculateRiskScore(newAnswers)
      const assessment = getRiskAssessment(finalScore)
      
      setScreeningData({
        answers: newAnswers,
        currentStep: nextStep,
        riskScore: finalScore
      })
      
      // Show results
      setTimeout(() => {
        addBotMessage(assessment.message, [], 1500)
        setTimeout(() => {
          setShowResults(true)
          addBotMessage(
            `${assessment.emoji} **Risk Level: ${assessment.level}**\n\nRisk Score: ${finalScore}/15\n\nWhat would you like to do next?`,
            ['Find testing locations', 'Order home test kit', 'Learn about prevention', 'Start over'],
            2000
          )
        }, 3000)
      }, 1000)
    } else if (nextStep && chatFlow[nextStep as keyof typeof chatFlow]) {
      // Continue to next question
      setCurrentStep(nextStep)
      setScreeningData({
        answers: newAnswers,
        currentStep: nextStep,
        riskScore: calculateRiskScore(newAnswers)
      })
      
      const nextStepData = chatFlow[nextStep as keyof typeof chatFlow]
      addBotMessage(nextStepData.message, nextStepData.options)
    }
  }

  const handleActionClick = (action: string) => {
    addUserMessage(action)
    
    switch (action) {
      case 'Find testing locations':
        addBotMessage("Great choice! I'll take you to our clinic locator where you can find HIV testing sites near you. 📍", [])
        setTimeout(() => {
          const locatorSection = document.getElementById('clinic-locator')
          if (locatorSection) {
            locatorSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 2000)
        break
      case 'Order home test kit':
        addBotMessage("Perfect! Home testing is convenient and private. I'll take you to our test kit order form. 📦", [])
        setTimeout(() => {
          const kitSection = document.getElementById('test-kit')
          if (kitSection) {
            kitSection.scrollIntoView({ behavior: 'smooth' })
          }
        }, 2000)
        break
      case 'Learn about prevention':
        addBotMessage("Knowledge is power! Here are some key prevention strategies:\n\n• Use condoms consistently\n• Consider PrEP if you're at higher risk\n• Get tested regularly\n• Communicate with partners about status\n• Avoid sharing needles\n\nWould you like to explore our other resources?", ['Find testing locations', 'Order home test kit', 'Start over'])
        break
      case 'Start over':
        // Reset everything
        setMessages([])
        setCurrentStep('welcome')
        setScreeningData({
          answers: {},
          currentStep: 'welcome',
          riskScore: 0
        })
        setShowResults(false)
        setTimeout(() => {
          addBotMessage(chatFlow.welcome.message, chatFlow.welcome.options)
        }, 500)
        break
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-pride-purple to-pride-teal p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h2 className="text-2xl font-bold">Safe Engagement Health Chat</h2>
            <p className="text-white/90">Culturally-affirming wellness support for our community</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        onScroll={handleScroll}
        className="h-96 overflow-y-auto p-6 space-y-4 bg-gray-50"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-pride-purple text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-line">{message.content}</div>
              {message.type === 'user' && (
                <div className="text-xs text-white/70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Options */}
      {messages.length > 0 && !isTyping && (
        <div className="p-6 bg-white border-t border-gray-200">
          <div className="space-y-2">
            {messages[messages.length - 1]?.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => showResults ? handleActionClick(option) : handleOptionClick(option)}
                className="w-full text-left p-3 border border-gray-300 rounded-lg hover:border-pride-purple hover:bg-purple-50 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="px-6 py-3 bg-blue-50 border-t border-blue-200">
        <p className="text-xs text-blue-700 flex items-center gap-2">
          <span>🔒</span>
          This conversation is completely private and confidential. No data is stored or shared.
        </p>
      </div>
    </div>
  )
}

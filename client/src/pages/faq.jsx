import { Shield, Stethoscope, Bell, Clock, Users, HeartPulse, Mic, Phone, FileQuestion } from "lucide-react"
import Navbar from "../components/navbar"

function FAQ() {
  const questions = [
    {
      title: "What is the AI-driven Voice-enabled Health Advisor?",
      description:
        "The AI-driven Voice-enabled Health Advisor is a voice-activated assistant designed to help elderly individuals manage their health. It offers medication reminders, helps check symptoms, provides health advice, and can connect you to caregivers or emergency services in case of health concerns.",
        icon: <FileQuestion className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "How do I interact with the Health Advisor?",
      description:
        "You can interact with the Health Advisor by talking to it like you would with ChatGPT or any other AI tool. The assistant is designed to consider your previous medical information to give you personalized advice. You can ask about your medication schedule, describe any symptoms you're experiencing, or ask for general health advice.",
      icon: <Stethoscope className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Can this assistant remind me about my medications?",
      description:
        "Yes! The AI assistant can remind you when it's time to take your medication. You can set specific schedules for each medication, and the assistant will notify you at the designated time to ensure you don't miss a dose.",
      icon: <Bell className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Can the Voice-enabled Health Advisor diagnose health problems?",
      description:
        "While the Voice-enabled Health Advisor can help you identify common symptoms and offer suggestions based on your input, it is not a substitute for professional medical diagnosis. The assistant can provide general advice and guide you through possible actions, but for serious concerns, it's always best to consult a healthcare provider.",
      icon: <Clock className="h-10 w-10 text-blue-500" />,
    },
    // {
    //   title: "Caregiver Connectivity",
    //   description:
    //     "Easily connect with family members or professional caregivers who can monitor your health status remotely. Authorized caregivers receive real-time updates about medication adherence, health metrics, and any concerning symptoms.",
    //   icon: <Users className="h-10 w-10 text-blue-500" />,
    // },
    // {
    //   title: "Health Vitals Tracking",
    //   description:
    //     "Monitor important health metrics like blood pressure, heart rate, and glucose levels over time. The system identifies trends and alerts you to significant changes that may require medical attention.",
    //   icon: <HeartPulse className="h-10 w-10 text-blue-500" />,
    // },
    // {
    //   title: "Voice-First Interface",
    //   description:
    //     "Designed specifically for elderly users, our voice-activated interface eliminates the need for complex menus or small buttons. Simply speak naturally to the system to access any feature or get the information you need.",
    //   icon: <Mic className="h-10 w-10 text-blue-500" />,
    // },
    // {
    //   title: "Telemedicine Integration",
    //   description:
    //     "Connect directly with healthcare providers through our integrated telemedicine platform. Share your symptom history and health data with your doctor for more informed virtual consultations.",
    //   icon: <Phone className="h-10 w-10 text-blue-500" />,
    // },
  ]

  return (
    <div className="bg-white">
      <Navbar />
      {/* Header */}
      {/* <div className="bg-[#1c2128] py-16 px-4 sm:px-6 lg:px-8 text-center mt-14">
        <h1 className="text-4xl font-bold text-white mb-4">How does this work?</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          HealthCompanion combines advanced AI technology with an accessible voice interface to provide comprehensive
          health support for elderly users.
        </p>
      </div> */}

      {/* Features Table */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {questions.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* CTA Section */}
      <div className="bg-[#2c333e] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to experience HealthCompanion?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who are already benefiting from our voice-activated health advisor.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/signup"
              className="px-8 py-3 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-400 transition"
            >
              Get Started for Free
            </a>
            <a
              href="/contact"
              className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-gray-700 transition"
            >
              Request a Demo
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ


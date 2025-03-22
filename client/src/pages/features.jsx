import { Shield, Stethoscope, Bell, Clock, Users, HeartPulse, Mic, Phone } from "lucide-react"

function FeaturesPage() {
  const features = [
    {
      title: "Secure Authentication",
      description:
        "HealthCompanion employs end-to-end encryption and HIPAA-compliant security measures to protect your sensitive medical information. We use multi-factor authentication and regular security audits to ensure your data remains private and secure.",
      icon: <Shield className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "AI-Powered Symptom Analysis",
      description:
        "Our advanced AI considers your complete medication history, current symptoms, and personal health profile to provide immediate treatment recommendations. The system cross-references your specific conditions with the latest medical research to offer personalized guidance.",
      icon: <Stethoscope className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Medication Reminders",
      description:
        "Never miss important medications with customizable voice reminders. Set specific times, frequencies, and special instructions for each medication. The system will intelligently remind you through voice prompts when it's time to take your medicine.",
      icon: <Bell className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "24/7 Emergency Assistance",
      description:
        "In case of emergency, HealthCompanion can immediately connect you with emergency services or designated caregivers. The system can detect distress in your voice and automatically initiate emergency protocols when needed.",
      icon: <Clock className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Caregiver Connectivity",
      description:
        "Easily connect with family members or professional caregivers who can monitor your health status remotely. Authorized caregivers receive real-time updates about medication adherence, health metrics, and any concerning symptoms.",
      icon: <Users className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Health Vitals Tracking",
      description:
        "Monitor important health metrics like blood pressure, heart rate, and glucose levels over time. The system identifies trends and alerts you to significant changes that may require medical attention.",
      icon: <HeartPulse className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Voice-First Interface",
      description:
        "Designed specifically for elderly users, our voice-activated interface eliminates the need for complex menus or small buttons. Simply speak naturally to the system to access any feature or get the information you need.",
      icon: <Mic className="h-10 w-10 text-blue-500" />,
    },
    {
      title: "Telemedicine Integration",
      description:
        "Connect directly with healthcare providers through our integrated telemedicine platform. Share your symptom history and health data with your doctor for more informed virtual consultations.",
      icon: <Phone className="h-10 w-10 text-blue-500" />,
    },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-[#1c2128] py-16 px-4 sm:px-6 lg:px-8 text-center mt-14">
        <h1 className="text-4xl font-bold text-white mb-4">Powerful Features for Better Health</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          HealthCompanion combines advanced AI technology with an accessible voice interface to provide comprehensive
          health support for elderly users.
        </p>
      </div>

      {/* Features Table */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
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

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How HealthCompanion Works</h2>
          <p className="text-xl text-gray-600">
            Our voice-activated health advisor is designed to be intuitive and easy to use.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            {/* Timeline items */}
            <div className="relative z-10">
              {/* Step 1 */}
              <div className="mb-16 flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Up Your Profile</h3>
                  <p className="text-gray-600">
                    Create your health profile with your medical history, current medications, allergies, and emergency
                    contacts.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                    1
                  </div>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* Step 2 */}
              <div className="mb-16 flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                    2
                  </div>
                </div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Activate Voice Commands</h3>
                  <p className="text-gray-600">
                    Simply say "Hey Health Companion" followed by your question or request to activate the voice
                    assistant.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="mb-16 flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Personalized Care</h3>
                  <p className="text-gray-600">
                    Get medication reminders, symptom analysis, health advice, and emergency assistance tailored to your
                    needs.
                  </p>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                    3
                  </div>
                </div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="bg-blue-500 rounded-full h-10 w-10 flex items-center justify-center text-white font-bold">
                    4
                  </div>
                </div>
                <div className="w-1/2 pl-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Connected</h3>
                  <p className="text-gray-600">
                    Share your health information with caregivers and healthcare providers for comprehensive care
                    coordination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#1c2128] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to experience HealthCompanion?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who are already benefiting from our voice-activated health advisor.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
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

export default FeaturesPage


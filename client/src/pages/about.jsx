import React from 'react';
import { Link } from 'react-router-dom';
// import { CheckIcon } from 'lucide-react';
import Navbar from '../components/navbar';


function About() {
    return (
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
        <Navbar />
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight my-10">
              HealthCompanion is a free app
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              that aims to create a product that can be accessed
              by anyone and everyone, while using AI to empower interested users!
              <br /> <br />
              If you would like to support us, consider following our LinkedIn pages!
              Apart from empowering users, we want all of you to invest in yourselves more than anything
              to ensure your success and wellbeing!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/signup" 
                className="px-8 py-3 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 transition"
              >
                Get Started
              </Link>
              <Link 
                to="/features" 
                className="px-8 py-3 border border-blue-600 text-blue-600 text-center font-medium rounded-md hover:bg-blue-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

// function PricingPage() {
//   const pricingTiers = [
//     {
//       name: "Basic",
//       price: "$0",
//       description: "Essential features for personal use",
//       features: [
//         "Voice-activated medication reminders",
//         "Basic symptom checking",
//         "Health tips and advice",
//         "1 emergency contact",
//         "Web access only"
//       ],
//       cta: "Get Started",
//       ctaLink: "/signup",
//       highlighted: false
//     },
//     {
//       name: "Premium",
//       price: "$9.99",
//       period: "per month",
//       description: "Advanced features for comprehensive care",
//       features: [
//         "All Basic features",
//         "Advanced symptom analysis",
//         "Medication interaction warnings",
//         "Unlimited emergency contacts",
//         "24/7 priority support",
//         "Mobile app access"
//       ],
//       cta: "Start Free Trial",
//       ctaLink: "/signup?plan=premium",
//       highlighted: true
//     },
//     {
//       name: "Family",
//       price: "$19.99",
//       period: "per month",
//       description: "Complete coverage for the whole family",
//       features: [
//         "All Premium features",
//         "Up to 5 user profiles",
//         "Family health dashboard",
//         "Caregiver notifications",
//         "Health history tracking",
//         "Personalized health reports"
//       ],
//       cta: "Start Free Trial",
//       ctaLink: "/signup?plan=family",
//       highlighted: false
//     }
//   ];

//   return (
//     <div className="bg-white">
//       {/* Header */}
//       <div className="bg-[#1c2128] py-16 px-4 sm:px-6 lg:px-8 text-center">
//         <h1 className="text-4xl font-bold text-white mb-4">Simple, Transparent Pricing</h1>
//         <p className="text-xl text-gray-300 max-w-3xl mx-auto">
//           Choose the plan that's right for you or your loved ones.
//           All plans include a 14-day free trial.
//         </p>
//       </div>

//       {/* Pricing Tiers */}
//       <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {pricingTiers.map((tier, index) => (
//             <div 
//               key={index} 
//               className={`rounded-lg overflow-hidden border ${
//                 tier.highlighted 
//                   ? 'border-yellow-500 shadow-xl transform md:-translate-y-4' 
//                   : 'border-gray-200 shadow'
//               }`}
//             >
//               <div className={`p-6 ${tier.highlighted ? 'bg-yellow-50' : 'bg-white'}`}>
//                 <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
//                 <div className="mt-4 flex items-baseline">
//                   <span className="text-4xl font-extrabold text-gray-900">{tier.price}</span>
//                   {tier.period && (
//                     <span className="ml-1 text-xl font-medium text-gray-500">{tier.period}</span>
//                   )}
//                 </div>
//                 <p className="mt-2 text-gray-600">{tier.description}</p>
//               </div>
//               <div className="px-6 pt-6 pb-8">
//                 <ul className="space-y-4">
//                   {tier.features.map((feature, featureIndex) => (
//                     <li key={featureIndex} className="flex items-start">
//                       <div className="flex-shrink-0">
//                         {/* <CheckIcon className="h-5 w-5 text-green-500" /> */}
//                       </div>
//                       <p className="ml-3 text-gray-700">{feature}</p>
//                     </li>
//                   ))}
//                 </ul>
//                 <div className="mt-8">
//                   <Link
//                     to={tier.ctaLink}
//                     className={`block w-full py-3 px-4 rounded-md text-center font-medium ${
//                       tier.highlighted
//                         ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-400'
//                         : 'bg-[#1c2128] text-white hover:bg-gray-700'
//                     } transition`}
//                   >
//                     {tier.cta}
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FAQ Section */}
//       <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto">
//           <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
          
//           <div className="space-y-6">
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Can I change plans later?</h3>
//               <p className="text-gray-700">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Is there a contract or commitment?</h3>
//               <p className="text-gray-700">No, all plans are month-to-month with no long-term contracts. You can cancel anytime.</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">How does the free trial work?</h3>
//               <p className="text-gray-700">Your 14-day free trial gives you full access to all features of your selected plan. No credit card is required to start your trial.</p>
//             </div>
            
//             <div className="bg-white p-6 rounded-lg shadow-sm">
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Is my health data secure?</h3>
//               <p className="text-gray-700">Yes, we take security seriously. All health data is encrypted and stored securely following HIPAA guidelines and best practices.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CTA Section */}
//       <div className="bg-[#1c2128] py-12 px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto text-center">
//           <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
//           <p className="text-xl text-gray-300 mb-8">Join thousands of users who are already benefiting from HealthCompanion.</p>
//           <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
//             <Link 
//               to="/signup" 
//               className="px-8 py-3 bg-yellow-500 text-gray-900 font-medium rounded-md hover:bg-yellow-400 transition"
//             >
//               Start Your Free Trial
//             </Link>
//             <Link 
//               to="/contact" 
//               className="px-8 py-3 border border-white text-white font-medium rounded-md hover:bg-gray-700 transition"
//             >
//               Contact Sales
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

export default About;

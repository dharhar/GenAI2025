import React from 'react';
import { Link } from 'react-router-dom';
import elderlySpeaker from '../assets/elderly-speaker.jpg'

function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Your Voice-Activated Health Companion
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            A personal health advisor for elderly people offering medication reminders, 
            symptom checks, and health advice through simple voice commands.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
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
        <div className="md:w-1/2 mt-10">
          <img 
            src={elderlySpeaker}
            alt="Elderly person using voice assistant" 
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default HeroSection;

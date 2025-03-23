"use client"

// import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  // const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-[#1c2128] py-3 px-2 border-b border-gray-700 z-50">
      <div className="flex items-center justify-between px-2 z-50">
        {/* Logo and Brand */}
        <div className="flex items-center">
          {/* <div className="bg-white p-1 mr-6 rounded">
            <span className="text-[#1c2128] font-bold text-xl">HealthCompanion</span>
          </div> */}
          <Link to="/" className="text-gray-300 hover:text-white transition mr-6">
            {/* Home */}
            <div className="bg-white p-1 rounded">
            <span className="text-[#1c2128] font-bold text-xl">EchoHealth</span>
          </div>
          </Link>
          <Link to="/features" className="text-gray-300 hover:text-white transition mr-6">
            Features
          </Link>
          {/* <Link to="/pricing" className="text-gray-300 hover:text-white transition mr-6">
            Pricing
          </Link> */}
          <Link to="/faqs" className="text-gray-300 hover:text-white transition mr-6">
            FAQs
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-white transition">
            About
          </Link>
        </div>

        {/* Auth */}
        <div className="flex items-center space-x-4">
          <Link
            to="/signin"
            className="px-4 py-1.5 border border-gray-600 rounded text-gray-300 hover:bg-gray-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-1.5 bg-yellow-500 text-gray-900 font-medium rounded hover:bg-yellow-400 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar


"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">HealthCompanion</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/features" className="text-gray-700 hover:text-blue-600 transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex space-x-4">
            <Link
              to="/signin"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Sign Up
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4">
          <ul className="flex flex-col space-y-4 pb-4">
            <li>
              <Link to="/" className="block text-gray-700 hover:text-blue-600 transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-gray-700 hover:text-blue-600 transition">
                About
              </Link>
            </li>
            <li>
              <Link to="/features" className="block text-gray-700 hover:text-blue-600 transition">
                Features
              </Link>
            </li>
            <li>
              <Link to="/contact" className="block text-gray-700 hover:text-blue-600 transition">
                Contact
              </Link>
            </li>
          </ul>
          <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
            <Link
              to="/signin"
              className="px-4 py-2 text-center text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar


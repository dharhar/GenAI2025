import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import SignIn from "./pages/signin"
import SignUp from "./pages/signup"
import Dashboard from "./pages/dashboard"
import Onboarding from "./pages/onboarding"
import About from "./pages/about"
import Features from "./pages/features"
import "./App.css"

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <footer className="bg-[#1c2128] text-gray-300 py-6 border-t border-gray-700">
          <div className="container mx-auto px-4">
            <p className="text-center">© {new Date().getFullYear()} HealthCompanion. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App
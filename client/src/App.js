import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Home from "./pages/home"
import SignIn from "./pages/signin"
import SignUp from "./pages/signup"
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
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4">
            <p className="text-center">© {new Date().getFullYear()} HealthCompanion. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App


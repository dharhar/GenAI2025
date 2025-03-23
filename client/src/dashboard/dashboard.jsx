"use client"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Sidebar from "../components/sidebar"
import MedicalHistoryTab from "./medical-history"
import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const { user } = useAuth();
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const defaultTab = queryParams.get("tab") || "medical-history"

  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    navigate(`/dashboard?tab=${tab}`, { replace: true })
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">
              Welcome back{user?.username ? `, ${user.username}!` : "!"}            
            </h1>
          </div>

          <div className="tabs">
            <div className="tabs-list">
              <div
                className={`tab ${activeTab === "medical-history" ? "active" : ""}`}
                onClick={() => handleTabChange("medical-history")}
              >
                Medical History
              </div>
              {/* <div
                className={`tab ${activeTab === "medical-history" ? "active" : ""}`}
                onClick={() => handleTabChange("medical-history")}
              >
                Medical History
              </div> */}
              
            </div>

            <div className={`tab-content ${activeTab === "medical-history" ? "active" : ""}`}>
              {/* <OverviewTab /> */}
              <MedicalHistoryTab />
            </div>

            {/* <div className={`tab-content ${activeTab === "medical-history" ? "active" : ""}`}>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard


"use client"

import { useState } from "react"
import Sidebar from "../../components/sidebar"
import Switch from '../../components/switch';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>

          <div className="tabs">
            <div className="tabs-list">
              <div className={`tab ${activeTab === "general" ? "active" : ""}`} onClick={() => setActiveTab("general")}>
                General
              </div>
              <div
                className={`tab ${activeTab === "notifications" ? "active" : ""}`}
                onClick={() => setActiveTab("notifications")}
              >
                Notifications
              </div>
              <div className={`tab ${activeTab === "privacy" ? "active" : ""}`} onClick={() => setActiveTab("privacy")}>
                Privacy
              </div>
            </div>

            <div className={`tab-content ${activeTab === "general" ? "active" : ""}`}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">General Settings</div>
                  <div className="card-description">Manage your account settings and preferences.</div>
                </div>
                <div className="card-content space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="dark-mode" className="form-label">
                        Dark Mode
                      </label>
                      <p className="text-sm text-muted">Toggle between light and dark mode</p>
                    </div>
                    <Switch 
                      label=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="units" className="form-label">
                        Use Metric Units
                      </label>
                      <p className="text-sm text-muted">Toggle between imperial and metric units</p>
                    </div>
                    <Switch 
                      label=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="language" className="form-label">
                        Language
                      </label>
                      <p className="text-sm text-muted">Select your preferred language</p>
                    </div>
                    {/* <select className="form-input w-auto"> */}
                    <select className="w-64 p-2 border rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary mt-4 px-6 py-1">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`tab-content ${activeTab === "notifications" ? "active" : ""}`}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Notification Settings</div>
                  <div className="card-description">Manage how you receive notifications.</div>
                </div>
                <div className="card-content space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="email-notifs" className="form-label">
                        Email Notifications
                      </label>
                      <p className="text-sm text-muted">Receive notifications via email</p>
                    </div>
                    <Switch 
                      label=""
                      defaultChecked
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="push-notifs" className="form-label">
                        Push Notifications
                      </label>
                      <p className="text-sm text-muted">Receive push notifications</p>
                    </div>
                    <Switch 
                      label=""
                      defaultChecked
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary mt-4 px-6 py-1">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`tab-content ${activeTab === "privacy" ? "active" : ""}`}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Privacy Settings</div>
                  <div className="card-description">Manage your privacy preferences.</div>
                </div>
                <div className="card-content space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="data-sharing" className="form-label">
                        Data Sharing
                      </label>
                      <p className="text-sm text-muted">Allow anonymous data sharing for service improvement</p>
                    </div>
                    <Switch 
                      label=""
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label htmlFor="cookies" className="form-label">
                        Accept Cookies
                      </label>
                      <p className="text-sm text-muted">Allow cookies for better experience</p>
                    </div>
                    <Switch 
                      label=""
                      defaultChecked
                    />
                  </div>
                  <div className="flex justify-end">
                    <button className="btn btn-primary mt-4 px-6 py-1">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage


"use client"

import { useState } from "react"
import Sidebar from "../../components/sidebar"
import { User } from 'react-feather';
import { useAuth } from "../../context/AuthContext";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("details")
  const { user } = useAuth()

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Profile</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card md:col-span-1">
              <div className="card-header">
                <div className="card-title">Your Profile</div>
                <div className="card-description">Manage your personal information</div>
              </div>
              <div className="card-content flex flex-col items-center space-y-4">
                <div className="avatar h-24 w-24">
                  {/* <img src="https://via.placeholder.com/96" alt="Profile" className="avatar-image" /> */}
                  <User className="h-10 w-10"/>
                </div>
                <button className="btn btn-outline btn-sm">Change Photo</button>
                <div className="text-center">
                  <h3 className="font-medium text-lg">{user ? user.username : ''}</h3>
                  <p className="text-sm text-muted">{user ? user.email : ''}</p>
              
                  {/* <h3 className="font-medium text-lg">John Doe</h3>
                  <p className="text-sm text-muted">john.doe@example.com</p>
                  <p className="text-sm text-muted">Member since Jan 2023</p> */}
                </div>
              </div>
            </div>

            <div className="card md:col-span-2">
              <div className="card-header">
                <div className="card-title">Personal Information</div>
                <div className="card-description">Update your personal details</div>
              </div>
              <div className="card-content">
                <div className="tabs">
                  <div className="tabs-list">
                    <div
                      className={`tab ${activeTab === "details" ? "active" : ""}`}
                      onClick={() => setActiveTab("details")}
                    >
                      Details
                    </div>
                    <div
                      className={`tab ${activeTab === "health" ? "active" : ""}`}
                      onClick={() => setActiveTab("health")}
                    >
                      Health Info
                    </div>
                    <div
                      className={`tab ${activeTab === "security" ? "active" : ""}`}
                      onClick={() => setActiveTab("security")}
                    >
                      Security
                    </div>
                  </div>

                  <div className={`tab-content ${activeTab === "details" ? "active" : ""}`}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label htmlFor="first-name" className="form-label">
                            First Name
                          </label>
                          <input id="first-name" className="form-input" defaultValue="" />
                          {/* <p className="text-sm text-muted">{user ? user.email : ''}</p> */}
                        </div>
                        <div className="form-group">
                          <label htmlFor="last-name" className="form-label">
                            Last Name
                          </label>
                          <input id="last-name" className="form-input" defaultValue="" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input id="email" type="email" className="form-input" defaultValue="" />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phone" className="form-label">
                            Phone
                          </label>
                          <input id="phone" type="tel" className="form-input" defaultValue="" />
                        </div>
                        <div className="form-group md:col-span-2">
                          <label htmlFor="address" className="form-label">
                            Address
                          </label>
                          <input id="address" className="form-input" defaultValue="" />
                        </div>
                      </div>
                      <button className="btn btn-primary mt-4 px-6 py-1">Save Changes</button>
                    </div>
                  </div>

                  <div className={`tab-content ${activeTab === "health" ? "active" : ""}`}>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="form-group">
                          <label htmlFor="height" className="form-label">
                            Height (cm)
                          </label>
                          <input id="height" type="number" className="form-input" defaultValue={user?.height || ""} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="weight" className="form-label">
                            Weight (kg)
                          </label>
                          <input id="weight" type="number" className="form-input" defaultValue={user?.weight || ""} />
                        </div>
                        
                      </div>
                      <button className="btn btn-primary mt-4 px-6 py-1">Save Changes</button>
                    </div>
                  </div>

                  <div className={`tab-content ${activeTab === "security" ? "active" : ""}`}>
                    <div className="space-y-4">
                      <div className="form-group">
                        <label htmlFor="current-password" className="form-label">
                          Current Password
                        </label>
                        <input id="current-password" type="password" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="new-password" className="form-label">
                          New Password
                        </label>
                        <input id="new-password" type="password" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="confirm-password" className="form-label">
                          Confirm New Password
                        </label>
                        <input id="confirm-password" type="password" className="form-input" />
                      </div>
                      <button className="btn btn-primary mt-4 px-6 py-1">Update Password</button>
                    </div>
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

export default ProfilePage


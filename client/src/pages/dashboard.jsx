"use client"

import { useState } from "react"

function Dashboard() {
  const [userData, setUserData] = useState({
    name: "John Doe",
    stats: {
      steps: 8432,
      calories: 1850,
      water: 5,
      sleep: 7.5,
    },
    goals: {
      steps: 10000,
      calories: 2000,
      water: 8,
      sleep: 8,
    },
    activities: [
      { id: 1, type: "Walking", duration: "30 min", time: "08:30 AM", calories: 120 },
      { id: 2, type: "Meditation", duration: "15 min", time: "09:15 AM", calories: 10 },
      { id: 3, type: "Cycling", duration: "45 min", time: "06:30 PM", calories: 350 },
    ],
    upcomingTasks: [
      { id: 1, title: "Take Medication", time: "12:00 PM", completed: false },
      { id: 2, title: "Drink Water", time: "02:00 PM", completed: true },
      { id: 3, title: "Evening Walk", time: "06:00 PM", completed: false },
      { id: 4, title: "Meditation", time: "09:00 PM", completed: false },
    ],
  })

  const [activeTab, setActiveTab] = useState("overview")

  // Calculate progress percentages
  const calculateProgress = (current, goal) => {
    return Math.min(Math.round((current / goal) * 100), 100)
  }

  const toggleTaskCompletion = (taskId) => {
    setUserData((prevData) => ({
      ...prevData,
      upcomingTasks: prevData.upcomingTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">HealthCompanion</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <div className="flex items-center">
              <img className="h-8 w-8 rounded-full" src="/placeholder.svg?height=32&width=32" alt="User avatar" />
              <span className="ml-2 text-sm font-medium text-gray-700">{userData.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
          <p className="text-gray-600">Here's your health summary for today</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("activity")}
              className={`${
                activeTab === "activity"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Activity
            </button>
            <button
              onClick={() => setActiveTab("nutrition")}
              className={`${
                activeTab === "nutrition"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Nutrition
            </button>
            <button
              onClick={() => setActiveTab("sleep")}
              className={`${
                activeTab === "sleep"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Sleep
            </button>
          </nav>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Steps card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Steps</p>
                <h3 className="text-2xl font-bold text-gray-900">{userData.stats.steps.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-blue-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(userData.stats.steps, userData.goals.steps)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {userData.stats.steps} of {userData.goals.steps.toLocaleString()} steps
            </p>
          </div>

          {/* Calories card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Calories</p>
                <h3 className="text-2xl font-bold text-gray-900">{userData.stats.calories}</h3>
              </div>
              <div className="p-2 bg-orange-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-orange-500 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(userData.stats.calories, userData.goals.calories)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {userData.stats.calories} of {userData.goals.calories} calories
            </p>
          </div>

          {/* Water card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Water</p>
                <h3 className="text-2xl font-bold text-gray-900">{userData.stats.water} glasses</h3>
              </div>
              <div className="p-2 bg-cyan-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-cyan-500 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(userData.stats.water, userData.goals.water)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {userData.stats.water} of {userData.goals.water} glasses
            </p>
          </div>

          {/* Sleep card */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Sleep</p>
                <h3 className="text-2xl font-bold text-gray-900">{userData.stats.sleep} hrs</h3>
              </div>
              <div className="p-2 bg-purple-50 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-purple-500 h-2.5 rounded-full"
                style={{ width: `${calculateProgress(userData.stats.sleep, userData.goals.sleep)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {userData.stats.sleep} of {userData.goals.sleep} hours
            </p>
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's activities */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Today's Activities</h3>
            </div>
            <div className="p-6">
              {userData.activities.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {userData.activities.map((activity) => (
                    <div key={activity.id} className="py-4 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-blue-100 rounded-lg p-3 mr-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-blue-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.type}</p>
                          <p className="text-sm text-gray-500">
                            {activity.duration} • {activity.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{activity.calories} cal</p>
                        <p className="text-sm text-gray-500">burned</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No activities recorded today</p>
                  <button className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Add Activity
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming tasks */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Upcoming Tasks</h3>
            </div>
            <div className="p-6">
              <ul className="divide-y divide-gray-200">
                {userData.upcomingTasks.map((task) => (
                  <li key={task.id} className="py-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3 flex-1">
                        <p
                          className={`text-sm font-medium ${task.completed ? "text-gray-400 line-through" : "text-gray-900"}`}
                        >
                          {task.title}
                        </p>
                        <p className="text-sm text-gray-500">{task.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button className="mt-4 w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard


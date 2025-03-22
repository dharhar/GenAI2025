"use client"

import { useState, useRef, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import { Send, Mic, Square } from "react-feather"
import logo from "../../assets/logo.jpg"
import { User } from 'react-feather';

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Hello! I'm your health assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)
  const [recordedUrl, setRecordedUrl] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const mediaStream = useRef(null)
  const mediaRecorder = useRef(null)
  const chunks = useRef([])

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setNewMessage("")

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text: "I've received your message. Our health team will get back to you soon.",
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
    }, 1000)
  }

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorder.current && mediaRecorder.current.state === "recording") {
        mediaRecorder.current.stop()
      }
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => {
          track.stop()
        })
      }
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaStream.current = stream
        mediaRecorder.current = new MediaRecorder(stream)
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.current.push(e.data)
          }
        }
        mediaRecorder.current.onstop = () => {
          const recordedBlob = new Blob(chunks.current, { type: "audio/webm" })
          const url = URL.createObjectURL(recordedBlob)
          setRecordedUrl(url)
          chunks.current = []
        }
        mediaRecorder.current.start()
      } catch (error) {
        console.error("Error accessing microphone:", error)
      }
    }

    setIsRecording(!isRecording)
  }

  const sendAudioMessage = () => {
    if (!recordedUrl) return

    // Add user audio message
    const audioMessage = {
      id: Date.now(),
      sender: "user",
      isAudio: true,
      audioUrl: recordedUrl,
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, audioMessage])
    setRecordedUrl("")

    // Simulate assistant response after a short delay
    setTimeout(() => {
      const assistantMessage = {
        id: Date.now() + 1,
        sender: "assistant",
        text: "I've received your audio message. Our health team will listen to it and get back to you soon.",
        timestamp: new Date(),
      }
      setMessages((prevMessages) => [...prevMessages, assistantMessage])
    }, 1000)
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="main-content">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Chat Support</h1>
          </div>

          <div className="card h-[calc(100vh-12rem)]">
            <div className="card-header">
              <div className="card-title">Health Assistant</div>
              <div className="card-description">Chat with our health support team</div>
            </div>

            <div className="card-content h-[calc(100vh-20rem)] overflow-y-auto pr-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex gap-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <div className="avatar h-8 w-8">
                        {message.sender === "user" ? (
                          <>
                            <User className="h-6 w-6"/>
                            {/* <img src="https://via.placeholder.com/32" alt="User" className="avatar-image" /> */}
                            {/* <div className="avatar-fallback"></div> */}
                          </>
                        ) : (
                          <>
                            <img src={logo} alt="Assistant" className="avatar-image" />
                            {/* <div className="avatar-fallback">HA</div> */}
                          </>
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${message.sender === "user" ? "bg-primary text-black" : "bg-muted"}`}
                      >
                        {message.isAudio ? (
                          <audio controls src={message.audioUrl} className="max-w-full" />
                        ) : (
                          <p>{message.text}</p>
                        )}
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="card-footer">
              <div className="flex w-full items-center space-x-2">
                <input
                  className="form-input"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage()
                    }
                  }}
                />

                {recordedUrl ? (
                  <div className="flex items-center gap-2">
                    <audio controls src={recordedUrl} className="h-8" />
                    <button className="btn btn-primary btn-icon rounded-full" onClick={sendAudioMessage}>
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    className={`btn ${isRecording ? "btn-destructive" : "btn-primary"} btn-icon rounded-full`}
                    onClick={toggleRecording}
                  >
                    {isRecording ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                  </button>
                )}

                {!recordedUrl && (
                  <button
                    className="btn btn-primary btn-icon rounded-full"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage


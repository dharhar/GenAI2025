"use client"

import { useState, useRef, useEffect } from "react"
import Sidebar from "../../components/sidebar"
import { Send, Mic, Square } from "react-feather"
import logo from "../../assets/logo.jpg"
import { User } from 'react-feather';
import { useAuth } from '../../context/AuthContext'

const ChatPage = () => {
  const { user } = useAuth();

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
  const [recordingError, setRecordingError] = useState("")
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

  // Check for microphone availability on component mount
  useEffect(() => {
    const checkMicrophoneAccess = async () => {
      try {
        // Just check if we can access a microphone
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasAudioInput = devices.some(device => device.kind === 'audioinput');
        
        if (!hasAudioInput) {
          setRecordingError("No microphone detected on this device");
        } else {
          // Clear any previous errors if microphone is available
          setRecordingError("");
        }
      } catch (err) {
        console.error("Error checking microphone access:", err);
        setRecordingError(`Microphone access error: ${err.message}`);
      }
    };
    
    checkMicrophoneAccess();
  }, []);

  const handleSendMessage = async () => {
    // if (!newMessage.trim()) return

    // // Add user message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prevMessages) => [...prevMessages, userMessage])
    setNewMessage("")

    
    try {
      const chatData = new FormData()
      chatData.append('username', user?.username)
      chatData.append('prompt', newMessage.trim())

      console.log("ZZZZ")
      const resp = await fetch('http://localhost:5000/medical_inference', {
        method: 'POST',
        body: chatData
      })
      

      if (!resp.ok) {
        throw new Error(`Failed medical_inference: ${resp.status}`)
      }

      const textData = await resp.text()


      // Simulate assistant response after a short delay
      setTimeout(() => {
          const assistantMessage = {
              id: Date.now() + 1,
              sender: "assistant",
              text: textData,
              timestamp: new Date(),
          }
          setMessages((prevMessages) => [...prevMessages, assistantMessage])
      }, 1000)

    } catch (error) {
        console.error("Error sending message:", error)
        // Show error in chat
        const errorMessage = {
            id: Date.now() + 1,
            sender: "assistant",
            text: `Unable to send message: ${error.message}. Please try again.`,
            timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, errorMessage])
    }
  }

  const toggleRecording = async () => {
    // If there's a recording error, alert the user and return
    if (recordingError && !isRecording) {
      alert(recordingError);
      return;
    }

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
        // Request with audio constraints and ensure we get a real audio device
        const stream = await navigator.mediaDevices.getUserMedia({ 
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true
          } 
        });
        
        // Check if we actually got audio tracks
        if (stream.getAudioTracks().length === 0) {
          throw new Error("No audio track available");
        }
        
        mediaStream.current = stream;
        
        // Use browser's native MediaRecorder with fallback for different formats
        const mimeTypes = ['audio/mp3'];
        let mimeType = '';
        
        // Find a supported mime type
        for (const type of mimeTypes) {
          if (MediaRecorder.isTypeSupported(type)) {
            mimeType = type;
            break;
          }
        }
        
        // Configure MediaRecorder with supported format
        const options = mimeType ? { mimeType, audioBitsPerSecond: 128000 } : {};
        mediaRecorder.current = new MediaRecorder(stream, options);

        chunks.current = []; // Clear previous chunks
        
        mediaRecorder.current.ondataavailable = (e) => {
          if (e.data.size > 0) {
            chunks.current.push(e.data)
          }
        }

        mediaRecorder.current.onstop = () => {
          const recordedBlob = new Blob(chunks.current, { type: mimeType || 'audio/webm' })
          const url = URL.createObjectURL(recordedBlob)
          setRecordedUrl(url)
          console.log("Recording stopped, audio URL created")
          sendAudioMessage(recordedBlob, url)
        }
        
        mediaRecorder.current.onerror = (event) => {
          console.error("MediaRecorder error:", event.error);
          setRecordingError(`Recording error: ${event.error}`);
          setIsRecording(false);
        };

        mediaRecorder.current.start()
        console.log("Recording started with mime type:", mimeType || "default");
        setRecordingError(""); // Clear any previous error
      } catch (error) {
        console.error("Error accessing microphone:", error)
        setRecordingError(`Error accessing microphone: ${error.name}: ${error.message}`);
        setIsRecording(false);
        return; // Don't update isRecording state if we failed
      }
    }

    setIsRecording(!isRecording)
  }

  const sendAudioMessage = async (blob, url) => {
    if (!blob) return

    // Create a form data object to send the audio file
    const transcribeData = new FormData()
    transcribeData.append('audio', blob, 'recording.' + (blob.type.split('/')[1] || 'webm'))

    try {
        const response = await fetch('http://localhost:5000/transcribe', {
            method: 'POST',
            body: transcribeData
        })
        
        if (!response.ok) {
            throw new Error(`Failed to send audio: ${response.status}`)
        }

        const data = await response.text() // this is already transcribed
        
        // Add transcription message
        const transcriptionMessage = {
          id: Date.now() + 1,
          sender: "user",
          text: `${data}`,
          timestamp: new Date(),
        }

        setMessages((prevMessages) => [...prevMessages, transcriptionMessage])       
        setRecordedUrl("")

        const chatData = new FormData()
        chatData.append('username', user?.username)
        chatData.append('prompt', data)

        const resp = await fetch('http://localhost:5000/medical_inference', {
          method: 'POST',
          body: chatData
        })

        if (!resp.ok) {
          throw new Error(`Failed medical_inference: ${resp.status}`)
        }

        const textData = await resp.text()

        // Simulate assistant response after a short delay
        setTimeout(() => {
            const assistantMessage = {
                id: Date.now() + 1,
                sender: "assistant",
                text: textData,
                timestamp: new Date(),
            }
            setMessages((prevMessages) => [...prevMessages, assistantMessage])
        }, 1000)

    } catch (error) {
        console.error("Error sending audio:", error)
        // Show error in chat
        const errorMessage = {
            id: Date.now() + 1,
            sender: "assistant",
            text: `Unable to process audio: ${error.message}. Please try again.`,
            timestamp: new Date(),
        }
        setMessages((prevMessages) => [...prevMessages, errorMessage])
    }
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
              {recordingError && (
                <div className="text-red-500 text-sm mt-1">{recordingError}</div>
              )}
            </div>

            <div className="card-content h-[calc(95vh-20rem)] overflow-y-auto pr-4">
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
                          </>
                        ) : (
                          <>
                            <img src={logo} alt="Assistant" className="avatar-image" />
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
                    <button className="btn btn-primary btn-icon rounded-full" onClick={() => sendAudioMessage(null, recordedUrl)}>
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
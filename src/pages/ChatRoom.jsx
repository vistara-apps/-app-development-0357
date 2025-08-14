import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Send, Users, Settings, MoreVertical, AlertCircle } from 'lucide-react'
import { mockMessages, mockCreators } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import { Input } from '../components/Input'

export function ChatRoom() {
  const { tierId } = useParams()
  const navigate = useNavigate()
  const { showSuccess, showError } = useToast()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages.filter(msg => msg.chatId === `chat-${tierId.split('-')[1]}`))
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)
  
  const tier = mockCreators
    .flatMap(creator => creator.tiers)
    .find(t => t.tierId === tierId)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  useEffect(() => {
    // Check access when component mounts
    if (!tier) {
      showError("You don't have access to this chat room")
      setTimeout(() => navigate('/dashboard'), 2000)
    }
  }, [tier, navigate, showError])
  
  if (!tier) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Chat room not found</h2>
        <p className="text-muted-foreground">You don't have access to this chat room.</p>
        <Button 
          className="mt-4" 
          onClick={() => navigate('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    )
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    
    setIsLoading(true)
    
    // Simulate network delay
    setTimeout(() => {
      const newMessage = {
        id: `msg-${Date.now()}`,
        chatId: `chat-${tierId.split('-')[1]}`,
        userId: 'current-user',
        username: 'You',
        message: message.trim(),
        timestamp: new Date().toISOString(),
        isCreator: false
      }
      
      setMessages(prev => [...prev, newMessage])
      setMessage('')
      setIsLoading(false)
    }, 300)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      {/* Chat Header */}
      <Card className="mb-4 shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h1 className="font-semibold">{tier.name} Chat</h1>
              <p className="text-sm text-muted-foreground">89 members online</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Messages */}
      <Card className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="animate-fade-in">
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                  msg.isCreator 
                    ? 'bg-accent text-white' 
                    : 'bg-border text-primary'
                }`}>
                  {msg.username.charAt(0)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`font-medium text-sm ${
                      msg.isCreator ? 'text-accent' : 'text-primary'
                    }`}>
                      {msg.username}
                    </span>
                    {msg.isCreator && (
                      <span className="bg-accent text-white text-xs px-2 py-0.5 rounded-full">
                        Creator
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Message Input */}
        <div className="border-t border-border p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <div className="flex-1">
              <Input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                aria-label="Message input"
                maxLength={500}
                error={message.length > 500 ? "Message is too long" : null}
              />
            </div>
            <div className="flex items-end">
              <Button 
                type="submit" 
                size="sm" 
                disabled={!message.trim() || isLoading || message.length > 500}
                aria-label="Send message"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-t-transparent border-accent rounded-full animate-spin"></div>
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

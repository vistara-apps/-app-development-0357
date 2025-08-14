import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Send, Users, Settings, MoreVertical } from 'lucide-react'
import { mockMessages, mockCreators } from '../data/mockData'

export function ChatRoom() {
  const { tierId } = useParams()
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState(mockMessages.filter(msg => msg.chatId === `chat-${tierId.split('-')[1]}`))
  const messagesEndRef = useRef(null)
  
  const tier = mockCreators
    .flatMap(creator => creator.tiers)
    .find(t => t.tierId === tierId)
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  
  if (!tier) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Chat room not found</h2>
        <p className="text-muted-foreground">You don't have access to this chat room.</p>
      </div>
    )
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!message.trim()) return
    
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
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
            <Button type="submit" size="sm" disabled={!message.trim()}>
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  )
}
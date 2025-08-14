import React from 'react'
import { Card } from './Card'
import { MessageCircle, Users, Lock } from 'lucide-react'

export function ChatPreview({ chat, onClick }) {
  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer animate-slide"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-accent/10 rounded-lg">
          <MessageCircle className="w-6 h-6 text-accent" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">{chat.name}</h3>
          <p className="text-sm text-muted-foreground truncate">
            {chat.lastMessage || 'Welcome to the community!'}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <Users className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {chat.memberCount} members
            </span>
            <Lock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              {chat.tierName}
            </span>
          </div>
        </div>
        
        {chat.unreadCount > 0 && (
          <div className="bg-accent text-white text-xs px-2 py-1 rounded-full min-w-[1.5rem] text-center">
            {chat.unreadCount}
          </div>
        )}
      </div>
    </Card>
  )
}
import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link, useLocation } from 'react-router-dom'
import { Home, User, MessageCircle, Settings } from 'lucide-react'

export function AppShell({ children, variant = 'default' }) {
  const location = useLocation()
  
  const isActive = (path) => location.pathname === path
  
  const shellClasses = variant === 'glass' 
    ? 'bg-surface/80 backdrop-blur-lg border border-border/50'
    : 'bg-surface'

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className={`sticky top-0 z-50 ${shellClasses} shadow-card`}>
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-2xl font-bold text-accent">
              ForgeStream
            </Link>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 animate-entrance">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border">
        <div className="container">
          <div className="flex items-center justify-around py-3">
            <Link 
              to="/" 
              className={`flex flex-col items-center space-y-1 p-2 rounded-md transition-colors ${
                isActive('/') ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Home size={20} />
              <span className="text-xs">Home</span>
            </Link>
            
            <Link 
              to="/dashboard" 
              className={`flex flex-col items-center space-y-1 p-2 rounded-md transition-colors ${
                isActive('/dashboard') ? 'text-accent bg-accent/10' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <User size={20} />
              <span className="text-xs">Profile</span>
            </Link>
            
            <button className="flex flex-col items-center space-y-1 p-2 rounded-md text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle size={20} />
              <span className="text-xs">Chats</span>
            </button>
            
            <button className="flex flex-col items-center space-y-1 p-2 rounded-md text-muted-foreground hover:text-primary transition-colors">
              <Settings size={20} />
              <span className="text-xs">Settings</span>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Spacer for bottom nav */}
      <div className="h-20"></div>
    </div>
  )
}
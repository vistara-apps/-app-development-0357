import React, { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Home, User, MessageCircle, Settings, ChevronLeft } from 'lucide-react'

// Navigation link component for bottom navigation
function NavLink({ to, icon: Icon, label, isActive }) {
  return (
    <Link 
      to={to} 
      aria-label={label}
      className={`flex flex-col items-center space-y-1 p-2 rounded-md transition-all duration-200 ${
        isActive 
          ? 'text-accent bg-accent/10 scale-105 font-medium' 
          : 'text-muted-foreground hover:text-primary hover:bg-accent/5'
      }`}
    >
      <Icon size={20} />
      <span className="text-xs">{label}</span>
      {isActive && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-accent rounded-full animate-pulse"></span>
      )}
    </Link>
  )
}

export function AppShell({ children, variant = 'default' }) {
  const location = useLocation()
  const navigate = useNavigate()
  const [showBackButton, setShowBackButton] = useState(false)
  const [pageTitle, setPageTitle] = useState('')
  
  useEffect(() => {
    // Determine if back button should be shown
    const shouldShowBack = location.pathname !== '/' && location.pathname !== '/dashboard'
    setShowBackButton(shouldShowBack)
    
    // Set page title based on path
    if (location.pathname === '/') {
      setPageTitle('Home')
    } else if (location.pathname.startsWith('/creator')) {
      setPageTitle('Creator Profile')
    } else if (location.pathname.startsWith('/chat')) {
      setPageTitle('Chat Room')
    } else if (location.pathname === '/dashboard') {
      setPageTitle('Dashboard')
    } else if (location.pathname === '/settings') {
      setPageTitle('Settings')
    }
  }, [location.pathname])
  
  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }
  
  const shellClasses = variant === 'glass' 
    ? 'bg-surface/80 backdrop-blur-lg border border-border/50'
    : 'bg-surface'

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className={`sticky top-0 z-50 ${shellClasses} shadow-card`}>
        <div className="container">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              {showBackButton && (
                <button 
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-full hover:bg-accent/10 transition-colors"
                  aria-label="Go back"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              
              <div className="flex items-center">
                <Link to="/" className="text-2xl font-bold text-accent">
                  ForgeStream
                </Link>
                {pageTitle && pageTitle !== 'Home' && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    / {pageTitle}
                  </span>
                )}
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8 animate-entrance">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-lg z-40">
        <div className="container">
          <div className="flex items-center justify-around py-3">
            <NavLink to="/" icon={Home} label="Home" isActive={isActive('/')} />
            <NavLink to="/dashboard" icon={User} label="Profile" isActive={isActive('/dashboard')} />
            <NavLink to="/dashboard?tab=chats" icon={MessageCircle} label="Chats" isActive={isActive('/chat')} />
            <NavLink to="/settings" icon={Settings} label="Settings" isActive={isActive('/settings')} />
          </div>
        </div>
      </nav>
      
      {/* Spacer for bottom nav */}
      <div className="h-20"></div>
    </div>
  )
}

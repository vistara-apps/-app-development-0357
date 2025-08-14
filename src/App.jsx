import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './pages/Home'
import { CreatorProfile } from './pages/CreatorProfile'
import { ChatRoom } from './pages/ChatRoom'
import { Dashboard } from './pages/Dashboard'
import { ToastProvider } from './context/ToastContext'
import { ErrorBoundary } from './components/ErrorBoundary'
import { Button } from './components/Button'
import { Home as HomeIcon } from 'lucide-react'

function App() {
  return (
    <Router>
      <ToastProvider>
        <ErrorBoundary
          fallback={
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/'}
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          }
        >
          <AppShell>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/creator/:creatorId" element={
                <ErrorBoundary>
                  <CreatorProfile />
                </ErrorBoundary>
              } />
              <Route path="/chat/:tierId" element={
                <ErrorBoundary>
                  <ChatRoom />
                </ErrorBoundary>
              } />
              <Route path="/dashboard" element={
                <ErrorBoundary>
                  <Dashboard />
                </ErrorBoundary>
              } />
              <Route path="/settings" element={
                <ErrorBoundary>
                  <Dashboard activeTab="settings" />
                </ErrorBoundary>
              } />
            </Routes>
          </AppShell>
        </ErrorBoundary>
      </ToastProvider>
    </Router>
  )
}

export default App

import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppShell } from './components/AppShell'
import { Home } from './pages/Home'
import { CreatorProfile } from './pages/CreatorProfile'
import { ChatRoom } from './pages/ChatRoom'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <Router>
      <AppShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/creator/:creatorId" element={<CreatorProfile />} />
          <Route path="/chat/:tierId" element={<ChatRoom />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AppShell>
    </Router>
  )
}

export default App
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import { ChatPreview } from '../components/ChatPreview'
import { Button } from '../components/Button'
import { Search, TrendingUp, Users, Star, AlertCircle, MessageCircle } from 'lucide-react'
import { mockCreators, mockChats } from '../data/mockData'
import { SkeletonCard, SkeletonChatPreview } from '../components/Skeleton'
import { EmptyState } from '../components/EmptyState'
import { Input } from '../components/Input'

export function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])
  
  const filteredCreators = mockCreators.filter(creator =>
    creator.bio.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          Join Exclusive Creator Communities
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Unlock token-gated access to your favorite creators' communities with micro-subscriptions on Base
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
        <Input
          type="text"
          placeholder="Search creators..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          aria-label="Search creators"
        />
      </div>

      {/* Featured Creators */}
      <section>
        <div className="flex items-center space-x-2 mb-6">
          <TrendingUp className="w-5 h-5 text-accent" />
          <h2 className="text-2xl font-semibold">Featured Creators</h2>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          {isLoading ? (
            // Loading state
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : filteredCreators.length > 0 ? (
            // Creators found
            filteredCreators.map((creator) => (
              <Card key={creator.userId} className="hover:shadow-lg transition-shadow animate-slide">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Users className="w-8 h-8 text-accent" />
                    </div>
                    <div className="flex-1">
                      <CardTitle>@{creator.farcasterUserId}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {creator.bio}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">
                      {creator.tiers.length} tiers available
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm">4.8</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1">
                      Starting from {Math.min(...creator.tiers.map(t => parseFloat(t.price)))} ETH
                    </Button>
                    <Link to={`/creator/${creator.userId}`}>
                      <Button>View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            // No creators found
            <div className="col-span-2">
              <EmptyState
                icon={AlertCircle}
                title="No creators found"
                description={`We couldn't find any creators matching "${searchQuery}". Try a different search term.`}
                actionLabel="Clear Search"
                onAction={() => setSearchQuery('')}
              />
            </div>
          )}
        </div>
      </section>

      {/* Active Chats Preview */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-accent" />
            <h2 className="text-2xl font-semibold">Your Communities</h2>
          </div>
          <Button variant="ghost" size="sm">View All</Button>
        </div>
        
        <div className="space-y-4">
          {isLoading ? (
            // Loading state
            <>
              <SkeletonChatPreview />
              <SkeletonChatPreview />
              <SkeletonChatPreview />
            </>
          ) : mockChats.length > 0 ? (
            // Chats found
            mockChats.slice(0, 3).map((chat) => (
              <ChatPreview
                key={chat.id}
                chat={chat}
                onClick={() => {/* Navigate to chat */}}
              />
            ))
          ) : (
            // No chats found
            <EmptyState
              icon={MessageCircle}
              title="No communities joined yet"
              description="Join a creator's community to start chatting and get exclusive content."
              actionLabel="Explore Creators"
              onAction={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          )}
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">50+</div>
            <div className="text-sm text-muted-foreground">Creators</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">2.5K+</div>
            <div className="text-sm text-muted-foreground">Members</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">150+</div>
            <div className="text-sm text-muted-foreground">Communities</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

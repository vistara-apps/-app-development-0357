import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TierCard } from '../components/TierCard'
import { Modal } from '../components/Modal'
import { Button } from '../components/Button'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import { usePaymentContext } from '../hooks/usePaymentContext'
import { Users, Calendar, Star, ExternalLink } from 'lucide-react'
import { mockCreators, mockUserSubscriptions } from '../data/mockData'

export function CreatorProfile() {
  const { creatorId } = useParams()
  const [showSubscribeModal, setShowSubscribeModal] = useState(false)
  const [selectedTier, setSelectedTier] = useState(null)
  const [isSubscribing, setIsSubscribing] = useState(false)
  const { createSession } = usePaymentContext()
  
  const creator = mockCreators.find(c => c.userId === creatorId)
  
  if (!creator) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-2">Creator not found</h2>
        <p className="text-muted-foreground">The creator you're looking for doesn't exist.</p>
      </div>
    )
  }

  const handleSubscribe = (tier) => {
    setSelectedTier(tier)
    setShowSubscribeModal(true)
  }

  const handleJoinChat = (tier) => {
    // Navigate to chat room
    window.location.href = `/chat/${tier.tierId}`
  }

  const processSubscription = async () => {
    if (!selectedTier) return
    
    setIsSubscribing(true)
    try {
      const amount = `$${(parseFloat(selectedTier.price) * 3000).toFixed(2)}` // Convert ETH to USD approximation
      await createSession(amount)
      
      // Simulate successful subscription
      alert(`Successfully subscribed to ${selectedTier.name}!`)
      setShowSubscribeModal(false)
    } catch (error) {
      console.error('Subscription failed:', error)
      alert('Subscription failed. Please try again.')
    } finally {
      setIsSubscribing(false)
    }
  }

  const getUserTierAccess = (tierId) => {
    return mockUserSubscriptions.find(sub => 
      sub.tierId === tierId && sub.status === 'active'
    )
  }

  return (
    <div className="space-y-8">
      {/* Creator Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 bg-accent/10 rounded-xl flex items-center justify-center">
              <Users className="w-12 h-12 text-accent" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold">@{creator.farcasterUserId}</h1>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-4">{creator.bio}</p>
              
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>2,340 followers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(creator.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            
            <Button variant="outline" size="sm">
              <ExternalLink className="w-4 h-4 mr-2" />
              Farcaster
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Membership Tiers */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Membership Tiers</h2>
          <p className="text-muted-foreground">
            Choose your level of access to exclusive content and community features
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {creator.tiers.map((tier) => (
            <TierCard
              key={tier.tierId}
              tier={tier}
              userAccess={getUserTierAccess(tier.tierId)}
              onSubscribe={handleSubscribe}
              onJoinChat={handleJoinChat}
            />
          ))}
        </div>
      </section>

      {/* Creator Stats */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Community Stats</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">450</div>
              <div className="text-sm text-muted-foreground">Total Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">89</div>
              <div className="text-sm text-muted-foreground">Premium Members</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">12</div>
              <div className="text-sm text-muted-foreground">Active Chats</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-accent">4.8</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Subscribe Modal */}
      <Modal
        isOpen={showSubscribeModal}
        onClose={() => setShowSubscribeModal(false)}
        title="Subscribe to Tier"
      >
        {selectedTier && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">{selectedTier.name}</h3>
              <p className="text-2xl font-bold text-accent mb-1">
                {selectedTier.price} {selectedTier.priceCurrency}
              </p>
              <p className="text-sm text-muted-foreground">
                {selectedTier.recurrence && `Billed ${selectedTier.recurrence}`}
              </p>
            </div>
            
            <div className="bg-bg rounded-lg p-4">
              <p className="text-sm text-muted-foreground">{selectedTier.description}</p>
            </div>
            
            <div className="text-xs text-muted-foreground">
              <p>• Access to exclusive {selectedTier.name} chat room</p>
              <p>• Direct interaction with the creator</p>
              <p>• Priority support and early access to content</p>
              {selectedTier.entryRequirementType === 'nft' && (
                <p>• NFT holder benefits and perks</p>
              )}
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setShowSubscribeModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={processSubscription}
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Processing...' : 'Subscribe Now'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
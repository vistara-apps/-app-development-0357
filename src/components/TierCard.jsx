import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from './Card'
import { Button } from './Button'
import { Crown, Users, Star } from 'lucide-react'

export function TierCard({ tier, onSubscribe, onJoinChat, userAccess = null }) {
  const getIcon = (tierName) => {
    const name = tierName.toLowerCase()
    if (name.includes('premium') || name.includes('gold')) return Crown
    if (name.includes('community') || name.includes('bronze')) return Users
    return Star
  }

  const Icon = getIcon(tier.name)
  const hasAccess = userAccess?.status === 'active'
  const isExpired = userAccess?.status === 'expired'

  return (
    <Card className="hover:shadow-lg transition-shadow animate-slide">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-accent/10 rounded-md">
            <Icon className="w-5 h-5 text-accent" />
          </div>
          <div>
            <CardTitle>{tier.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {tier.price} {tier.priceCurrency} {tier.recurrence && `/ ${tier.recurrence}`}
            </p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {tier.description}
        </p>
        
        <div className="text-xs text-muted-foreground mb-4">
          <strong>Access Type:</strong> {tier.entryRequirementType.replace('_', ' ').toUpperCase()}
        </div>
        
        <div className="flex space-x-2">
          {hasAccess ? (
            <Button 
              onClick={() => onJoinChat(tier)} 
              className="flex-1"
            >
              Join Chat
            </Button>
          ) : (
            <>
              <Button 
                onClick={() => onSubscribe(tier)} 
                variant={isExpired ? 'default' : 'outline'}
                className="flex-1"
              >
                {isExpired ? 'Renew' : 'Subscribe'}
              </Button>
              {tier.entryRequirementType === 'nft' && (
                <Button variant="ghost" size="sm">
                  Check NFT
                </Button>
              )}
            </>
          )}
        </div>
        
        {hasAccess && (
          <div className="mt-2 text-xs text-green-600">
            ✓ Active until {new Date(userAccess.endDate).toLocaleDateString()}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
import React, { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card'
import { Button } from '../components/Button'
import { ChatPreview } from '../components/ChatPreview'
import { 
  User, 
  Settings, 
  CreditCard, 
  MessageCircle, 
  TrendingUp,
  Calendar,
  Crown
} from 'lucide-react'
import { mockUserSubscriptions, mockChats, mockCreators } from '../data/mockData'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  
  const userSubscriptions = mockUserSubscriptions
  const userChats = mockChats.filter(chat => 
    userSubscriptions.some(sub => sub.tierId === chat.tierId)
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'chats', label: 'My Chats', icon: MessageCircle },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-20 h-20 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-3xl font-bold">Your Dashboard</h1>
        <p className="text-muted-foreground">Manage your subscriptions and community access</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-border/30 rounded-lg p-1">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-surface text-accent shadow-sm'
                  : 'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-accent">{userSubscriptions.length}</div>
                <div className="text-sm text-muted-foreground">Active Subscriptions</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-accent">{userChats.length}</div>
                <div className="text-sm text-muted-foreground">Chat Rooms</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-accent">0.15</div>
                <div className="text-sm text-muted-foreground">ETH Spent</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-2xl font-bold text-accent">4.9</div>
                <div className="text-sm text-muted-foreground">Avg Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Recent Activity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">Subscribed to Bronze Supporter</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Joined Bronze Supporters chat</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">Connected wallet</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'subscriptions' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Subscriptions</h2>
            <Button variant="outline" size="sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
          
          <div className="space-y-4">
            {userSubscriptions.map((subscription) => {
              const tier = mockCreators
                .flatMap(creator => creator.tiers)
                .find(t => t.tierId === subscription.tierId)
              
              const creator = mockCreators.find(c => 
                c.tiers.some(t => t.tierId === subscription.tierId)
              )
              
              return (
                <Card key={subscription.subscriptionId}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Crown className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{tier?.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            @{creator?.farcasterUserId}
                          </p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                            <span>Status: {subscription.status}</span>
                            <span>Next billing: {new Date(subscription.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">
                          {tier?.price} {tier?.priceCurrency}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {tier?.recurrence}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'chats' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Your Chat Rooms</h2>
            <span className="text-sm text-muted-foreground">
              {userChats.length} active rooms
            </span>
          </div>
          
          <div className="space-y-4">
            {userChats.map((chat) => (
              <ChatPreview
                key={chat.id}
                chat={chat}
                onClick={() => window.location.href = `/chat/${chat.tierId}`}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Settings</h2>
          
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>New messages</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Subscription renewals</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Creator updates</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Privacy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Show online status</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Allow direct messages</span>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full">
                  Export Data
                </Button>
                <Button variant="destructive" className="w-full">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}
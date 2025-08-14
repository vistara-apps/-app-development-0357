// Mock data for development
export const mockCreators = [
  {
    userId: 'creator-1',
    profileUrl: '/api/placeholder/120/120',
    bio: 'Digital artist creating unique NFTs and building an amazing community of collectors and creators.',
    createdAt: new Date('2024-01-15').toISOString(),
    farcasterUserId: 'artist123',
    tiers: [
      {
        tierId: 'tier-1-bronze',
        creatorId: 'creator-1',
        name: 'Bronze Supporter',
        description: 'Basic access to community discussions and monthly updates.',
        entryRequirementType: 'access_key',
        entryRequirementValue: 'bronze_key',
        price: '0.01',
        priceCurrency: 'ETH',
        recurrence: 'monthly',
        createdAt: new Date('2024-01-15').toISOString()
      },
      {
        tierId: 'tier-1-silver',
        creatorId: 'creator-1',
        name: 'Silver Circle',
        description: 'Exclusive art previews, weekly AMAs, and priority access to drops.',
        entryRequirementType: 'access_key',
        entryRequirementValue: 'silver_key',
        price: '0.05',
        priceCurrency: 'ETH',
        recurrence: 'monthly',
        createdAt: new Date('2024-01-15').toISOString()
      },
      {
        tierId: 'tier-1-gold',
        creatorId: 'creator-1',
        name: 'Gold Collectors',
        description: 'Direct creator access, custom art requests, and first access to limited editions.',
        entryRequirementType: 'nft',
        entryRequirementValue: '0x742d35Cc6634C0532925a3b8D697A6A8b2A6f8a5',
        price: '0.1',
        priceCurrency: 'ETH',
        recurrence: 'monthly',
        createdAt: new Date('2024-01-15').toISOString()
      }
    ]
  },
  {
    userId: 'creator-2',
    profileUrl: '/api/placeholder/120/120',
    bio: 'Music producer and DeFi educator sharing alpha and building the future of music on-chain.',
    createdAt: new Date('2024-02-01').toISOString(),
    farcasterUserId: 'musicproducer',
    tiers: [
      {
        tierId: 'tier-2-community',
        creatorId: 'creator-2',
        name: 'Community Member',
        description: 'Access to general music discussions and DeFi education content.',
        entryRequirementType: 'access_key',
        entryRequirementValue: 'community_key',
        price: '0.02',
        priceCurrency: 'ETH',
        recurrence: 'monthly',
        createdAt: new Date('2024-02-01').toISOString()
      },
      {
        tierId: 'tier-2-premium',
        creatorId: 'creator-2',
        name: 'Premium Producer',
        description: 'Exclusive beats, production tutorials, and DeFi alpha calls.',
        entryRequirementType: 'subscription',
        entryRequirementValue: 'premium_sub',
        price: '0.08',
        priceCurrency: 'ETH',
        recurrence: 'monthly',
        createdAt: new Date('2024-02-01').toISOString()
      }
    ]
  }
];

export const mockUserSubscriptions = [
  {
    subscriptionId: 'sub-1',
    userId: 'user-1',
    tierId: 'tier-1-bronze',
    startDate: new Date('2024-01-20').toISOString(),
    endDate: new Date('2024-02-20').toISOString(),
    status: 'active',
    paymentIntentId: 'pi_123'
  }
];

export const mockChats = [
  {
    id: 'chat-1',
    tierId: 'tier-1-bronze',
    name: 'Bronze Supporters',
    memberCount: 234,
    lastMessage: 'Welcome new members! 🎉',
    unreadCount: 3,
    tierName: 'Bronze Supporter'
  },
  {
    id: 'chat-2',
    tierId: 'tier-1-silver',
    name: 'Silver Circle',
    memberCount: 89,
    lastMessage: 'New artwork dropping tomorrow!',
    unreadCount: 0,
    tierName: 'Silver Circle'
  },
  {
    id: 'chat-3',
    tierId: 'tier-2-community',
    name: 'Music Community',
    memberCount: 156,
    lastMessage: 'Check out this new beat 🎵',
    unreadCount: 7,
    tierName: 'Community Member'
  }
];

export const mockMessages = [
  {
    id: 'msg-1',
    chatId: 'chat-1',
    userId: 'creator-1',
    username: 'Artist123',
    message: 'Welcome everyone to the Bronze Supporters chat! Feel free to share your thoughts on the latest collection.',
    timestamp: new Date('2024-01-25T10:30:00').toISOString(),
    isCreator: true
  },
  {
    id: 'msg-2',
    chatId: 'chat-1',
    userId: 'user-2',
    username: 'CryptoCollector',
    message: 'Love the new pieces! The blue tones are incredible 💙',
    timestamp: new Date('2024-01-25T10:35:00').toISOString(),
    isCreator: false
  },
  {
    id: 'msg-3',
    chatId: 'chat-1',
    userId: 'user-3',
    username: 'NFTEnthusiast',
    message: 'When will the next drop be available?',
    timestamp: new Date('2024-01-25T10:40:00').toISOString(),
    isCreator: false
  }
];
import { NFT, Collection, Auction, User } from '../types';

export const mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'Cyber Dreams #001',
    description: 'A stunning piece of digital art exploring the intersection of technology and consciousness in a neon-lit cyberpunk future.',
    image: 'https://images.unsplash.com/photo-1634655685926-944d0254af90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjkzMzU5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'NeonArtist',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
      verified: true,
    },
    owner: {
      name: 'CryptoCollector',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    price: 2.5,
    currency: 'ETH',
    blockchain: 'Ethereum',
    category: 'Art',
    properties: [
      { trait_type: 'Background', value: 'Neon City' },
      { trait_type: 'Style', value: 'Cyberpunk' },
      { trait_type: 'Rarity', value: 'Legendary' },
    ],
    royalties: 10,
    views: 1523,
    likes: 342,
    isLiked: false,
    createdAt: '2026-01-20T10:00:00Z',
    priceHistory: [
      { price: 1.5, date: '2026-01-15T10:00:00Z', event: 'minted' },
      { price: 2.0, date: '2026-01-18T14:30:00Z', event: 'sold' },
      { price: 2.5, date: '2026-01-22T09:15:00Z', event: 'listed' },
    ],
  },
  {
    id: '2',
    title: 'Abstract Horizons',
    description: 'An exploration of color and form in the digital realm, where gradients meet infinity.',
    image: 'https://images.unsplash.com/photo-1715583622581-3245cefe117d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdyYWRpZW50JTIwYmx1ZXxlbnwxfHx8fDE3NjkzMzE3MzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'DigitalDreamer',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
      verified: true,
    },
    owner: {
      name: 'DigitalDreamer',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    price: 1.8,
    currency: 'ETH',
    blockchain: 'Ethereum',
    category: 'Abstract',
    properties: [
      { trait_type: 'Type', value: 'Gradient' },
      { trait_type: 'Colors', value: 'Blue Spectrum' },
      { trait_type: 'Edition', value: '1/1' },
    ],
    royalties: 7.5,
    views: 892,
    likes: 156,
    isLiked: true,
    createdAt: '2026-01-21T14:30:00Z',
  },
  {
    id: '3',
    title: 'Future Vision',
    description: 'A glimpse into tomorrow through the lens of cutting-edge digital artistry.',
    image: 'https://images.unsplash.com/photo-1672581437674-3186b17b405a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdXR1cmlzdGljJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjkzMzQyNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'TechArtist',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
      verified: false,
    },
    owner: {
      name: 'TechArtist',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    price: 3.2,
    currency: 'ETH',
    blockchain: 'Polygon',
    category: 'Photography',
    properties: [
      { trait_type: 'Theme', value: 'Futuristic' },
      { trait_type: 'Medium', value: 'Digital' },
    ],
    royalties: 5,
    views: 2341,
    likes: 567,
    isLiked: false,
    createdAt: '2026-01-19T08:45:00Z',
  },
  {
    id: '4',
    title: 'Chromatic Symphony',
    description: 'Where colors dance and harmonize in perfect digital balance.',
    image: 'https://images.unsplash.com/photo-1736175549681-c24c552da1e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwY29sb3JmdWx8ZW58MXx8fHwxNzY5Mjc4NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'ColorMaster',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
      verified: true,
    },
    owner: {
      name: 'ArtLover',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    price: 4.5,
    currency: 'ETH',
    blockchain: 'Ethereum',
    category: 'Art',
    properties: [
      { trait_type: 'Palette', value: 'Rainbow' },
      { trait_type: 'Complexity', value: 'High' },
      { trait_type: 'Rarity', value: 'Epic' },
    ],
    royalties: 12,
    views: 3210,
    likes: 789,
    isLiked: true,
    createdAt: '2026-01-23T16:20:00Z',
  },
  {
    id: '5',
    title: 'Neon Metropolis',
    description: 'The city that never sleeps, captured in vibrant neon glory.',
    image: 'https://images.unsplash.com/photo-1626972309141-bee9f36a0499?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwY2l0eXxlbnwxfHx8fDE3NjkzMzUzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'UrbanExplorer',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
      verified: true,
    },
    owner: {
      name: 'UrbanExplorer',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    price: 2.1,
    currency: 'ETH',
    blockchain: 'Ethereum',
    category: 'Photography',
    properties: [
      { trait_type: 'Setting', value: 'Urban' },
      { trait_type: 'Time', value: 'Night' },
      { trait_type: 'Style', value: 'Neon' },
    ],
    royalties: 8,
    views: 1876,
    likes: 423,
    isLiked: false,
    createdAt: '2026-01-24T11:10:00Z',
  },
  {
    id: '6',
    title: 'Cosmic Nebula',
    description: 'Journey through the stars with this breathtaking cosmic masterpiece.',
    image: 'https://images.unsplash.com/photo-1709408635158-8d735f0395c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGFjZSUyMGdhbGF4eSUyMG5lYnVsYXxlbnwxfHx8fDE3NjkyNzA3MTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'SpaceArtist',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
      verified: true,
    },
    owner: {
      name: 'StarGazer',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    price: 5.8,
    currency: 'ETH',
    blockchain: 'Ethereum',
    category: 'Space',
    properties: [
      { trait_type: 'Type', value: 'Nebula' },
      { trait_type: 'Colors', value: 'Cosmic' },
      { trait_type: 'Rarity', value: 'Mythic' },
    ],
    royalties: 15,
    views: 4567,
    likes: 1234,
    isLiked: true,
    createdAt: '2026-01-17T13:25:00Z',
  },
  {
    id: '7',
    title: 'Geometric Dreams',
    description: 'Precision meets creativity in this stunning geometric composition.',
    image: 'https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlb21ldHJpYyUyMHBhdHRlcm58ZW58MXx8fHwxNzY5MzAxNzAwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'GeometryPro',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
      verified: false,
    },
    owner: {
      name: 'PatternCollector',
      avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
    },
    price: 1.5,
    currency: 'ETH',
    blockchain: 'Polygon',
    category: 'Abstract',
    properties: [
      { trait_type: 'Pattern', value: 'Geometric' },
      { trait_type: 'Symmetry', value: 'Perfect' },
    ],
    royalties: 6,
    views: 678,
    likes: 145,
    isLiked: false,
    createdAt: '2026-01-25T09:50:00Z',
  },
];

export const mockCollections: Collection[] = [
  
];

export const mockAuctions: Auction[] = [
  {
    id: 'auction-1',
    nft: mockNFTs[0],
    startingBid: 2.0,
    currentBid: 3.5,
    minBidIncrement: 0.1,
    endTime: '2026-01-26T18:00:00Z',
    bids: [
      {
        bidder: {
          name: 'CryptoWhale',
          avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
        },
        amount: 3.5,
        timestamp: '2026-01-25T16:45:00Z',
      },
      {
        bidder: {
          name: 'NFTCollector',
          avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
        },
        amount: 3.2,
        timestamp: '2026-01-25T15:30:00Z',
      },
      {
        bidder: {
          name: 'ArtEnthusiast',
          avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
        },
        amount: 2.8,
        timestamp: '2026-01-25T12:15:00Z',
      },
    ],
    status: 'active',
  },
  {
    id: 'auction-2',
    nft: mockNFTs[5],
    startingBid: 4.0,
    currentBid: 6.2,
    minBidIncrement: 0.2,
    endTime: '2026-01-27T20:00:00Z',
    bids: [
      {
        bidder: {
          name: 'SpaceCollector',
          avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
        },
        amount: 6.2,
        timestamp: '2026-01-25T14:20:00Z',
      },
      {
        bidder: {
          name: 'CosmicFan',
          avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
        },
        amount: 5.5,
        timestamp: '2026-01-25T10:00:00Z',
      },
    ],
    status: 'active',
  },
];

export const mockUser: User = {
  name: 'Crypto Enthusiast',
  username: 'cryptoenth',
  avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
  bio: 'Digital artist and NFT collector exploring the intersection of art and technology.',
  walletAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
  verified: true,
  social: {
    twitter: '@cryptoenth',
    discord: 'cryptoenth#1234',
    website: 'https://cryptoenth.art',
  },
  stats: {
    created: 42,
    owned: 156,
    sold: 38,
  },
};

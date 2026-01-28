import { NFT, Collection, Auction, User } from '../types';

export const mockNFTs: NFT[] = [
  {
    id: '1',
    title: 'Cyber Dreams #001',
    description: 'A stunning piece of digital art exploring the intersection of technology and consciousness in a neon-lit cyberpunk future.',
    image: 'https://images.unsplash.com/photo-1634655685926-944d0254af90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjkzMzU5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'NeonArtist',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      verified: true,
    },
    owner: {
      name: 'CryptoCollector',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
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

];

export const myNFTs: NFT[] = [
  {
    id: '1',
    title: 'Cyber Dreams #001',
    description: 'A stunning piece of digital art exploring the intersection of technology and consciousness in a neon-lit cyberpunk future.',
    image: 'https://images.unsplash.com/photo-1634655685926-944d0254af90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjkzMzU5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    creator: {
      name: 'NeonArtist',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
      verified: true,
    },
    owner: {
      name: 'CryptoCollector',
      avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
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


];

export const mockCollections: Collection[] = [
//   {
//   id: 'col-1',
//   name: 'Cyber Dreams Collection',
//   description: 'A curated collection of cyberpunk-inspired digital masterpieces.',
//   coverImage: 'https://images.unsplash.com/photo-1634655685926-944d0254af90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjkzMzU5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
//   profileImage: 'https://images.unsplash.com/photo-1634655685926-944d0254af90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBuZW9uJTIwZGlnaXRhbHxlbnwxfHx8fDE3NjkzMzU5NTF8MA&ixlib=rb-4.1.0&q=80&w=400',
//   creator: {
//     name: 'NeonArtist',
//     avatar: 'https://images.unsplash.com/photo-1595745688820-1a8bca9dd00f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHBlcnNvbiUyMGNyZWF0aXZlfGVufDF8fHx8MTc2OTMzNTk1NHww&ixlib=rb-4.1.0&q=80&w=400',
//     verified: true,
//   },
//   items: 128,
//   floorPrice: 1.8,
//   volume: 342.5,
//   verified: true,
// },
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
];

export const mockUser: User = {
  name: 'Crypto Enthusiast',
  username: 'cryptoenth',
  avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
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

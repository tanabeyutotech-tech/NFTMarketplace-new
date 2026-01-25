export interface NFT {
  id: string;
  title: string;
  description: string;
  image: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  owner: {
    name: string;
    avatar: string;
  };
  price: number;
  currency: string;
  blockchain: 'Ethereum' | 'Polygon' | 'Solana';
  category: string;
  properties: Property[];
  royalties: number;
  views: number;
  likes: number;
  isLiked?: boolean;
  createdAt: string;
  priceHistory?: PriceHistory[];
}

export interface Property {
  trait_type: string;
  value: string | number;
}

export interface PriceHistory {
  price: number;
  date: string;
  event: 'minted' | 'sold' | 'listed';
}

export interface Auction {
  id: string;
  nft: NFT;
  startingBid: number;
  currentBid: number;
  minBidIncrement: number;
  endTime: string;
  bids: Bid[];
  status: 'active' | 'ended';
}

export interface Bid {
  bidder: {
    name: string;
    avatar: string;
  };
  amount: number;
  timestamp: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  profileImage: string;
  creator: {
    name: string;
    avatar: string;
    verified: boolean;
  };
  items: number;
  floorPrice: number;
  volume: number;
  verified: boolean;
}

export interface User {
  name: string;
  username: string;
  avatar: string;
  bio: string;
  walletAddress: string;
  verified: boolean;
  social: {
    twitter?: string;
    discord?: string;
    website?: string;
  };
  stats: {
    created: number;
    owned: number;
    sold: number;
  };
}

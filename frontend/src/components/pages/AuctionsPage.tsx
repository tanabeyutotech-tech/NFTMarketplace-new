import React, { useState, useEffect } from 'react';
import { Clock, TrendingUp, Users, Gavel } from 'lucide-react';
import { Button } from '../Button';
import { mockAuctions } from '../../data/mockData';

interface AuctionsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function AuctionsPage({ onNavigate }: AuctionsPageProps) {
  const [bidAmounts, setBidAmounts] = useState<{ [key: string]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const newTimes: { [key: string]: string } = {};
      mockAuctions.forEach((auction) => {
        const end = new Date(auction.endTime).getTime();
        const now = new Date().getTime();
        const diff = end - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimes[auction.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimes[auction.id] = 'Ended';
        }
      });
      setTimeRemaining(newTimes);
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleBid = (auctionId: string) => {
    alert(`Bid placed for ${bidAmounts[auctionId] || 0} ETH! (Mock transaction)`);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 neon-text flex items-center gap-4">
          <Gavel className="w-12 h-12 text-blue-400" />
          Live Auctions
        </h1>
        <p className="text-xl text-gray-400">
          Place your bids on exclusive NFTs before time runs out
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-strong rounded-2xl p-6">
          <Clock className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{mockAuctions.length}</p>
          <p className="text-gray-400">Active Auctions</p>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <Users className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white mb-1">1,234</p>
          <p className="text-gray-400">Active Bidders</p>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white mb-1">456 ETH</p>
          <p className="text-gray-400">Total Volume</p>
        </div>
      </div>

      {/* Auctions List */}
      <div className="space-y-8">
        {mockAuctions.map((auction) => {
          const minBid = auction.currentBid + auction.minBidIncrement;
          const currentBidAmount = bidAmounts[auction.id] || minBid;

          return (
            <div key={auction.id} className="glass-strong rounded-3xl overflow-hidden hover-lift">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                {/* Left: NFT Image */}
                <div className="space-y-4">
                  <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
                    <img
                      src={auction.nft.image}
                      alt={auction.nft.title}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                      onClick={() => onNavigate('nft', auction.nft.id)}
                    />
                    <div className="absolute top-4 right-4 glass-strong px-4 py-2 rounded-full flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                      <span className="text-white font-semibold">
                        {timeRemaining[auction.id] || 'Loading...'}
                      </span>
                    </div>
                  </div>

                  {/* NFT Info */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{auction.nft.title}</h3>
                    <p className="text-gray-400 mb-4">{auction.nft.description}</p>
                    <div className="flex items-center gap-3">
                      <img
                        src={auction.nft.creator.avatar}
                        alt={auction.nft.creator.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-xs text-gray-400">Creator</p>
                        <p className="text-white font-medium">
                          {auction.nft.creator.name}
                          {auction.nft.creator.verified && (
                            <span className="ml-1 text-blue-400">✓</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Bidding Info */}
                <div className="space-y-6">
                  {/* Current Bid */}
                  <div className="glass rounded-2xl p-6">
                    <p className="text-gray-400 text-sm mb-2">Current Bid</p>
                    <p className="text-4xl font-bold text-white mb-1">
                      {auction.currentBid} ETH
                    </p>
                    <p className="text-gray-400 text-sm">
                      ≈ ${(auction.currentBid * 2340).toFixed(2)} USD
                    </p>
                  </div>

                  {/* Place Bid */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <label className="text-white font-semibold">Place a Bid</label>
                      <span className="text-sm text-gray-400">
                        Min: {minBid} ETH
                      </span>
                    </div>
                    <div className="flex gap-3 mb-3">
                      <input
                        type="number"
                        step="0.1"
                        min={minBid}
                        value={currentBidAmount}
                        onChange={(e) =>
                          setBidAmounts({
                            ...bidAmounts,
                            [auction.id]: parseFloat(e.target.value) || minBid,
                          })
                        }
                        className="flex-1 glass px-4 py-3 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold"
                      />
                      <Button
                        variant="primary"
                        onClick={() => handleBid(auction.id)}
                        className="px-8"
                      >
                        Place Bid
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {[0.1, 0.5, 1.0].map((increment) => (
                        <button
                          key={increment}
                          onClick={() =>
                            setBidAmounts({
                              ...bidAmounts,
                              [auction.id]: (currentBidAmount || minBid) + increment,
                            })
                          }
                          className="flex-1 glass px-3 py-2 rounded-lg text-sm text-blue-400 hover:bg-blue-500/20 transition-colors"
                        >
                          +{increment} ETH
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bid History */}
                  <div className="glass rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold">Bid History</h4>
                      <span className="text-sm text-gray-400">
                        {auction.bids.length} bids
                      </span>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {auction.bids.map((bid, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 glass-strong rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={bid.bidder.avatar}
                              alt={bid.bidder.name}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                            <div>
                              <p className="text-white text-sm font-medium">
                                {bid.bidder.name}
                              </p>
                              <p className="text-gray-400 text-xs">
                                {new Date(bid.timestamp).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-white font-bold">{bid.amount} ETH</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Auction Info */}
                  <div className="glass rounded-2xl p-6">
                    <h4 className="text-white font-semibold mb-4">Auction Details</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Starting Bid</span>
                        <span className="text-white font-medium">
                          {auction.startingBid} ETH
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Min Bid Increment</span>
                        <span className="text-white font-medium">
                          {auction.minBidIncrement} ETH
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Ends At</span>
                        <span className="text-white font-medium">
                          {new Date(auction.endTime).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {mockAuctions.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 gradient-blue rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
            <Gavel className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No Active Auctions</h3>
          <p className="text-gray-400 mb-6">Check back soon for new auctions</p>
          <Button variant="primary" onClick={() => onNavigate('marketplace')}>
            Explore Marketplace
          </Button>
        </div>
      )}
    </div>
  );
}

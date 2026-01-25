import React, { useState } from 'react';
import { Heart, Share2, Eye, Clock, Tag, Shield, TrendingUp, ExternalLink } from 'lucide-react';
import { Button } from '../Button';
import { NFTCard } from '../NFTCard';
import { mockNFTs } from '../../data/mockData';

interface NFTDetailPageProps {
  nftId: string;
  onNavigate: (page: string, id?: string) => void;
}

export function NFTDetailPage({ nftId, onNavigate }: NFTDetailPageProps) {
  const nft = mockNFTs.find((n) => n.id === nftId) || mockNFTs[0];
  const [activeTab, setActiveTab] = useState<'details' | 'history' | 'bids'>('details');
  const [isLiked, setIsLiked] = useState(nft.isLiked);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const relatedNFTs = mockNFTs.filter((n) => n.id !== nft.id).slice(0, 4);

  return (
    <div className="animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Left: Image */}
        <div className="space-y-6">
          <div className="glass-strong rounded-2xl overflow-hidden group">
            <div className="relative aspect-square">
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="glass-strong rounded-xl p-4 text-center">
              <Eye className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{nft.views}</p>
              <p className="text-xs text-gray-400">Views</p>
            </div>
            <div className="glass-strong rounded-xl p-4 text-center">
              <Heart className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{nft.likes}</p>
              <p className="text-xs text-gray-400">Favorites</p>
            </div>
            <div className="glass-strong rounded-xl p-4 text-center">
              <Tag className="w-5 h-5 text-blue-400 mx-auto mb-2" />
              <p className="text-2xl font-bold text-white">{nft.category}</p>
              <p className="text-xs text-gray-400">Category</p>
            </div>
          </div>
        </div>

        {/* Right: Details */}
        <div className="space-y-6">
          {/* Title & Actions */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-white mb-2 neon-text">
                  {nft.title}
                </h1>
                <p className="text-gray-400">{nft.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="glass-strong p-3 rounded-xl hover:bg-blue-500/20 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
                  />
                </button>
                <button className="glass-strong p-3 rounded-xl hover:bg-blue-500/20 transition-colors">
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Creator & Owner */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-gray-400 text-sm mb-3">Creator</p>
                <div className="flex items-center gap-3">
                  <img
                    src={nft.creator.avatar}
                    alt={nft.creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold flex items-center gap-1">
                      {nft.creator.name}
                      {nft.creator.verified && (
                        <span className="text-blue-400">✓</span>
                      )}
                    </p>
                    <p className="text-gray-400 text-sm">@{nft.creator.name.toLowerCase()}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-3">Current Owner</p>
                <div className="flex items-center gap-3">
                  <img
                    src={nft.owner.avatar}
                    alt={nft.owner.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">{nft.owner.name}</p>
                    <p className="text-gray-400 text-sm">@{nft.owner.name.toLowerCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 text-sm mb-1">Current Price</p>
                <p className="text-4xl font-bold text-white flex items-baseline gap-2">
                  {nft.price} <span className="text-xl text-blue-400">{nft.currency}</span>
                </p>
                <p className="text-gray-400 text-sm mt-1">≈ ${(nft.price * 2340).toFixed(2)} USD</p>
              </div>
              <div className="text-right">
                <p className="text-green-400 text-sm flex items-center gap-1 justify-end">
                  <TrendingUp className="w-4 h-4" />
                  +12.5%
                </p>
                <p className="text-gray-400 text-xs">Last 7 days</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowBuyModal(true)}
                className="w-full"
              >
                Buy Now
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                Make Offer
              </Button>
            </div>
          </div>

          {/* Blockchain Info */}
          <div className="glass-strong rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-semibold">Blockchain Details</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Contract Address</span>
                <span className="text-blue-400 text-sm font-mono flex items-center gap-1">
                  0x742d...5f0bEb
                  <ExternalLink className="w-3 h-3" />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Token ID</span>
                <span className="text-white text-sm font-mono">#{nft.id.padStart(8, '0')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Blockchain</span>
                <span className="text-white text-sm">{nft.blockchain}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Royalties</span>
                <span className="text-white text-sm">{nft.royalties}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-blue-500/20">
          {[
            { id: 'details', label: 'Details' },
            { id: 'history', label: 'Price History' },
            { id: 'bids', label: 'Offers' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-6 py-4 font-semibold transition-all ${
                activeTab === tab.id
                  ? 'text-blue-400 border-b-2 border-blue-400'
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="glass-strong rounded-2xl p-8 mb-20">
        {activeTab === 'details' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-4">Properties</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nft.properties.map((prop, index) => (
                  <div key={index} className="glass rounded-xl p-4 text-center">
                    <p className="text-blue-400 text-sm mb-1">{prop.trait_type}</p>
                    <p className="text-white font-semibold">{prop.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-white font-semibold mb-4">Price History</h3>
            {nft.priceHistory?.map((history, index) => (
              <div key={index} className="flex items-center justify-between p-4 glass rounded-xl">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    history.event === 'minted' ? 'bg-blue-500/20' :
                    history.event === 'sold' ? 'bg-green-500/20' : 'bg-purple-500/20'
                  }`}>
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">{history.event}</p>
                    <p className="text-gray-400 text-sm">
                      {new Date(history.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="text-white font-bold">{history.price} ETH</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'bids' && (
          <div className="text-center py-12">
            <p className="text-gray-400">No offers yet</p>
          </div>
        )}
      </div>

      {/* Related NFTs */}
      <section>
        <h2 className="text-3xl font-bold text-white mb-8">Related NFTs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedNFTs.map((relatedNft) => (
            <div key={relatedNft.id} onClick={() => onNavigate('nft', relatedNft.id)}>
              <NFTCard nft={relatedNft} />
            </div>
          ))}
        </div>
      </section>

      {/* Buy Modal */}
      {showBuyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Complete Purchase</h3>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-400">Item Price</span>
                <span className="text-white font-semibold">{nft.price} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Service Fee (2.5%)</span>
                <span className="text-white font-semibold">{(nft.price * 0.025).toFixed(3)} ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Gas Fee (estimated)</span>
                <span className="text-white font-semibold">0.015 ETH</span>
              </div>
              <div className="pt-4 border-t border-blue-500/20">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-2xl font-bold text-white">
                    {(nft.price + nft.price * 0.025 + 0.015).toFixed(3)} ETH
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowBuyModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowBuyModal(false);
                  alert('Purchase successful! (Mock transaction)');
                }}
                className="flex-1"
              >
                Confirm Purchase
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

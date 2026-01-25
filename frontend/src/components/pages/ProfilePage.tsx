import React, { useState } from 'react';
import { Edit3, Twitter, MessageCircle, Globe, Copy, ExternalLink, Grid3x3, Heart, Activity, DollarSign } from 'lucide-react';
import { Button } from '../Button';
import { NFTCard } from '../NFTCard';
import { mockUser, mockNFTs } from '../../data/mockData';

interface ProfilePageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'created' | 'owned' | 'favorites' | 'activity'>('owned');
  const [showEditModal, setShowEditModal] = useState(false);

  const userNFTs = mockNFTs.slice(0, 6);

  const copyAddress = () => {
    navigator.clipboard.writeText(mockUser.walletAddress);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="animate-fade-in">
      {/* Cover Image */}
      <div className="relative h-80 rounded-3xl overflow-hidden mb-20">
        <div className="absolute inset-0 gradient-blue-purple" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--background)]" />
        
        {/* Edit Cover Button */}
        <button className="absolute top-6 right-6 glass-strong px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-500/30 transition-colors">
          <Edit3 className="w-4 h-4 text-white" />
          <span className="text-white text-sm font-medium">Edit Cover</span>
        </button>
      </div>

      {/* Profile Info */}
      <div className="max-w-5xl mx-auto -mt-32 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="relative">
            <div className="w-40 h-40 rounded-3xl overflow-hidden border-8 border-[var(--background)] shadow-2xl">
              <img
                src={mockUser.avatar}
                alt={mockUser.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-2 right-2 w-10 h-10 gradient-blue rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
              <Edit3 className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  {mockUser.name}
                  {mockUser.verified && (
                    <span className="text-blue-400 text-2xl">✓</span>
                  )}
                </h1>
                <p className="text-gray-400 text-lg mb-4">@{mockUser.username}</p>
                <p className="text-gray-300 max-w-2xl mb-4">{mockUser.bio}</p>
              </div>
              <Button
                variant="outline"
                icon={<Edit3 className="w-4 h-4" />}
                onClick={() => setShowEditModal(true)}
              >
                Edit Profile
              </Button>
            </div>

            {/* Wallet Address */}
            <div className="glass-strong rounded-xl p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 gradient-blue rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Wallet Address</p>
                  <p className="text-white font-mono text-sm">{mockUser.walletAddress}</p>
                </div>
              </div>
              <button
                onClick={copyAddress}
                className="glass px-3 py-2 rounded-lg hover:bg-blue-500/20 transition-colors"
              >
                <Copy className="w-4 h-4 text-blue-400" />
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {mockUser.social.twitter && (
                <a
                  href={`https://twitter.com/${mockUser.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">{mockUser.social.twitter}</span>
                </a>
              )}
              {mockUser.social.discord && (
                <a
                  href="#"
                  className="glass px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-gray-300 text-sm">{mockUser.social.discord}</span>
                </a>
              )}
              {mockUser.social.website && (
                <a
                  href={mockUser.social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass px-4 py-2 rounded-lg hover:bg-blue-500/20 transition-colors flex items-center gap-2"
                >
                  <Globe className="w-4 h-4 text-blue-400" />
                  <ExternalLink className="w-3 h-3 text-gray-400" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-strong rounded-2xl p-6 text-center">
          <Grid3x3 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{mockUser.stats.created}</p>
          <p className="text-gray-400">NFTs Created</p>
        </div>
        <div className="glass-strong rounded-2xl p-6 text-center">
          <Heart className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{mockUser.stats.owned}</p>
          <p className="text-gray-400">NFTs Owned</p>
        </div>
        <div className="glass-strong rounded-2xl p-6 text-center">
          <DollarSign className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{mockUser.stats.sold}</p>
          <p className="text-gray-400">NFTs Sold</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="flex gap-4 border-b border-blue-500/20 overflow-x-auto">
          {[
            { id: 'owned', label: 'Owned', icon: Grid3x3 },
            { id: 'created', label: 'Created', icon: Sparkles },
            { id: 'favorites', label: 'Favorites', icon: Heart },
            { id: 'activity', label: 'Activity', icon: Activity },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-gray-300'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'owned' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userNFTs.map((nft) => (
              <div key={nft.id} onClick={() => onNavigate('nft', nft.id)}>
                <NFTCard nft={nft} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'created' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userNFTs.slice(0, 3).map((nft) => (
              <div key={nft.id} onClick={() => onNavigate('nft', nft.id)}>
                <NFTCard nft={nft} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mockNFTs.filter((nft) => nft.isLiked).map((nft) => (
              <div key={nft.id} onClick={() => onNavigate('nft', nft.id)}>
                <NFTCard nft={nft} />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="space-y-4">
            {[
              { type: 'Minted', nft: 'Cyber Dreams #001', time: '2 hours ago', price: '2.5 ETH' },
              { type: 'Sold', nft: 'Abstract Horizons', time: '1 day ago', price: '1.8 ETH' },
              { type: 'Listed', nft: 'Future Vision', time: '3 days ago', price: '3.2 ETH' },
              { type: 'Purchased', nft: 'Cosmic Nebula', time: '5 days ago', price: '5.8 ETH' },
            ].map((activity, index) => (
              <div key={index} className="glass-strong rounded-xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    activity.type === 'Minted' ? 'bg-blue-500/20' :
                    activity.type === 'Sold' ? 'bg-green-500/20' :
                    activity.type === 'Listed' ? 'bg-purple-500/20' : 'bg-orange-500/20'
                  }`}>
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{activity.type}</p>
                    <p className="text-gray-400 text-sm">{activity.nft}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{activity.price}</p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-6">Edit Profile</h3>
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Display Name</label>
                <input
                  type="text"
                  defaultValue={mockUser.name}
                  className="w-full glass px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Username</label>
                <input
                  type="text"
                  defaultValue={mockUser.username}
                  className="w-full glass px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Bio</label>
                <textarea
                  defaultValue={mockUser.bio}
                  rows={3}
                  className="w-full glass px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowEditModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  setShowEditModal(false);
                  alert('Profile updated! (Mock action)');
                }}
                className="flex-1"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

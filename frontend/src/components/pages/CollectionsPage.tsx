import React, { useState, useEffect } from 'react';
import { TrendingUp, Grid3x3, Search } from 'lucide-react';
import { Button } from '../Button';
import { mockCollections } from '../../data/mockData';
import { fetchCollections } from "../../js/web3/fetchCollections";

interface CollectionsPageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function CollectionsPage({ onNavigate }: CollectionsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('volume');
  const [collections, setCollections] = useState([]);

  const filteredCollections = mockCollections.filter((collection) =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  async function loadCollections() {
    try {
      const data = await fetchCollections();
      setCollections(data);
    } catch (err) {
      console.error(err);
    } 
  }

  useEffect(() => {
    loadCollections();
  }, [ ])

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 neon-text flex items-center gap-4">
          <Grid3x3 className="w-12 h-12 text-blue-400" />
          NFT Collections
        </h1>
        <p className="text-xl text-gray-400">
          Explore the most popular and valuable NFT collections
        </p>
      </div>

      {/* Search & Sort */}
      <div className="glass-strong rounded-2xl p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search collections..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass pl-12 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Sort */}
          <div className="flex gap-2">
            {[
              { id: 'volume', label: 'Volume' },
              { id: 'floor', label: 'Floor Price' },
              { id: 'items', label: 'Items' },
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className={`px-4 py-3 rounded-xl transition-all ${
                  sortBy === option.id
                    ? 'gradient-blue text-white'
                    : 'glass text-gray-400 hover:bg-blue-500/10'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="glass-strong rounded-2xl p-6">
          <Grid3x3 className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white mb-1">{mockCollections.length}</p>
          <p className="text-gray-400">Total Collections</p>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white mb-1">
            {mockCollections.reduce((acc, col) => acc + col.volume, 0).toFixed(1)}K
          </p>
          <p className="text-gray-400">Total Volume (ETH)</p>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <Grid3x3 className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white mb-1">
            {mockCollections.reduce((acc, col) => acc + col.items, 0)}
          </p>
          <p className="text-gray-400">Total Items</p>
        </div>
        <div className="glass-strong rounded-2xl p-6">
          <TrendingUp className="w-8 h-8 text-blue-400 mb-3" />
          <p className="text-3xl font-bold text-white mb-1">
            {Math.min(...mockCollections.map((c) => c.floorPrice))}
          </p>
          <p className="text-gray-400">Lowest Floor (ETH)</p>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredCollections.map((collection, index) => (
          <div
            key={collection.id}
            onClick={() => onNavigate('collection', collection.id)}
            className="glass-strong rounded-2xl overflow-hidden hover-lift cursor-pointer group animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Cover & Profile */}
            <div className="relative h-48">
              <img
                src={collection.coverImage}
                alt={collection.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/50 to-transparent" />
              
              <img
                src={collection.profileImage}
                alt={collection.name}
                className="absolute -bottom-10 left-6 w-20 h-20 rounded-2xl border-4 border-blue-900 object-cover shadow-xl"
              />
              
              {collection.verified && (
                <div className="absolute top-4 right-4 glass-strong px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span className="text-blue-400 text-lg">✓</span>
                  <span className="text-white text-sm font-medium">Verified</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 pt-14">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {collection.name}
              </h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {collection.description}
              </p>

              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-blue-500/20">
                <img
                  src={collection.creator.avatar}
                  alt={collection.creator.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs text-gray-400">Created by</p>
                  <p className="text-sm text-white font-medium">
                    {collection.creator.name}
                    {collection.creator.verified && (
                      <span className="ml-1 text-blue-400 text-xs">✓</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Items</p>
                  <p className="text-lg font-bold text-white">{collection.items}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Floor Price</p>
                  <p className="text-lg font-bold text-white">{collection.floorPrice} Ξ</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Volume</p>
                  <p className="text-lg font-bold text-white">{collection.volume}K</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCollections.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 gradient-blue rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
            <Grid3x3 className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No Collections Found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your search</p>
          <Button variant="outline" onClick={() => setSearchTerm('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Create Collection CTA */}
      <div className="glass-strong rounded-3xl p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 neon-text">
          Create Your Own Collection
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Launch your NFT collection and join the world's leading creators
        </p>
        <Button variant="primary" size="lg" onClick={() => onNavigate('mint')}>
          Start Creating
        </Button>
      </div>
    </div>
  );
}

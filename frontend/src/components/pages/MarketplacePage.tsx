import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal, Grid3x3, List, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { NFTCard } from '../NFTCard';
import { Button } from '../Button';
import { mockNFTs } from '../../data/mockData';
import { fetchMydNFTs, listNFTs, fetchListedNFTs } from "../../js/web3/fetchCollections";

interface MarketplacePageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function MarketplacePage({ onNavigate }: MarketplacePageProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 });
  const [showFilters, setShowFilters] = useState(false);
  const [my_NFTs, setmy_NFTs] = useState([]);
  const [common_NFTs, setcommon_NFTs] = useState([]);

  const categories = ['all', 'art', 'photography', 'abstract', 'space', 'gaming'];
  const sortOptions = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'price-low', label: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', label: 'Price: High to Low', icon: DollarSign },
    { id: 'newest', label: 'Recently Listed', icon: Clock },
  ];

  const filteredNFTs = mockNFTs.filter((nft) => {
    const matchesSearch = nft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         nft.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           nft.category.toLowerCase() === selectedCategory;
    const matchesPrice = nft.price >= priceRange.min && nft.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  useEffect(() => {
        fetchMydNFTs().then(setmy_NFTs);
        fetchListedNFTs().then(setcommon_NFTs);
    }, []);
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 neon-text">
          Explore NFTs
        </h1>
        <p className="text-xl text-gray-400">
          Discover, collect, and sell extraordinary NFTs
        </p>
      </div>

      {/* Search & Filters Bar */}
      <div className="glass-strong rounded-2xl p-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search NFTs, collections, or creators..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full glass pl-12 pr-4 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* View Toggle */}
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`glass px-4 py-3 rounded-xl transition-all ${
                viewMode === 'grid'
                  ? 'bg-blue-600/30 border border-blue-500/40'
                  : 'hover:bg-blue-500/10'
              }`}
            >
              <Grid3x3 className="w-5 h-5 text-blue-300" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`glass px-4 py-3 rounded-xl transition-all ${
                viewMode === 'list'
                  ? 'bg-blue-600/30 border border-blue-500/40'
                  : 'hover:bg-blue-500/10'
              }`}
            >
              <List className="w-5 h-5 text-blue-300" />
            </button>
          </div>

          {/* Filters Toggle */}
          <Button
            variant="secondary"
            icon={<SlidersHorizontal className="w-5 h-5" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-blue-500/20 space-y-6 animate-fade-in">
            {/* Categories */}
            <div>
              <label className="text-white font-semibold mb-3 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg capitalize transition-all ${
                      selectedCategory === category
                        ? 'gradient-blue text-white'
                        : 'glass text-gray-300 hover:bg-blue-500/10'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-white font-semibold mb-3 block">
                Price Range (ETH): {priceRange.min} - {priceRange.max}
              </label>
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange({ ...priceRange, min: parseFloat(e.target.value) || 0 })}
                  className="glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                />
                <span className="text-gray-400">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseFloat(e.target.value) || 10000 })}
                  className="glass px-4 py-2 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between mb-8">
        <p className="text-gray-400">
          <span className="text-white font-semibold">{filteredNFTs.length}</span> items found
        </p>
        <div className="flex gap-2">
          {sortOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSortBy(option.id)}
                className={`glass px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  sortBy === option.id
                    ? 'bg-blue-600/30 border border-blue-500/40 text-blue-300'
                    : 'text-gray-400 hover:bg-blue-500/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* NFT Grid */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} onClick={() => onNavigate('nft', nft.id)}>
              <NFTCard nft={nft} />
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredNFTs.map((nft) => (
            <div
              key={nft.id}
              onClick={() => onNavigate('nft', nft.id)}
              className="glass rounded-2xl p-6 hover-lift cursor-pointer group"
            >
              <div className="flex gap-6">
                <img
                  src={nft.image}
                  alt={nft.title}
                  className="w-32 h-32 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-1">{nft.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{nft.description}</p>
                    </div>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-lg">
                      {nft.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Creator</p>
                      <p className="text-sm text-white font-medium">{nft.creator.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 mb-1">Price</p>
                      <p className="text-lg font-bold text-white">{nft.price} {nft.currency}</p>
                    </div>
                    <div className="ml-auto">
                      <Button variant="primary" size="sm">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {filteredNFTs.length === 0 && (
        <div className="text-center py-20">
          <div className="w-24 h-24 gradient-blue rounded-full flex items-center justify-center mx-auto mb-6 opacity-50">
            <Search className="w-12 h-12 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">No NFTs Found</h3>
          <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setPriceRange({ min: 0, max: 10 });
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}

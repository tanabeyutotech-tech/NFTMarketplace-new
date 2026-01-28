import React, { useState, useEffect } from 'react';
import { TrendingUp, Flame, Clock, Star, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { NFTCard } from '../NFTCard';
import { Button } from '../Button';
import { mockNFTs, mockCollections, myNFTs } from '../../data/mockData';
import { fetchMydNFTs, listNFTs, fetchListedNFTs } from "../../js/web3/fetchCollections";

interface HomePageProps {
  onNavigate: (page: string, id?: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [my_NFTs, setmy_NFTs] = useState([]);
  const [common_NFTs, setcommon_NFTs] = useState([]);
  const featuredNFTs = mockNFTs.slice(0, 3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredNFTs.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredNFTs.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % featuredNFTs.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + featuredNFTs.length) % featuredNFTs.length);


  useEffect(() => {
      fetchMydNFTs();
      fetchListedNFTs();
  }, []);

  function onBuy(nft){
    console.log(`onbuyfunction:${nft.address}`);
    listNFTs(nft);
    fetchListedNFTs();
  }

  function onList(nft, listPrice){
    console.log(`onbuyfunction:${nft.address}`);
    listNFTs(nft,listPrice);
    fetchListedNFTs();
  }

  return (
    <div className="animate-fade-in">
      {/* Hero Carousel */}
      <section className="relative h-[600px] mb-20 rounded-3xl overflow-hidden">
        <div className="absolute inset-0">
          {featuredNFTs.map((nft, index) => (
            <div
              key={nft.id}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={nft.image}
                alt={nft.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-900/70 to-transparent" />
            </div>
          ))}
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl">
            <div className="inline-block glass px-4 py-2 rounded-full mb-6">
              <span className="text-blue-300 text-sm font-medium flex items-center gap-2">
                <Flame className="w-4 h-4" />
                Featured Collection
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 neon-text">
              {featuredNFTs[currentSlide].title}
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              {featuredNFTs[currentSlide].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-5 h-5" />}
                // onClick={() => onNavigate('nft', featuredNFTs[currentSlide].id)}
              >
                View Details
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('marketplace')}
              >
                Explore Marketplace
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="absolute bottom-8 right-8 flex gap-3">
          <button
            onClick={prevSlide}
            className="glass-strong p-3 rounded-full hover:bg-blue-500/30 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="glass-strong p-3 rounded-full hover:bg-blue-500/30 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredNFTs.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-8 bg-blue-400' : 'w-4 bg-gray-500'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Volume', value: '2.5M ETH', icon: TrendingUp },
            { label: 'Total NFTs', value: '125K+', icon: Star },
            { label: 'Active Users', value: '45K+', icon: Flame },
            { label: 'Live Auctions', value: '1.2K', icon: Clock },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="glass-strong p-6 rounded-2xl hover-lift">
                <Icon className="w-8 h-8 text-blue-400 mb-3" />
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trending NFTs */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Flame className="w-8 h-8 text-orange-500" />
              Trending NFTs
            </h2>
            <p className="text-gray-400">Most popular NFTs in the last 24 hours</p>
          </div>
          <Button
            variant="ghost"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => onNavigate('marketplace')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockNFTs.map((nft) => (
            <div key={nft.id} >
              <NFTCard nft={nft} />
            </div>
          ))}
          {/* onClick={() => onNavigate('nft', nft.id)} */}
        </div>
      </section>

      {/* Top Collections */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Top Collections</h2>
            <p className="text-gray-400">Explore the most valuable NFT collections</p>
          </div>
          <Button
            variant="ghost"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => onNavigate('collections')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCollections.map((collection) => (
            <div
              key={collection.id}
              onClick={() => onNavigate('collection', collection.id)}
              className="glass rounded-2xl overflow-hidden hover-lift cursor-pointer group"
            >
              <div className="relative h-48">
                <img
                  src={collection.coverImage}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
                <img
                  src={collection.profileImage}
                  alt={collection.name}
                  className="absolute -bottom-8 left-6 w-16 h-16 rounded-xl border-4 border-blue-900 object-cover"
                />
              </div>
              <div className="p-6 pt-12">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white mb-1 flex items-center gap-2">
                      {collection.name}
                      {collection.verified && (
                        <span className="text-blue-400">✓</span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-400">by {collection.creator.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-500/20">
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Items</p>
                    <p className="text-sm font-semibold text-white">{collection.items}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Floor</p>
                    <p className="text-sm font-semibold text-white">{collection.floorPrice} ETH</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-1">Volume</p>
                    <p className="text-sm font-semibold text-white">{collection.volume}K</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newly Minted */}
      <section className="mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-400" />
              Newly Minted
            </h2>
            <p className="text-gray-400">Fresh drops from talented creators</p>
          </div>
          <Button
            variant="ghost"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => onNavigate('marketplace')}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {myNFTs.map((nft) => (
            <div key={nft.id} >
              <NFTCard nft={nft} ownership={true} onBuy={onBuy} onList={onList} />
            </div>
          ))}
        </div>
      </section>
            {/* onClick={() => onNavigate('nft', nft.id)} */}
      {/* CTA Section */}
      <section className="glass-strong rounded-3xl p-12 text-center mb-20">
        <h2 className="text-4xl font-bold text-white mb-4 neon-text">
          Create Your NFT Today
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Join thousands of artists and creators. Mint, sell, and collect extraordinary NFTs on the world's first and largest NFT marketplace.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onNavigate('mint')}
          >
            Start Creating
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => onNavigate('marketplace')}
          >
            Explore Marketplace
          </Button>
        </div>
      </section>
    </div>
  );
}

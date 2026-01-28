import React from 'react';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { NFT } from '../types';
import { Button } from './Button';
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

interface NFTCardProps {
  nft: NFT;
  // onLike?: (id: string) => void;
  // onBuy?: (id: string) => void;
}

export function NFTCard({ nft, ownership, onBuy, onList }: NFTCardProps) {
  const [listPrice, setListPrice] = useState(0);
  
  return (
    <div className="glass rounded-2xl overflow-hidden hover-lift group animate-fade-in">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={nft.image}
          alt={nft.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // onLike?.(nft.id);
            }}
            className="glass-strong p-2 rounded-full hover:bg-blue-500/30 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${nft.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </button>
        </div>

        {/* Stats Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3 text-white text-sm">
            <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {/* {nft.views} */}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {/* {nft.likes} */}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Category */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-white truncate">{nft.title}</h3>
            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-lg">
              {nft.category}
            </span>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2">{nft.description}</p>
        </div>

        {/* Creator */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-blue-500/20">
          <img
            src={nft.creator.avatar}
            alt={nft.creator.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400">Creator</p>
            <p className="text-sm text-white truncate font-medium">
              {nft.creator.name}
              {/* {nft.creator.verified && (
                <span className="ml-1 text-blue-400">✓</span>
              )} */}
            </p>
          </div>
        </div>
        <div>
          {ownership &&  (<input
            type="text"
            placeholder="e.g. Cyber Dream"
            onChange={(e) => setListPrice(e.target.value)}
            
            // onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-20 h-1 mb-4 glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            // required
          />)}
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Current Price</p>
            <p className="text-lg font-bold text-white">
              {ownership? `` : `${nft.price} ETH` }
              {/* {nft.currency} */}
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<ShoppingCart className="w-4 h-4" />}
            onClick={(e) => {

              e.stopPropagation();
              console.log(`newlistprice:${listPrice}`);
              // console.log(`newlistprice:${ethers.formatEther(listPrice)}`);
              if(ownership)onList(nft,listPrice);
              else{
                console.log(`buyfunc`);
              }
            }}
          >
            {ownership? 'List' : 'Buy'}
          </Button>
        </div>
      </div>
    </div>
  );
}

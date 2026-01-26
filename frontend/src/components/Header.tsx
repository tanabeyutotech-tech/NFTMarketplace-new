import React, { useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import { Menu, X, Wallet, Search, User, Home, Store, Hammer, Grid3x3, Sparkles } from 'lucide-react';
import { Button } from './Button';
import {useEffect } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [account, setAccount] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Marketplace', icon: Store },
    { id: 'auctions', label: 'Auctions', icon: Hammer },
    { id: 'collections', label: 'Collections', icon: Grid3x3 },
    { id: 'mint', label: 'Create NFT', icon: Sparkles },
  ];

  const handleWalletConnect = async () => {
    if(!walletConnected) 
    {
      console.log(`handlewalletconenct`);
      if (!window.ethereum) {
        alert('Install MetaMask');
        return;
      }

      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();

        const message = "Confirm wallet connection";
        const signature = await signer.signMessage(message);

        console.log("Wallet confirmed:", address);
        console.log("Signature:", signature);
        setAccount(address);
        setWalletConnected(true);

      } catch (error) {
        console.error('MetaMask login error:', error);
      }
      return;
    }
    else{
      console.log(`connected`);
      setAccount(null);
      setWalletConnected(false);
    }


  };
  async function handleWalletdisConnect(){
    console.log("Wallet disconnected");
    setAccount(null);           // Clear stored account
    setWalletConnected(false); // Update connection state
  }

  return (
    <header className="sticky top-0 z-50 glass-strong border-b border-blue-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-12 h-12 gradient-blue rounded-xl flex items-center justify-center neon-glow group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white neon-text">NFT Market</h1>
              <p className="text-xs text-blue-300">Next-Gen Marketplace</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                    currentPage === item.id
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40'
                      : 'text-gray-300 hover:bg-blue-500/10 hover:text-blue-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button className="hidden md:flex glass p-2.5 rounded-lg hover:bg-blue-500/20 transition-colors">
              <Search className="w-5 h-5 text-blue-300" />
            </button>

            {/* Wallet Connect */}
            <Button
              variant={walletConnected ? 'secondary' : 'primary'}
              size="sm"
              icon={walletConnected ? <User className="w-4 h-4" /> : <Wallet className="w-4 h-4" />}
              onClick={() => handleWalletConnect()}
              className="hidden sm:flex"
            >
              {walletConnected ? `${account.slice(2, 4)}...${account.slice(-4)}` : 'Connect'}
            </Button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden glass p-2.5 rounded-lg hover:bg-blue-500/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-blue-300" />
              ) : (
                <Menu className="w-5 h-5 text-blue-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-blue-500/20 animate-fade-in">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-all ${
                    currentPage === item.id
                      ? 'bg-blue-600/30 text-blue-300'
                      : 'text-gray-300 hover:bg-blue-500/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <Button
              variant="primary"
              className="w-full"
              icon={<Wallet className="w-4 h-4" />}
              onClick={handleWalletConnect}
            >
              {walletConnected ? 'Connected' : 'Connect Wallet'}
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

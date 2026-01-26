import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { MintPage } from './components/pages/MintPage';
import { CreateCollectionPage } from './components/pages/CreateCollectionPage';
import { MarketplacePage } from './components/pages/MarketplacePage';
import { NFTDetailPage } from './components/pages/NFTDetailPage';
import { AuctionsPage } from './components/pages/AuctionsPage';
import { CollectionsPage } from './components/pages/CollectionsPage';
import { ProfilePage } from './components/pages/ProfilePage';

type Page = 'home' | 'mint' | 'marketplace' | 'nft' | 'auctions' | 'collections' | 'collection' | 'profile' |  'createcollection';

interface AppState {
  currentPage: Page;
  selectedId?: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentPage: 'home',
  });

  const handleNavigate = (page: string, id?: string) => {
    setAppState({
      currentPage: page as Page,
      selectedId: id,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (appState.currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'mint':
        return <MintPage onNavigate={handleNavigate} />;
      case 'marketplace':
        return <MarketplacePage onNavigate={handleNavigate} />;
      case 'nft':
        return (
          <NFTDetailPage
            nftId={appState.selectedId || '1'}
            onNavigate={handleNavigate}
          />
        );
      case 'auctions':
        return <AuctionsPage onNavigate={handleNavigate} />;
      case 'collections':
        return <CollectionsPage onNavigate={handleNavigate} />;
      case 'createcollection':
        return <CreateCollectionPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header currentPage={appState.currentPage} onNavigate={handleNavigate} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Video, Music, File, Info, Zap, Check } from 'lucide-react';
import { Button } from '../Button';

interface MintPageProps {
  onNavigate: (page: string) => void;
}

export function CreateCollectionPage({ onNavigate }: MintPageProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'art',
    blockchain: 'ethereum',
    royalties: 10,
    supply: 1,
  });
  const [properties, setProperties] = useState([{ trait: '', value: '' }]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onNavigate('marketplace');
    }, 3000);
  };

  const addProperty = () => {
    setProperties([...properties, { trait: '', value: '' }]);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 neon-text">
          Create New Collection
        </h1>
        <p className="text-xl text-gray-400">
          Mint your digital creation on the blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="space-y-6">
          {/* Upload Media */}
          <div className="glass-strong rounded-2xl p-8">
            <label className="block mb-4">
              <span className="text-white font-semibold flex items-center gap-2 mb-3">
                <Upload className="w-5 h-5 text-blue-400" />
                Upload File
              </span>
              <div className="border-2 border-dashed border-blue-500/30 rounded-xl p-12 text-center hover:border-blue-500/60 transition-colors cursor-pointer group">
                <div className="w-16 h-16 gradient-blue rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <label className="file-upload">
                    <ImageIcon className="w-8 h-8 text-white"  />
                    {/* Choose File */}
                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={(e) => {
                        setFile(e.target.files[0]);
                        setPreview(URL.createObjectURL(e.target.files[0]));
                      }}
                    />
                  </label>

                </div>
                <p className="text-white font-medium mb-2">
                  Sellect collection Image
                </p>
              </div>
            </label>
          </div>

          <form onSubmit={handleMint} className="space-y-6">
            {/* Title */}
            <div className="glass-strong rounded-2xl p-6">
              <label className="block">
                <span className="text-white font-semibold mb-2 block">Title *</span>
                <input
                  type="text"
                  placeholder="e.g. Cyber Dream"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

            {/* Blockchain */}
            <div className="glass-strong rounded-2xl p-6">
              <label className="block">
                <span className="text-white font-semibold mb-3 block flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-400" />
                  Blockchain
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {['ethereum', 'polygon', 'solana'].map((chain) => (
                    <button
                      key={chain}
                      type="button"
                      onClick={() => setFormData({ ...formData, blockchain: chain })}
                      className={`glass px-4 py-3 rounded-lg transition-all ${
                        formData.blockchain === chain
                          ? 'bg-blue-600/30 border-2 border-blue-500'
                          : 'border border-blue-500/20 hover:bg-blue-500/10'
                      }`}
                    >
                      <span className="text-white capitalize font-medium">{chain}</span>
                    </button>
                  ))}
                </div>
              </label>
            </div>

            {/* Royalties */}
            <div className="glass-strong rounded-2xl p-6">
              <label className="block">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white font-semibold">Royalties (%)</span>
                  <span className="text-blue-400 font-semibold">{formData.royalties}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={formData.royalties}
                  onChange={(e) => setFormData({ ...formData, royalties: parseInt(e.target.value) })}
                  className="w-full"
                />
                <div className="flex items-start gap-2 mt-3 p-3 glass rounded-lg">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-gray-400">
                    Royalty percentage you'll receive on secondary sales
                  </p>
                </div>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Zap className="w-5 h-5" />}
            >
              Create Collection
            </Button>
          </form>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="glass-strong rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Preview</h3>
            <div className="glass rounded-xl overflow-hidden mb-4">
              <div className="aspect-square bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 flex items-center justify-center">
                {/* <ImageIcon className="w-24 h-24 text-white/30" /> */}
                { preview && (<img src={preview} className='w-full h-full border-none'></img>)}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {formData.title || 'Untitled Collection'}
                </h4>
              </div>
              
              <div className="pt-4 border-t border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 gradient-blue rounded-full" />
                  <div>
                    <p className="text-xs text-gray-400">Creator</p>
                    <p className="text-sm text-white font-medium">You</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-blue-500/20 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Blockchain</span>
                  <span className="text-white capitalize">{formData.blockchain}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Royalties</span>
                  <span className="text-white">{formData.royalties}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Estimated Gas</span>
                  <span className="text-blue-400">~0.05 ETH</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-strong rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 gradient-blue rounded-full flex items-center justify-center mx-auto mb-4 neon-glow">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">NFT Minted Successfully!</h3>
            <p className="text-gray-400 mb-6">
              Your NFT has been minted and is now live on the blockchain.
            </p>
            <Button
              variant="primary"
              onClick={() => onNavigate('marketplace')}
              className="w-full"
            >
              View in Marketplace
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { uploadFileToPinata } from "../../js/pinata";
import { getFactoryContract } from "../../js/web3/factory";
import { NFT_FACTORY_ADDRESS } from "../../contracts/addresses";
import { Upload, Image as ImageIcon, Video, Music, File, Info, Zap, Check } from 'lucide-react';
import { Button } from '../Button';

interface MintPageProps {
  onNavigate: (page: string) => void;
}

export function CreateCollectionPage({ onNavigate }: MintPageProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: ',',
    symbol: 'ETH',
    coverImagePath: '',
    profileImagePath: '',
    creatorName: '',
    creatorAvatarPath: '',
  });
  const [properties, setProperties] = useState([{ trait: '', value: '' }]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [coverImageFile, setCoverImageFile] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [creatorAvatarFile, setAvatarFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreateCollection = async (e: React.FormEvent) => {
    console.log(`coverImagePath:${formData.coverImagePath}`);
    console.log(`coverImageFile:${coverImageFile}`);
    e.preventDefault();
    if(!formData.coverImagePath) return;

    setLoading(true);
    const collectionImageUrl = await uploadFileToPinata(formData.coverImagePath);
    const profileImageUrl = await uploadFileToPinata(formData.profileImagePath);
    const avatarImageUrl = await uploadFileToPinata(formData.creatorAvatarPath);
    const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);

    // deploy new NFT collection
    const tx = await factory.createCollection(
      formData.title,
      formData.symbol,
      collectionImageUrl,
      formData.description,
      profileImageUrl,
      formData.creatorName,
      avatarImageUrl
    );    
    await tx.wait();
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setLoading(false);
      onNavigate('collections');
    }, 2000);
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
                        // setCollectionImage(e.target.files[0]);
                        setFormData({ ...formData, coverImagePath: e.target.files[0]});
                        setCoverImageFile(URL.createObjectURL(e.target.files[0]));
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

          <form onSubmit={handleCreateCollection} className="space-y-6">
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

            {/* Creator */}
            <div className="glass-strong rounded-2xl p-6">
              <label className="block">
                <span className="text-white font-semibold mb-2 block">Creator *</span>
                <input
                  type="text"
                  placeholder="e.g. Cyber Dream"
                  value={formData.creatorName}
                  onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </label>
            </div>

           {/* Description */}
            <div className="glass-strong rounded-2xl p-6">
              <label className="block">
                <span className="text-white font-semibold mb-2 block">Description</span>
                <textarea
                  placeholder="Tell the story of your NFT..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full glass px-4 py-3 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
                  {['ETH', 'POL', 'SOL'].map((chain) => (
                    <button
                      key={chain}
                      type="button"
                      onClick={() => setFormData({ ...formData, symbol: chain })}
                      className={`glass px-4 py-3 rounded-lg transition-all ${
                        formData.symbol === chain
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
            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              icon={<Zap className="w-5 h-5" />}
            >
              {!loading ? "Create Collection" : "Creating" }
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
                { coverImageFile && (<img src={coverImageFile} className='w-full h-full border-none'></img>)}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {formData.title || 'Untitled Collection'}
                </h4>
                <p className="text-gray-400 text-sm">
                  {formData.description || 'No description yet...'}
                </p>
              </div>
              <div className="flex pt-4 border-t gap-30 border-blue-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex item-center gap-2 mb-3">
                    <div className="w-10 h-10 gradient-blue rounded-full">
                      <label className=' cursor-pointer '>
                        <div className="w-full h-full">
                            {creatorAvatarFile && <img src={creatorAvatarFile} className='w-full h-full rounded-full'></img>}
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => {
                                setFormData({ ...formData, creatorAvatarPath: e.target.files[0]});
                                setAvatarFile((URL.createObjectURL(e.target.files[0])));
                              }}
                            />
                        </div>
                      </label>
                    </div>
                    <div >
                      <p className="text-xs text-gray-400">Creator</p>
                      <p className="text-sm text-white font-medium">{formData.creatorName || "you"}</p>
                    </div>      
                  </div>
                  <div className="flex item-center gap-2 mb-3">
                    <div className="w-10 h-10 gradient-blue rounded-full" >
                      <label className=' cursor-pointer '>
                        <div className="w-full h-full">
                            { profileImageFile && <img src={profileImageFile} className='w-full h-full rounded-full'></img>}
                            <input
                              type="file"
                              hidden
                              accept="image/*"
                              onChange={(e) => {
                                // setCollectionImage(e.target.files[0]);
                                setFormData({ ...formData, profileImagePath: e.target.files[0]});
                                setProfileImageFile((URL.createObjectURL(e.target.files[0])))
                              }}
                            />
                        </div>
                      </label>                    
                    </div>
                    <div className="h-10 flex items-center">
                      <p className="text-sm text-white font-medium ">Profile</p>
                    </div>   
                  </div>

                </div>

              </div>
              <div className="pt-4 border-t border-blue-500/20 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Blockchain</span>
                  <span className="text-white capitalize">{formData.symbol}</span>
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

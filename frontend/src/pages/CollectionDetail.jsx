import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ethers } from "ethers";
import { fetchCollectionNFTs } from "../web3/collectionDetailNFTs";
import { getNFTContract } from "../web3/contract";
import { getMarketplaceContract  } from "../web3/marketplace";
import { MARKETPLACE_ADDRESS } from "../contracts/addresses";


export default function CollectionDetail({minted, mintedCallBack}) {
  const { address } = useParams(); // ✅ FIX
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(true);

   async function loadNFTs() {
    try {
      const allNFTs = await fetchCollectionNFTs(address);
      setNfts(allNFTs);
    } catch (err) {
      console.error("Failed to load NFTs:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNFTs();
  }, [address]);

  useEffect(() => {
    if(minted){
      loadNFTs();
      mintedCallBack();
    }

  }, [minted]);

  async function buyCollectionNFT(nft){
        if (!window.ethereum) return;
        console.log(`buycollection`);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = await getNFTContract(address);
        const marketplace = await getMarketplaceContract(MARKETPLACE_ADDRESS);
        
        const price = ethers.parseEther(nft.price.toString());
        console.log(`buyNft${address}`);
        console.log(`buyNft${nft.tokenId}`);
        const tx = await marketplace.buyNFT(address, nft.tokenId, {
              value: price,
        });
        await tx.wait();
        await loadNFTs();
  }

  if (loading) {
    return (
      <div className="p-10 text-center text-cyan-300">
        Loading NFTs...
      </div>
    );
  }

  return (
    <div className="px-6 py-10 mx-auto max-w-7xl">
      {/* ✅ HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-cyan-300">
          Collection
        </h1>
        <p className="mt-2 text-sm break-all text-slate-400">
          {address}
        </p>

        <Link
          to="/collections"
          className="inline-block mt-4 text-cyan-400 hover:underline"
        >
          ← Back to Collections
        </Link>
      </div>

      {nfts.length === 0 ? (
        <p className="text-slate-400">
          No NFTs found in this collection.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6 md:grid-cols-2 sm:grid-cols-1">
          {nfts.map((nft) => (
            <div
              key={nft.address}
              className="p-5 rounded-3xl bg-gradient-to-br from-[#061f2f] to-[#020617]"
            >
              <img
                src={nft.image}
                alt={nft.name}
                className="object-cover w-full h-48 mb-4 rounded-xl"
              />

              <h3 className="text-lg font-semibold text-cyan-300">
                {nft.tokenId}-   {nft.name}
              </h3>

              <p className="text-sm text-slate-400">
                Price: {nft.price} ETH
              </p>

              <button className="w-full py-2 mt-4 font-semibold text-black rounded-xl bg-cyan-500 hover:bg-cyan-400" onClick={ () => { buyCollectionNFT(nft)}}>
                Buy
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
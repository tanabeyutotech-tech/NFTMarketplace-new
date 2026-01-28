import { ethers } from "ethers";
import NFTArtifact from "../../contracts/NFT.json";
import { NFT_FACTORY_ADDRESS, MARKETPLACE_ADDRESS } from "../../contracts/addresses";

import { getFactoryContract, getMarketplaceContract } from "./factory";
// import { verify } from "node:crypto";
function ipfsToHttp(ipfsUrl) {
  if (!ipfsUrl) return "";
  return ipfsUrl.replace(
      "ipfs://",
      "https://gateway.pinata.cloud/ipfs/"
  );
}
export async function fetchCollections() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);
  const addresses = await factory.getCollections();

  console.log(`collectionnum:${addresses.length}`);
  return Promise.all(
    addresses.map(async (addr) => {
      const nft = new ethers.Contract(
        addr,
        NFTArtifact.abi,
        signer
      );
      console.log(`111111111111collection description: ${await nft.collectionSymbol()}`);
      
      return {
        id: addr,
        address: addr,
        name: await nft.collectionName(),
        symbol: await nft.collectionSymbol(),
        profileImage: ipfsToHttp(await nft.profileImage()),
        description: await nft.collectionDescription(),
        creator: {
          name: await nft.creatorName(),
          avatar: ipfsToHttp(await nft.creatorAvatar()),
          verified: true,
        },
        coverImage: ipfsToHttp(await nft.collectionCover()),
        items: Number(await nft.nextTokenId()),
        floorPrice: 3.5,
        volume: 567.2,
        verified: true,
      };
    })
  );
}

export async function fetchListedNFTs() {
  const common_items = [];
  const my_items = [];
  try{
        if (!window.ethereum) return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const collections = await fetchCollections();


        const marketplace = await getMarketplaceContract(NFT_FACTORY_ADDRESS);
        await Promise.all(
          collections.map(async(col) => {

            const nft = new ethers.Contract(
              col.address,
              NFTArtifact.abi,
              signer
            );      
            const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);
            console.log(`nftfactrory: ${NFT_FACTORY_ADDRESS}`);
            console.log(`coladdress: ${col.address}`);
            const nextTokenId = await nft.nextTokenId();
            console.log(`nextTokenId: ${nextTokenId}`);

            let item;
            for (let tokenId = 0; tokenId < Number(nextTokenId); tokenId++) {
              console.log(`nextTokenId: ${tokenId}`);
              const listing = await marketplace.listings(
                col.address,
                tokenId
              );
              // if (listing.price >= 0n) {
              //     const tokenURI = await nft.tokenURI(tokenId);
              //     const metadataURL = ipfsToHttp(tokenURI);
              //     const metadata = await fetch(metadataURL).then(res => res.json());
              //     const owner = await nft.ownerOf(tokenId);
              //     const currentAccount = (await signer.getAddress()).toLowerCase();

              //     item =
              //     {
              //         tokenId,
              //         price: ethers.formatEther(listing.price),
              //         seller: listing.seller,
              //         image: ipfsToHttp(metadata.image),
              //         name: metadata.name,
              //         description: metadata.description,
              //         category: metadata.category,
              //         buyNow: metadata.buyNow,
              //         onAuction: metadata.onAuction,
              //         address: col.address,

              //     }
              //     if(owner.toLowerCase() === currentAccount){
              //         my_items.push(item);
              //     }
              //     else{
              //         if(item.price > 0)
              //             common_items.push(item);
              //     }
              // }
            }
          })
        );
  }
  catch(err){
    console.error("fetchListedNFTs failed:", err);
  }
  return {my_items, common_items};
}


export async function fetchMydNFTs() {
  const common_items = [];
  const my_items = [];
  try{
        if (!window.ethereum) return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const collections = await fetchCollections();


        const marketplace = await getMarketplaceContract(NFT_FACTORY_ADDRESS);
        await Promise.all(
          collections.map(async(col) => {

            const nft = new ethers.Contract(
              col.address,
              NFTArtifact.abi,
              signer
            );      
            const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);
            console.log(`nftfactrory: ${NFT_FACTORY_ADDRESS}`);
            console.log(`coladdress: ${col.address}`);
            const nextTokenId = await nft.nextTokenId();
            console.log(`nextTokenId: ${nextTokenId}`);

            let item;
            for (let tokenId = 0; tokenId < Number(nextTokenId); tokenId++) {
              console.log(`nextTokenId: ${tokenId}`);
              const tokenURI = await nft.tokenURI(tokenId);
              const metadataURL = ipfsToHttp(tokenURI);
              const metadata = await fetch(metadataURL).then(res => res.json());
              const owner = await nft.ownerOf(tokenId);
              const currentAccount = (await signer.getAddress()).toLowerCase();
              console.log(`avatar: ${metadata.avatar}`);
              item =
              {
                  tokenId,
                  id: metadata.address,
                  title: metadata.title,
                  description: metadata.description,
                  category: metadata.category,
                  image: ipfsToHttp(metadata.image),
                  creator: {
                    name: metadata.name,
                    avatar: metadata.avatar,

                  },
                  address: col.address,
                  

              }
              if(owner.toLowerCase() === currentAccount){
                  my_items.push(item);
              }
              else{
                  if(item.price > 0)
                      common_items.push(item);
              }
            }
          })
        );
  }
  catch(err){
    console.error("fetchListedNFTs failed:", err);
  }
  console.log(`my_items.length: ${my_items.length}`);
  return my_items;
}
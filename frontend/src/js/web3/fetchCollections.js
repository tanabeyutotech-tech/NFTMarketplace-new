import { ethers } from "ethers";
import NFTArtifact from "../../contracts/NFT.json";
import { NFT_FACTORY_ADDRESS, MARKETPLACE_ADDRESS } from "../../contracts/addresses";
import { mockNFTs, mockCollections, myNFTs } from '../../data/mockData';

import { getFactoryContract, getMarketplaceContract, getNFTContract } from "./factory";
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

  // console.log(`collectionnum:${addresses.length}`);
  let item;
  return Promise.all(
    addresses.map(async (addr) => {
      const nft = new ethers.Contract(
        addr,
        NFTArtifact.abi,
        signer
      );
      // console.log(`111111111111collection description: ${await nft.collectionSymbol()}`);
      
      item = {
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
      
      const exists = mockCollections.some(nft => nft.id === item.id);
      if (!exists) {
        mockCollections.push(item);
      }
    })
  );
}

export async function fetchListedNFTs() {
  let common_items = [];
  // const my_items = [];
  try{
        if (!window.ethereum) return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        await fetchCollections();
        const marketplace = await getMarketplaceContract(MARKETPLACE_ADDRESS);
        const currentAccount = (await signer.getAddress()).toLowerCase();
        await Promise.all(
          mockCollections.map(async(col) => {

            const nft = new ethers.Contract(
              col.address,
              NFTArtifact.abi,
              signer
            );      
            const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);
            console.log(`nftfactrory: ${NFT_FACTORY_ADDRESS}`);
            // console.log(`coladdress: ${col.address}`);
            const nextTokenId = await nft.nextTokenId();
            // console.log(`nextTokenIdinlisting: ${nextTokenId}`);
            // console.log(`cod.addressslisting: ${col.address}`);

            let item;
            if(Number(nextTokenId) === 0)
              return;
            for (let tokenId = 0; tokenId < Number(nextTokenId); tokenId++) {
              
              console.log(`tokenid: ${tokenId}`);
              const listing = await marketplace.listings(
                col.address,
                tokenId
              );
              let owner = await nft.ownerOf(tokenId);
              if ((listing.price > 0n) && (owner.toLowerCase() !== currentAccount)) {
                  const tokenURI = await nft.tokenURI(tokenId);
                  const metadataURL = ipfsToHttp(tokenURI);
                  const metadata = await fetch(metadataURL).then(res => res.json());
                  console.log(`-2--------${ethers.formatEther(listing.price)}------------------------------------------------------`);
                  console.log(`-2--------${listing.price}------------------------------------------------------`);
                  item =
                  {
                      tokenId: tokenId,
                      id: metadata.address+tokenId,
                      title: metadata.title,
                      price: ethers.formatEther(listing.price),
                      description: metadata.description,
                      category: metadata.category,
                      image: ipfsToHttp(metadata.image),
                      creator: {
                        name: metadata.name,
                        avatar: metadata.avatar,
                      },
                      address: col.address,
                  }

                  const exists = mockNFTs.some(nft => nft.id === item.id);
                  if (!exists) {
                    console.log(`pushed`);
                    mockNFTs.push(item);
                    // console.log(`--------------------------------------------------------------------`);
                  }
                  else{
                    const index = mockNFTs.findIndex(nft => nft.id === item.id);
                    mockNFTs.at(index).price =  ethers.formatEther(listing.price);
                    console.log(`unpushed ${mockNFTs.at(index).price}`);
                  }
              }
            }
          })
        );
        common_items = mockNFTs;
        return common_items;
  }
  catch(err){
    console.error("fetchListedNFTs failed:", err);
  }
  // return {my_items, common_items};
}

export async function fetchMydNFTs() {
  const common_items = [];
  let my_items = [];
  try{
        if (!window.ethereum) return;
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        await fetchCollections();
        const marketplace = await getMarketplaceContract(NFT_FACTORY_ADDRESS);
        await Promise.all(
          mockCollections.map(async(col) => {

            const nft = new ethers.Contract(
              col.address,
              NFTArtifact.abi,
              signer
            );      
            const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);
            // console.log(`nftfactrory: ${NFT_FACTORY_ADDRESS}`);
            // console.log(`coladdress: ${col.address}`);
            const nextTokenId = await nft.nextTokenId();
            // console.log(`nextTokenId: ${nextTokenId}`);

            let item;
            for (let tokenId = 0; tokenId < Number(nextTokenId); tokenId++) {
              // console.log(`nextTokenId: ${tokenId}`);
              const tokenURI = await nft.tokenURI(tokenId);
              const metadataURL = ipfsToHttp(tokenURI);
              const metadata = await fetch(metadataURL).then(res => res.json());
              const owner = await nft.ownerOf(tokenId);
              const currentAccount = (await signer.getAddress()).toLowerCase();
              // console.log(`avatar: ${metadata.avatar}`);
              if(owner.toLowerCase() === currentAccount){
                  console.log(`tolowercase = currentaccount`);
                  console.log(`${owner}`);
                  console.log(`1currentaccount:${await signer.getAddress()}`);

                  item =
                  {
                      tokenId: tokenId,
                      id: metadata.address+tokenId,
                      title: metadata.title,
                      price: metadata.price,
                      description: metadata.description,
                      category: metadata.category,
                      image: ipfsToHttp(metadata.image),
                      creator: {
                        name: metadata.name,
                        avatar: metadata.avatar,
                      },
                      address: col.address,
                  }
                  // my_items.push(item);
                  const exists = myNFTs.some(nft => nft.id === item.id);
                    if (!exists) {
                      myNFTs.push(item);
                      console.log('my nfts is pushed');
                    }
              }
              // else{
              //     if(item.price > 0)
              //         // common_items.push(item);
              // }
            }
          })
        );
        my_items = myNFTs;
        return my_items;
  }
  catch(err){
    console.error("fetchListedNFTs failed:", err);
  }
  // console.log(`my_items.length: ${my_items.length}`);
  // return my_items;
}

export async function listNFTs(nft, listPrice) {
  console.log(`listnftfunc:${MARKETPLACE_ADDRESS}`);
  const marketplace = await getMarketplaceContract(MARKETPLACE_ADDRESS);  
  const price = '100';
  const priceInWei = ethers.parseEther(listPrice);
  console.log(`price${priceInWei}`);
  console.log(`price${nft.tokenId}`);
  await marketplace.listNFT(nft.address,nft.tokenId ,priceInWei);
  alert('listed');
}

export async function buyNFTs(nft) {
  if (!window.ethereum) return;
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  // const contract = await getNFTContract(address);
  const marketplace = await getMarketplaceContract(MARKETPLACE_ADDRESS);

  const price = ethers.parseEther(nft.price.toString());
  console.log(`buyNft${nft.address}`);
  console.log(`buyNft${nft.tokenId}`);
  const tx = await marketplace.buyNFT(nft.address, nft.tokenId, {
        value: price,
  });
  await tx.wait();
  
  await fetchMydNFTs();
  await fetchMydNFTs();

}
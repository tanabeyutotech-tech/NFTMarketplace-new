import { ethers } from "ethers";
import NFTArtifact from "../../contracts/NFT.json";
import { NFT_FACTORY_ADDRESS } from "../../contracts/addresses";

import { getFactoryContract } from "./factory";
// import { verify } from "node:crypto";

export async function fetchCollections() {
  if (!window.ethereum) throw new Error("No wallet");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const factory = await getFactoryContract(NFT_FACTORY_ADDRESS);
  const addresses = await factory.getCollections();

  function ipfsToHttp(ipfsUrl) {
    if (!ipfsUrl) return "";
    return ipfsUrl.replace(
        "ipfs://",
        "https://gateway.pinata.cloud/ipfs/"
    );
  }
  console.log(`collectionnum:${addresses.length}`);
  return Promise.all(
    
    addresses.map(async (addr) => {
      const nft = new ethers.Contract(
        addr,
        NFTArtifact.abi,
        signer
      );
        console.log(`collection description: ${await nft.collectionDescription()}`);
        console.log(`profileimage: ${await nft.profileImage()}`);
        console.log(`creator name: ${await nft.creatorName()}`);
        console.log(`creator avatar: ${await nft.creatorAvatar()}`);
      
      return {
        id: addr,
        name: await nft.collectionName(),
        symbol: await nft.collectionSymbol(),
        coverImage: ipfsToHttp(await nft.collectionCover()),
        description: await nft.collectionDescription(),
        profileImage: ipfsToHttp(await nft.profileImage()),
        creator: {
          name: await nft.creatorName(),
          avatar: ipfsToHttp(await nft.creatorAvatar()),
          verified: true,
        },
        items: Number(await nft.nextTokenId()),
        floorPrice: 3.5,
        volume: 567.2,
        verified: true,


      };
    })
  );
}
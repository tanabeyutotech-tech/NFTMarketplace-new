import { ethers } from "ethers";
import NFTArtifact from "../../contracts/NFT.json";
import { NFT_FACTORY_ADDRESS } from "../../contracts/addresses";

import { getFactoryContract } from "./factory";

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
        address: addr,
        name: await nft.collectionName(),
        symbol: await nft.collectionSymbol(),
        coverImageUrl: ipfsToHttp(await nft.collectionCover()),
        description: await nft.collectionDescription(),
        profileImageUrl: ipfsToHttp(await nft.profileImage()),
        creatorName: await nft.creatorName(),
        creatorAvatarUrl: ipfsToHttp(await nft.creatorAvatar())

      };
    })
  );
}
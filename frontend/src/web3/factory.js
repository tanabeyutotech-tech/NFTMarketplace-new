import { ethers } from "ethers";
import NFTFactoryArtifact from "../contracts/NFTFactory.json";
import { NFT_FACTORY_ADDRESS } from "../contracts/addresses";
// const FACTORY_ADDRESS = "0xYOUR_FACTORY_ADDRESS"; // ← replace

export async function getFactoryContract() {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    NFT_FACTORY_ADDRESS,
    NFTFactoryArtifact.abi,
    signer
  );
}
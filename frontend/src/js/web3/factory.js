import { ethers } from "ethers";
import NFTFactoryArtifact from "../../contracts/NFTFactory.json";
// const FACTORY_ADDRESS = "0xYOUR_FACTORY_ADDRESS"; // ← replace

export async function getFactoryContract(CONTRACT_ADDRESS) {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    CONTRACT_ADDRESS,
    NFTFactoryArtifact.abi,
    signer
  );
}
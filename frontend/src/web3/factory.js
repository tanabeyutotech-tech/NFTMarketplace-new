import { ethers } from "ethers";
import FactoryABI from "../contracts/NFTFactory.json";
import { NFT_FACTORY_ADDRESS } from "../contracts/addresses";

export async function getFactoryContract() {
  if (!window.ethereum) throw new Error("MetaMask not installed");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(
    NFT_FACTORY_ADDRESS,
    FactoryABI.abi,
    signer
  );
}
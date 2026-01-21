import { ethers } from "ethers";
import NFTArtifact from "../contracts/NFT.json";
import MarketplaceArtifact from "../contracts/NFTMarketplace.json";

// const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
import { NFT_ADDRESS, MARKETPLACE_ADDRESS } from "../contracts/addresses";

export const mintAndListNFT = async (tokenURI, nft_price, category) => {
  if (!window.ethereum) {
    alert("MetaMask not installed");
    return;
  }
  console.log("ming1");
  console.log(`nft price : ${nft_price}`);

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  console.log(`NFT_ADDRESS ${NFT_ADDRESS}`);

  const contract = new ethers.Contract(
    NFT_ADDRESS,
    NFTArtifact.abi,
    signer
  );

  console.log(`get contract `);

  // await contract.setMarketplace(MARKETPLACE_ADDRESS);

  console.log(`setmarketpalce `);

  // const tx = await contract.mint(
  //   await signer.getAddress(),
  //   tokenURI);
  //   await tx.wait();

    // const nextTokenId = await contract.nextTokenId();
    // const tokenId = Number(nextTokenId - 1n);

    // const approveTx = await contract.approve(
    // MARKETPLACE_ADDRESS,
    // tokenId
    // );
    // await approveTx.wait();    

    const marketplace = new ethers.Contract(
    MARKETPLACE_ADDRESS,
    MarketplaceArtifact.abi,
    signer
    );
    const ty = await contract.setApprovalForAll(MARKETPLACE_ADDRESS, true);
    await ty.wait();

    console.log(`marketpalce `);

    const price = ethers.parseEther(nft_price);
    console.log(`price: ${price} `);

    const tx = await marketplace.mintAndListNFT(
      NFT_ADDRESS,
      tokenURI,
      price
    );
    console.log(`marketpalceAdreess : ${MARKETPLACE_ADDRESS} `);

    await tx.wait();
    // const tx = await marketplace.mintAndListNFT(
    //   NFT_ADDRESS,
    //   tokenURI,
    //   price
    // );

    // const priceInEth = "1"; // example

    // const listTx = await marketplace.ListNFT(
    // NFT_ADDRESS,
    // tokenId,
    // price
    // );
    // await listTx.wait();
    
};

export const approveMarketplace = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  const nft = new ethers.Contract(
    NFT_ADDRESS,
    NFTArtifact.abi,
    signer
  );

  const tx = await nft.setApprovalForAll(MARKETPLACE_ADDRESS, true);
  await tx.wait();
};
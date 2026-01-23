
const hre = require("hardhat");
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deployer:", deployer.address);

  // 1️⃣ Deploy NFT
  const NFT = await ethers.getContractFactory("NFT");
  const nft = await NFT.deploy();
  await nft.waitForDeployment();
  const nftAddress = await nft.getAddress();
  console.log("NFT deployed to:", nftAddress);

  const nft2 = await NFT.deploy();
  await nft2.waitForDeployment();
  const nftAddress2 = await nft2.getAddress();
  console.log("NFT2 deployed to:", nftAddress2);
  // 2️⃣ Deploy Marketplace
  const Marketplace = await ethers.getContractFactory("NFTMarketplace");
  const marketplace = await Marketplace.deploy();
  await marketplace.waitForDeployment();
  const marketplaceAddress = await marketplace.getAddress();
  console.log("Marketplace deployed to:", marketplaceAddress);

  // 3️⃣ Link NFT → Marketplace (CRITICAL)
  const tx = await nft.setMarketplace(marketplaceAddress);
  await tx.wait();
  console.log("Marketplace set in NFT contract");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import { getFactoryContract } from "./factory";

export async function fetchCollections() {
  const factory = await getFactoryContract();
  const collections = await factory.getCollections();

  return collections.map((col) => ({
    address: col.collectionAddress,
    name: col.name,
    symbol: col.symbol,
    cover: col.cover,
    nftCount: Number(col.totalSupply), // or 0 for now
    slug: col.collectionAddress,
  }));
}
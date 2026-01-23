export function groupByCollection(nfts) {
  const map = {};

  nfts.forEach((nft) => {
    const key = nft.collection || "uncategorized";

    if (!map[key]) {
      map[key] = {
        slug: key,
        name: key.toUpperCase(),
        cover: nft.image,
        nfts: [],
      };
    }

    map[key].nfts.push(nft);
  });

  return Object.values(map);
}
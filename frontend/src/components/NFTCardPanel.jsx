import NFTCard from "./NFTCard";

export default function NFTCardPanel({
    filteredNFTs, placeholder, onSell
}) {
    if(filteredNFTs.length == 0)
    {
        console.log(`nftcardpanel: ${filteredNFTs.length}`);
        filteredNFTs.push({
            tokenId: -10,
            image: "https://cdn-icons-png.flaticon.com/512/825/825500.png"
        });
    }
  return (
    <div className="grid grid-cols-4 gap-6 sm:grid-cols-3 lg:grid-cols-5 md:grid-cols-3 xl:grid-cols-4">
        {
            filteredNFTs.map((nft) => (
                <NFTCard
                    nft={nft}
                    placehoder={placeholder}
                    onSell={onSell}
            />
            ))
        }
    </div>
  );
}
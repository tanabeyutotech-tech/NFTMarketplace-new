import { getNFTContract } from "./contract";
import { ethers } from "ethers";
import { fetchCollections  } from "./fetchCollections";
import { MARKETPLACE_ADDRESS } from "../contracts/addresses";
import { getMarketplaceContract  } from "./marketplace";
import { ipfsToHttp  } from "./contract";
import { useEffect, useState } from "react";

export async function fetchCollectionNFTs(NFT_ADRESS) {
    let collectionNFTs;
    
    const contract = await getNFTContract(NFT_ADRESS);
    const marketplace = await getMarketplaceContract(MARKETPLACE_ADDRESS);

    const nextTokenId = await contract.nextTokenId();
    console.log(`collectionnexttokenid:${nextTokenId}`);
    const common_items = [];
    let item;
    for (let tokenId = 0; tokenId < Number(nextTokenId); tokenId++) {
        const listing = await marketplace.listings(
                NFT_ADRESS,
                tokenId
            );

        if (listing.price > 0n) {
            const tokenURI = await contract.tokenURI(tokenId);
            console.log(`tokenURI:${tokenURI}`);
            const metadataURL = await ipfsToHttp(tokenURI);
            console.log(`metadataURL:${metadataURL}`);
            const metadata = await fetch(metadataURL).then(res => res.json());
            item =
            {
                tokenId,
                price: ethers.formatEther(listing.price),
                seller: listing.seller,
                image: await ipfsToHttp(metadata.image),
                name: metadata.name,
                description: metadata.description,
                category: metadata.category,
                buyNow: metadata.buyNow,
                onAuction: metadata.onAuction
            }
            console.log(`image:${metadata.image}`);
            common_items.push(item);
        }}
        collectionNFTs = common_items;
        return collectionNFTs;
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Token.sol";

contract NFTFactory {
    address[] public collections;

    event CollectionCreated(
        address indexed creator,
        address indexed collection,
        string name,
        string symbol,
        string cover
    );

    function createCollection(
        string memory name,
        string memory symbol,
        string memory cover,
        string memory description,
        string memory profile,
        string memory creatorname,
        string memory avatar
    ) external {
        // deploy new ERC721 collection
        NFT newCollection = new NFT(
            name,
            symbol,
            cover,
            description,
            profile,
            creatorname,
            avatar,
            msg.sender
        );

        collections.push(address(newCollection));

        emit CollectionCreated(
            msg.sender,
            address(newCollection),
            name,
            symbol,
            cover
        );
    }

    function getCollections() external view returns (address[] memory) {
        return collections;
    }

    function collectionsCount() external view returns (uint256) {
        return collections.length;
    }
}
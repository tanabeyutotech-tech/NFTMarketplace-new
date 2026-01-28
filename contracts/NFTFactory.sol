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
        string description,
        string creatorname,
        string cover,
        string profile,
        string avatar
    );

    function createCollection(
        string memory name,
        string memory symbol,
        string memory description,
        string memory creatorname,
        string memory cover,
        string memory profile,
        string memory avatar
    ) external {
        // deploy new ERC721 collection
        NFT newCollection = new NFT(
            name,
            symbol,
            description,
            creatorname,
            cover,
            profile,
            avatar,
            msg.sender
        );

        collections.push(address(newCollection));

        emit CollectionCreated(
            msg.sender,
            address(newCollection),
            name,
            symbol,
            description,
            creatorname,
            cover,
            profile,
            avatar
        );
    }

    function getCollections() external view returns (address[] memory) {
        return collections;
    }

    function collectionsCount() external view returns (uint256) {
        return collections.length;
    }
}
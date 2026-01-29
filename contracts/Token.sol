// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is ERC721URIStorage, Ownable {
    uint256 public nextTokenId;
    address public marketplace;

    string public collectionName;
    string public collectionSymbol;
    string public collectionCover;

    string public collectionDescription;
    string public profileImage;
    string public creatorName;
    string public creatorAvatar;

    event Minted(address indexed to, uint256 indexed tokenId, string tokenURI);

    constructor(
        string memory _name,
        string memory _symbol,
        string memory _description,
        string memory _creatorname,
        string memory _cover,
        string memory _profile,
        string memory _avatar,
        address _creator
    )
        ERC721(_name, _symbol)
        Ownable(_creator)
    {
        collectionName = _name;
        collectionSymbol = _symbol;
        collectionDescription = _description;
        creatorName = _creatorname;
        collectionCover = _cover;
        profileImage = _profile;
        creatorAvatar = _avatar;
    }

    


    function setMarketplace(address _marketplace) external  {
        marketplace = _marketplace;
    }

    modifier onlyMarketplace() {
        require(msg.sender == marketplace, "Not marketplace");
        _;
    }

    modifier onlyAuthorized() {
        require(
            msg.sender == owner() || msg.sender == marketplace,
            "Not authorized"
        );
        _;
    }

    function mint(
        address to,
        string memory uri
    )
        external
        
        returns (uint256)
    {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit Minted(to, tokenId, uri);
        return tokenId;
    }

    function mintFromMarketplace(
        address to,
        string memory uri
    )
        external
        onlyMarketplace
        returns (uint256)
    {
        uint256 tokenId = nextTokenId;
        nextTokenId++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit Minted(to, tokenId, uri);
        return tokenId;
    }

    function burn(uint256 tokenId) external {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        _burn(tokenId);
    }
}
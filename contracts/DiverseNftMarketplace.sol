// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

import "@openzeppelin/contracts/security/PullPayment.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

import "./DiverseNFT.sol";

contract DiverseNftMarketplace is Ownable, IERC721Receiver, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _orderIds;
    Counters.Counter private _ordersSold;
    uint256 public listingPrice = 0.1 ether;
    uint256 public creationPrice = 0.1 ether;

    mapping(string => address) public _nftCollectionNameMapping;
    mapping(string => address) public _nftCollectionSymbolMapping;
    Counters.Counter private _nftCollectionCounter;

    struct MarketOrder {
        uint256 orderId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool isSold;
    }

    mapping(uint256 => MarketOrder) private marketOrders;

    event MarketOrderCreated(
        uint256 indexed orderId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool isSold
    );

    function createCollection(string memory _name,string memory _symbol) payable public returns(address) {
      require(msg.value == creationPrice, "Price must be same as creation price");
      DiverseNFT _nft = new DiverseNFT(_name,_symbol,address(this));

      _nftCollectionNameMapping[_name] = address(_nft);
      _nftCollectionSymbolMapping[_symbol] = address(_nft);

      _nftCollectionCounter.increment();

      return address(_nft);
    }

    function getCollectionLength() public view returns(uint){
      uint _collectionAmount = _nftCollectionCounter.current();
      return _collectionAmount;
    }

    function createMarketOrder(address nftContract, uint256 tokenId, uint256 price) public payable nonReentrant {
        require(nftContract != address(0), "address can't be 0");
        require(price > 0, "No item for free here");
        require(msg.value == listingPrice, "Price must be same as listing price");

        _orderIds.increment();
        uint256 orderId = _orderIds.current();
        marketOrders[orderId] = MarketOrder(
            orderId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false
        );
        IERC721(nftContract).safeTransferFrom(msg.sender, address(this), tokenId);

        emit MarketOrderCreated(
            orderId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false
        );
    }

    function nftPurchase(address nftContract, uint256 orderId) public payable nonReentrant {
        require(nftContract != address(0), "nft contract address can't be 0");
        uint256 price = marketOrders[orderId].price;
        uint256 tokenId = marketOrders[orderId].tokenId;
        require( msg.value - listingPrice == price, "not enough to buy nft");

        marketOrders[orderId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        marketOrders[orderId].isSold = true;
        marketOrders[orderId].owner = payable(msg.sender);
        _ordersSold.increment();
    }



    function setListingPrice(uint256 newListingPrice) public onlyOwner returns (uint256) {
        require(newListingPrice >= 0,"listing price cant be lower than 0");
        listingPrice = newListingPrice;
        return listingPrice;
    }

    // Must have to make ERC721 safeTransferFrom work

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) pure external override returns(bytes4){
      IERC721Receiver erc721;
      return IERC721Receiver.onERC721Received.selector;
    }

    // Get Orders Related Functions

    function getMarketNotSoldOrders() public view returns (MarketOrder[] memory) {
        uint256 orderCount = _orderIds.current();
        uint256 unsoldOrderCount = _orderIds.current() - _ordersSold.current();

        MarketOrder[] memory _marketOrders = new MarketOrder[](unsoldOrderCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < orderCount; i++) {
          // No Owner == Available Orders
          if (marketOrders[i + 1].owner == address(0)) {
            uint256 currentId = marketOrders[i + 1].orderId;
            MarketOrder storage currentOrder = marketOrders[currentId];
            _marketOrders[currentIndex] = currentOrder;
            currentIndex += 1;
          }
        }
        return _marketOrders;
    }

    function getMarketSoldOrders() public view returns (MarketOrder[] memory) {
        uint256 totalOrderCount = _orderIds.current();
        uint256 orderCount = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            if (marketOrders[i + 1].isSold == true) {
                orderCount += 1;
            }
        }

        MarketOrder[] memory _marketOrders = new MarketOrder[](orderCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            // User's NFT Orders
            if (marketOrders[i + 1].isSold == true) {
                uint256 currentId = marketOrders[i + 1].orderId;
                MarketOrder storage currentOrder = marketOrders[currentId];
                _marketOrders[currentIndex] = currentOrder;
                currentIndex += 1;
            }
        }
        return _marketOrders;
    }

    function getAllMarketOrders() public view returns (MarketOrder[] memory) {
        uint256 totalOrderCount = _orderIds.current();
        MarketOrder[] memory _marketOrders = new MarketOrder[](totalOrderCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
                uint256 currentId = marketOrders[i + 1].orderId;
                MarketOrder storage currentOrder = marketOrders[currentId];
                _marketOrders[currentIndex] = currentOrder;
                currentIndex += 1;
        }
        return _marketOrders;
    }

    function fetchUserPurchasedNFTs() public view returns (MarketOrder[] memory) {
        uint256 totalOrderCount = _orderIds.current();
        uint256 orderCount = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            if (marketOrders[i + 1].owner == msg.sender) {
                orderCount += 1;
            }
        }

        MarketOrder[] memory _marketOrders = new MarketOrder[](orderCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            // User's NFT Orders
            if (marketOrders[i + 1].owner == msg.sender) {
                uint256 currentId = marketOrders[i + 1].orderId;
                MarketOrder storage currentOrder = marketOrders[currentId];
                _marketOrders[currentIndex] = currentOrder;
                currentIndex += 1;
            }
        }
        return _marketOrders;
    }

    function fetchUserSellingNFTs() public view returns (MarketOrder[] memory) {
        uint256 totalOrderCount = _orderIds.current();
        uint256 orderCount = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            // User Selling NFTs
            if (marketOrders[i + 1].seller == msg.sender) {
                orderCount += 1;
            }
        }

        MarketOrder[] memory _marketOrders = new MarketOrder[](orderCount);
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            if (marketOrders[i + 1].seller == msg.sender) {
                uint256 currentId = marketOrders[i + 1].orderId;
                MarketOrder storage currentOrder = marketOrders[currentId];
                _marketOrders[currentIndex] = currentOrder;
                currentIndex += 1;
            }
        }
        return _marketOrders;
    }

    function getMarketOrder(uint256 _orderId) public view returns (MarketOrder memory) {
      return marketOrders[_orderId];
    }

    // Length Related Functions

    function getMarketSoldOrdersLength() public view returns (uint256) {
        uint256 totalOrderCount = _orderIds.current();
        uint256 orderCount = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            if (marketOrders[i + 1].isSold == true) {
                orderCount += 1;
            }
        }
        return orderCount;
    }

    function getMarketNotSoldOrdersLength() public view returns (uint256) {
        uint256 totalOrderCount = _orderIds.current();
        uint256 orderCount = 0;

        for (uint256 i = 0; i < totalOrderCount; i++) {
            if (marketOrders[i + 1].isSold == false) {
                orderCount += 1;
            }
        }
        return orderCount;
    }

    function getAllMarketOrdersLength() public view returns (uint256) {
      return _orderIds.current();
    }

  }


const { expect } = require("chai");
const { ethers } = require("hardhat");
//import { create as ipfsHttpClient } from 'ipfs-http-client'
//const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

/*describe("NFTMarket", function () {
  it("it should execute mrket sales", async function () {
    const Market = await ethers.getContractFactory('NFTMarket');
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address
    const NFTMarketAddress = nft.addressress
    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString();
    const auctionPrice = ethers.utils.parseUnit('10','ether')

    await nft.createToken('https://www.mynftlocation.com')
    await nft.createToken('https://www.mynftlocaion1.com')
    await nft.createMarketItem(nftContractAddress,1,auctionPrice,{value: listingPrice})
    await nft.createMarketItem(nftContractAddress,2,auctionPrice,{value:listingPrice})
    const [_,buyeAddress]= await ethers.getSigners()
    await market.connect(buyeAddress).createMarketSale(nftContractAddress,1,{value:listingPrice},auctionPrice)
    const items = market.fetchMarketItems()
    console.log('items',items)

  });
});*/

  it("Should create and execute Normal market sales", async function() {
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')

    await nft.createToken(`https://ipfs.infura.io/ipfs/{added.path}`)
    await nft.createToken(`https://ipfs.infura.io/ipfs/{added.path}`)
  
    await market.createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
    
    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})

    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)
  })
//})


  it('should create discounted sale at price 2% lower than actual price', async function(){
    const Market = await ethers.getContractFactory("NFTMarket")
    const market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address

    const NFT = await ethers.getContractFactory("NFT")
    const nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    const nftContractAddress = nft.address

    let listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()

    

    const discountedPrice = ethers.utils.parseUnits('100', 'ether')
    const discountBuyPrice = ethers.utils.parseUnits("98","ether")
    const discounthours = 3 ;
    await nft.createToken("https://{gateway URL}/ipfs/{content ID}3/{optional path to resource}")
    await nft.createToken("https://{gateway URL}/ipfs/{content ID}4/{optional path to resource}")

    await market.createDiscountedMarketitem(nftContractAddress, 1,  discountedPrice, { value: listingPrice })
    await market.createDiscountedMarketitem(nftContractAddress, 2,  discountedPrice, { value: listingPrice })
  
    

      
    const [_, buyerAddress] = await ethers.getSigners()

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: discountBuyPrice })

    items = await market.fetchMarketItems()
    items = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    console.log('items: ', items)

    

  })

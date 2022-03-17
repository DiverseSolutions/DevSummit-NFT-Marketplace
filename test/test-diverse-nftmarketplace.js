const { expect } = require("chai")

describe("DiverseNftMarketplace", function () {
  let accounts;
  let marketPlaceAddress;
  let marketPlaceContract;
  let diverseNFT;

  let dummyUser1;
  let dummyUser2;

  let dummyUser1Address;
  let dummyUser2Address;

  let nftContact1;
  let nftContact2;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    diverseNFT = await ethers.getContractFactory("DiverseNFT")

    const DiverseNftMarketplace = await ethers.getContractFactory("DiverseNftMarketplace")

    marketPlaceContract = await DiverseNftMarketplace.deploy()
    marketPlaceContract = await marketPlaceContract.deployed()
    marketPlaceAddress = marketPlaceContract.address

    nftContact1 = await diverseNFT.deploy("Dummy1","Dum1",marketPlaceAddress)
    nftContact1.deployed()

    nftContact2 = await diverseNFT.deploy("Dummy2","Dum2",marketPlaceAddress)
    nftContact2.deployed()

    dummyUser1 = accounts[2];
    dummyUser2 = accounts[3];

    dummyUser1Address = accounts[2].address;
    dummyUser2Address = accounts[3].address;
  });
  
  it("Creating NftMarketPlace Order", async function () {

    let txResult = await (await nftContact1.safeMint(dummyUser1Address,"https://www.dsolutions.mn/")).wait()
    let [,,user1TokenId] = txResult.events.find(i => i.event === 'Transfer').args

    let tx2Result = await (await nftContact2.safeMint(dummyUser2Address,"https://www.dsolutions.mn/")).wait()
    let [,,user2TokenId] = tx2Result.events.find(i => i.event === 'Transfer').args

    expect(await marketPlaceContract.getAllMarketOrdersLength()).to.equal('0');

    await nftContact1.connect(dummyUser1).approve(marketPlaceAddress,user1TokenId.toNumber());
    await nftContact2.connect(dummyUser2).approve(marketPlaceAddress,user2TokenId.toNumber());

    await marketPlaceContract.connect(dummyUser1).createMarketOrder(
      nftContact1.address,
      user1TokenId.toNumber(),
      ethers.utils.parseEther("5"),
      { 
        value: ethers.utils.parseEther("0.1")
      }
    )

    await marketPlaceContract.connect(dummyUser2).createMarketOrder(
      nftContact2.address,
      user2TokenId.toNumber(),
      ethers.utils.parseEther("6"),
      { 
        value: ethers.utils.parseEther("0.1")
      }
    )

    expect(await marketPlaceContract.getAllMarketOrdersLength()).to.equal('2');
  })

  it("Creating nftPurchase", async function () {

    let txResult = await (await nftContact1.safeMint(dummyUser1Address,"https://www.dsolutions.mn/")).wait()
    let [,,user1TokenId] = txResult.events.find(i => i.event === 'Transfer').args

    await nftContact1.connect(dummyUser1).approve(marketPlaceAddress,user1TokenId.toNumber());
    let createMarketOrderTx = await marketPlaceContract.connect(dummyUser1).createMarketOrder(
      nftContact1.address,
      user1TokenId.toNumber(),
      ethers.utils.parseEther("5"),
      { 
        value: ethers.utils.parseEther("0.1")
      }
    )

    let [orderId,,] = (await createMarketOrderTx.wait()).events.find(i => i.event === 'MarketOrderCreated').args

    expect(await marketPlaceContract.getAllMarketOrdersLength()).to.equal('1');

    await marketPlaceContract.connect(dummyUser2).nftPurchase(
      nftContact1.address,
      orderId,
      {
        value: ethers.utils.parseEther("5.1")
      }
    )

    expect((await marketPlaceContract.getMarketOrder(orderId)).isSold).to.equal(true);
    expect(await marketPlaceContract.getAllMarketOrdersLength()).to.equal('1');

    expect((await ethers.provider.getBalance(marketPlaceContract.address)).toString()).to.equal(ethers.utils.parseEther("0.1"));
  })
  
})

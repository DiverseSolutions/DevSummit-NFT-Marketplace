const { expect } = require("chai")

describe("DiverseNFT", function () {
  let accounts;
  let marketPlaceAddress;
  let contract;

  beforeEach(async () => {
    accounts = await ethers.getSigners();
    marketPlaceAddress = accounts[1].address
    const DiverseNFT = await ethers.getContractFactory("DiverseNFT")
    contract = await DiverseNFT.deploy("Amateur Developers","AmDev",marketPlaceAddress)
    await contract.deployed()
  });
  
  it("Testing Mint", async function () {
    let targetAddress = accounts[2].address;

    let tx = await contract.safeMint(targetAddress,"https://www.dsolutions.mn/")

    let txResult = await tx.wait()
    const [from, to, tokenId] = txResult.events.find(i => i.event === 'Transfer').args

    expect(await tokenId.toString()).to.equal('0');
    expect(await contract.totalSupply()).to.equal('1');

    expect(await contract.ownerOf(tokenId.toNumber())).to.equal(targetAddress);
    expect(await contract.balanceOf(targetAddress)).to.equal('1');
  })
  
})

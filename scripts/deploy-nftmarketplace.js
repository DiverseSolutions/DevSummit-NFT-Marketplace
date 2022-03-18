async function main() {
  const DiverseNftMarketplace = await ethers.getContractFactory("DiverseNftMarketplace");
  const DiverseNFT = await ethers.getContractFactory("DiverseNFT");

  const nftMarketplaceContract = await DiverseNftMarketplace.deploy();
  
  const nftContract = await DiverseNFT.deploy("Diverse NFT Collection","DiverseNFT",nftMarketplaceContract.address);

  console.log("DiverseNftMarketplace deployed to:", nftMarketplaceContract.address);
  console.log("DiverseNFT deployed to:", nftContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });

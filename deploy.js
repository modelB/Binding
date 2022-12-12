const main = async () => {
  try {
    const contractFactory = await hre.ethers.getContractFactory("DeSign");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);

    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

main();

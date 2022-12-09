const main = async () => {
    try {
      const contractFactory = await hre.ethers.getContractFactory(
        "SpendSBT"
      );
      const sbtContract = await contractFactory.deploy();
      await sbtContract.deployed();
  
      console.log("SBT Contract deployed to:", sbtContract.address);
  
      const contractFactoryAdmin = await hre.ethers.getContractFactory(
        "SpendAdmin"
      );
      const adminContract = await contractFactoryAdmin.deploy();
      await adminContract.deployed();
  
      console.log("Admin Contract deployed to:", adminContract.address);
  
  
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
    
  main();
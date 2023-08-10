const hre = require("hardhat");

async function main() {
  const myVariable = "Hello World";

  const contract = await hre.ethers.deployContract("ModifyVariable", [
    myVariable,
  ]);

  await contract.waitForDeployment();

  console.log(`ModifyVariable deployed to ${contract.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

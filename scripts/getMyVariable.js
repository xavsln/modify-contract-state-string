// Address of the contract we want to communicate with
const CONTRACT_ADDR = "0x647ae34dA6764eb904D07ce6202468de6A302Aa5";

async function main() {
  // We create an instance of a specific contract so we can interact with it
  const contract = await ethers.getContractAt("ModifyVariable", CONTRACT_ADDR);

  const tx = await contract.myVariable();

  // await tx.wait();

  console.log("myVariable: ", tx);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

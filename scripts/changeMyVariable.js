require("dotenv").config();
console.log("Test dotenv: ", process.env.TEST_DATA);

// Address of the contract we want to interact with
CONTRACT_ADDR = "0x647ae34dA6764eb904D07ce6202468de6A302Aa5";

// const provider = new ethers.providers.AlchemyProvider(
//   "goerli",
//   process.env.ALCHEMY_API_PRIVATE_KEY_GOERLI
// );

// In v5 we could use "new ethers.providers.AlchemyProvider" however with v6, we need to use "ethers.AlchemyProvider"
const provider = new ethers.AlchemyProvider(
  "goerli",
  process.env.ALCHEMY_API_PRIVATE_KEY_GOERLI
);

const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, provider);

async function main() {
  // Create an instance of the contract we want to interact with
  const contract = await ethers.getContractAt(
    "ModifyVariable",
    CONTRACT_ADDR,
    wallet
  );

  // Now that we have an instance of the contract we can interact with it and change the myVariable value using the relevant function from the ModifyVariable.sol, ie. modifyMyVariable(string memory _myVariable)
  await contract.modifyMyVariable(
    "Hello updated world on the 14th of August 2023, 11:55 am !"
  );

  console.log("myVariable was updated on the blockchain");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

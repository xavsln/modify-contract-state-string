// import testing libraries
const { expect, assert } = require("chai");

// the `describe` scope encapsulates an entire test called `TestModifyVariable`
// the `it` says the behavior that should be expected from the test
describe("TestModifyVariable", function () {
  it("should change myVariable to Updated variable", async function () {
    // creates an ethers ContractFactory abstraction:
    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");

    const myVariable = "Hello World";

    // use the ContractFactory object to deploy an instance of the contract
    // const contract = await ModifyVariable.deployContract("Hello World");
    const contract = await ethers.deployContract("ModifyVariable", [
      myVariable,
    ]);

    // wait for contract to be deployed and validated
    await contract.waitForDeployment();

    // modify myVariable from 'Hello World' to 'Variable was updated' via this function
    await contract.modifyMyVariable("Variable was updated");

    // getter for state variable myVariable
    const updatedVariable = await contract.myVariable();

    assert.equal(updatedVariable, "Variable was updated");
  });
});

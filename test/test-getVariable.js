// import testing libraries: https://www.chaijs.com/guide/styles/
const { expect, assert } = require("chai");

describe("TestModifyVariable", function () {
  // the `it` says the behavior that should be expected from the test
  it("Should get the value stored inside the myVariable state variable", async function () {
    const myVariable = "Hello World !";

    // Deploy the contract using ethers library and helper
    const contract = await ethers.deployContract("ModifyVariable", [
      myVariable,
    ]);

    await contract.waitForDeployment();

    // Get the state variable using the getter function
    const variableValue = await contract.myVariable();
    console.log("variableValue: ", variableValue);

    // Compare variableValue and myVariable
    assert.equal(variableValue, myVariable);
  });
});

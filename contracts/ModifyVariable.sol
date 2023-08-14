//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract ModifyVariable {
  string public myVariable;

  constructor(string memory _myVariable) {
    myVariable = _myVariable;
  }

  // myVariable value can be modified using the below function
  function modifyMyVariable(string memory _myVariable) public {
    myVariable = _myVariable;
  }

}
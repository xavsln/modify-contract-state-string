// ***********************************************************************
// Create an instance of our Contract so we can interact with this object
// ***********************************************************************

import { ethers } from "ethers";

const modifyStringVariableAbi = [
  {
    inputs: [{ internalType: "string", name: "_myVariable", type: "string" }],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [{ internalType: "string", name: "_myVariable", type: "string" }],
    name: "modifyMyVariable",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "myVariable",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
];

// A function that will return an instance of the Smart Contract
const modifyStringVariableContract = (provider) => {
  return new ethers.Contract(
    "0x647ae34dA6764eb904D07ce6202468de6A302Aa5",
    modifyStringVariableAbi,
    provider
  );
};

export default modifyStringVariableContract;

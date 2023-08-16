import { useEffect, useState } from "react";
import "./App.css";
import { ethers } from "ethers";

import modifyStringVariableContract from "./ethereum/modifyStringVariable.js";
// import { HARDHAT_NETWORK_SUPPORTED_HARDFORKS } from "hardhat/internal/constants";

function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState("");

  const [withdrawError, setWithdrawError] = useState("");
  const [withdrawSuccess, setWithdrawSuccess] = useState("");
  const [transactionData, setTransactionData] = useState("");

  /* Create an instance of the contract */
  const [svContract, setSvContract] = useState("");

  /* Create a state variable that stores the contractVariable */
  const [contractStringVariable, setStringContractVariable] = useState("");
  const [newContractStringVariable, setNewContractStringVariable] =
    useState("");

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  }, [walletAddress]);

  const connectWallet = async () => {
    alert("This should open your wallet");
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get accounts */
        const accounts = await provider.send("eth_requestAccounts", []);

        /* get signer */
        setSigner(provider.getSigner());

        /* local contract instance */
        setSvContract(modifyStringVariableContract(provider));

        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get accounts */
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          /* get signer */
          setSigner(provider.getSigner());

          /* local contract instance */
          setSvContract(modifyStringVariableContract(provider));

          setWalletAddress(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to MetaMask using the Connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  };

  const addWalletListener = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        setWalletAddress(accounts[0]);
        console.log(accounts[0]);
      });
    } else {
      /* MetaMask is not installed */
      setWalletAddress("");
      console.log("Please install MetaMask");
    }
  };

  // function called when user clicks on "GET STRING VARIABLE VALUE"
  const getSTRGVariableHandler = async () => {
    alert("You should see the value of the string variable");

    setWithdrawError("");
    setWithdrawSuccess("");

    try {
      const svContractWithSigner = svContract.connect(signer);

      // call the myVariable() getter function in the Smart Contract
      const resp = await svContractWithSigner.myVariable();

      setStringContractVariable(resp);

      console.log(resp);
      setWithdrawSuccess(
        "Operation succeeded - string variable value was returned"
      );
      setTransactionData(resp.hash);
    } catch (err) {
      console.error(err.message);
      setWithdrawError(err.message);
    }
  };

  // function called when user clicks on "UPDATE STRING VARIABLE VALUE"
  const setNewSTRVariableHandler = async () => {
    console.log(
      "Updated Smart Contract Variable Value: ",
      newContractStringVariable
    );

    try {
      const svContractWithSigner = svContract.connect(signer);

      // call the modifyMyVariable() function in the Smart Contract along with the newContractStringVariable value
      const resp = await svContractWithSigner.modifyMyVariable(
        newContractStringVariable
      );

      console.log(resp);
      setWithdrawSuccess(
        "Operation succeeded - string variable value was returned"
      );
      setTransactionData(resp.hash);
    } catch (err) {
      console.error(err.message);
      setWithdrawError(err.message);
    }
  };

  return (
    <div>
      <nav className='navbar'>
        <div className='container'>
          <div className='navbar-brand'>
            <h1 className='navbar-item is-size-4'>
              Modify My Smart Contract Variable
            </h1>
          </div>
          <div id='navbarMenu' className='navbar-menu'>
            <div className='navbar-end is-align-items-center'>
              <button
                className='button is-white connect-wallet'
                onClick={connectWallet}
              >
                <span className='is-link has-text-weight-bold'>
                  {walletAddress && walletAddress.length > 0
                    ? `Connected: ${walletAddress.substring(
                        0,
                        6
                      )}...${walletAddress.substring(38)}`
                    : "Connect Wallet"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section className='hero is-fullheight'>
        <div className='modify-variable-hero-body'>
          <div className='container has-text-centered main-content'>
            <h1 className='title is-1'>A simple dApp that allows:</h1>
            <h5>
              <ol>
                <li>
                  To get the value of a State variable (String type) stored on
                  the following Smart Contract on Goerli Ethereum testnet,{" "}
                </li>
                <li>To modify the value of this State variable.</li>
              </ol>
            </h5>
            <br></br>
            <a
              href='https://goerli.etherscan.io/address/0x647ae34dA6764eb904D07ce6202468de6A302Aa5'
              target='_blank'
            >
              Check deployed Smart Contract on Goerli (address:
              0x647ae34dA6764eb904D07ce6202468de6A302Aa5 )
            </a>

            {/* Display the result of the transaction, success or error */}
            <div className='mt-5'>
              {withdrawError && (
                <div className='withdraw-error'> {withdrawError}</div>
              )}
              {withdrawSuccess && (
                <div className='withdraw-success'> {withdrawSuccess}</div>
              )}
              {"   "}
            </div>
            <div className='box address-box'>
              <div className='columns'>
                <div className='column is-four-fifths'>
                  <input
                    className='input is-medium'
                    type='text'
                    placeholder='Enter your wallet address (0x...)'
                    defaultValue={walletAddress}
                  />
                </div>
                <div className='column'>
                  <button
                    className='button is-link is-medium'
                    onClick={getSTRGVariableHandler}
                    disabled={walletAddress ? false : true}
                  >
                    GET VARIABLE
                  </button>
                </div>
              </div>

              <div className='columns'>
                <div className='column is-four-fifths'>
                  <input
                    className='input is-medium'
                    type='text'
                    placeholder='Enter new String Value to update contract variable'
                    onChange={(e) =>
                      setNewContractStringVariable(e.target.value)
                    }
                    value={newContractStringVariable}
                  />
                </div>
                <div className='column'>
                  <button
                    className='button is-link is-medium'
                    onClick={setNewSTRVariableHandler}
                    disabled={walletAddress ? false : true}
                  >
                    UPDATE VARIABLE
                  </button>
                </div>
              </div>

              <article className='panel is-grey-darker'>
                <p className='panel-heading'>
                  String Value from Smart Contract
                </p>
                <div className='panel-block'>
                  <p>
                    {contractStringVariable
                      ? `String Variable on Smart Contract: ${contractStringVariable}`
                      : "--"}
                  </p>
                </div>
              </article>

              <article className='panel is-grey-darker'>
                <p className='panel-heading'>Transaction Data</p>
                <div className='panel-block'>
                  {/* <p>transaction data</p> */}
                  <p>
                    {transactionData
                      ? `Transaction hash: ${transactionData}`
                      : "--"}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

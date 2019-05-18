import web3 from "./web3";

const deployedAddress = "0xb3eb6b78eadd0d98caa7cd13e42dc103db51cf95";
// const deployedAddress = "0x692a70d2e424a56d2c6c27aa97d1a86395877b3a"


const deployedAbi = [
  {
    constant: true,
    inputs: [],
    name: "getBalance",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "guess", type: "uint256" }],
    name: "playGame",
    outputs: [],
    payable: true,
    stateMutability: "payable",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "rollDice",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "user", type: "address" },
      { indexed: false, name: "roll", type: "uint256" },
      { indexed: false, name: "profit", type: "uint256" }
    ],
    name: "UserWon",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, name: "user", type: "address" },
      { indexed: false, name: "roll", type: "uint256" }
    ],
    name: "UserLost",
    type: "event"
  }
];

export default new web3.eth.Contract(deployedAbi, deployedAddress);

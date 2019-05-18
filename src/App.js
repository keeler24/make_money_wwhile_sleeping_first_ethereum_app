import React, { Component } from "react";
import "./App.css";
import web3 from "./web3";
import dice from "./Dice";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      balance: 0,
      fromAddress: "",
      title: "dicΞ",
      transactionHash: []
    };
  }

  async componentDidMount() {
    //const balance2 = await web3.eth.getBalance(dice.options.address);
    let balance = await dice.methods.getBalance().call();
    let fromAddress = await web3.eth.requestAccounts();
    let fromBalance = await web3.eth.getBalance(fromAddress[0]);
    let title = "dicΞ";

    this.setState({
      balance: web3.utils.fromWei(balance.toString(), "ether"),
      fromAddress: fromAddress[0],
      fromBalance: web3.utils.fromWei(fromBalance.toString(), "ether"),
      title
    });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const guess = e.target.guess.value;
    const bet = e.target.bet.value;
    const { fromAddress } = this.state;

    dice.methods
      .playGame(guess)
      .send({
        from: fromAddress,
        value: web3.utils.toHex(web3.utils.toWei(bet, "ether"))
      })
      .on("transactionHash", hash => {
        this.state.transactionHash.push(hash) 
        this.setState({transactionHash:this.state.transactionHash});
        console.log(hash);
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        console.log(confirmationNumber);
        console.log(receipt);
      })
      .on("receipt", async receipt => {
        console.log(receipt);
        let balance = await dice.methods.getBalance().call();
        let fromAddress = await web3.eth.requestAccounts();
        let fromBalance = await web3.eth.getBalance(fromAddress[0]);
        let title = "dicΞ";

        if (receipt.events.UserLost)
          title = `${receipt.events.UserLost.returnValues[1]},LOSE!`;
        if (receipt.events.UserWon)
          title = `${receipt.events.UserWon.returnValues[1]},WIN,${receipt.events.UserWon.returnValues[1]}Ξ!`;
        this.setState({
          balance: web3.utils.fromWei(balance.toString(), "ether"),
          fromAddress: fromAddress[0],
          fromBalance: web3.utils.fromWei(fromBalance.toString(), "ether"),
          title
        });
      });
  };

  render() {
    const {
      balance,
      fromAddress,
      title,
      fromBalance,
      transactionHash
    } = this.state;
    console.log(balance);
    return (
      <div className="container table" align="center">
        <div className="row">
          <div
            className="col text-right"
            id="dice"
            style={{ fontSize: "150%" }}
          >
            Contract:
            <a href={`https://rinkeby.etherscan.io/address/${dice.options.address}`}>{dice.options.address} </a>
          </div>
        </div>

        <div className="row">
          <div
            className="col text-right"
            id="dice"
            style={{ fontSize: "150%" }}
          >
            Bank:
            {balance}Ξ
          </div>
        </div>
        <br />

        <div className="row">
          <div
            className="col text-right"
            id="dice"
            style={{ fontSize: "150%" }}
          >
            You:
            <a href={`https://rinkeby.etherscan.io/address/${fromAddress}`}>{fromAddress} </a>
          </div>
        </div>

        <div className="row">
          <div
            className="col text-right"
            id="dice"
            style={{ fontSize: "150%" }}
          >
            You:
            {fromBalance}Ξ
          </div>
        </div>


        <div className="row">
          <div
            className="col text-center"
            id="dice"
            style={{ fontSize: "1500%" }}
          >
            {title}
          </div>
        </div>

        <form id="form" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-4" align="right">
              <h1>pick</h1>
              <select
                className="form-control"
                style={{ width: "60px" }}
                name="guess"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>

            <div className="col-2">
              <h1>betΞ</h1>
              <input
                className="form-control"
                name="bet"
                type="text"
                style={{ width: "75px" }}
              />
            </div>

            <div className="col-6" align="left">
              <h1>roll</h1>
              <button type="submit" className="btn btn-dark">
                roll
              </button>
            </div>
          </div>
        </form>
        <br></br>
        <div className="row">
          <div
            className="col text-center"
            id="dice"
            style={{ fontSize: "150%" }}
          >
            Recent Transactions:<br/>
            {transactionHash.map(tx => <div key={tx}><a href={`https://rinkeby.etherscan.io/tx/${tx}`}>{tx}</a></div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

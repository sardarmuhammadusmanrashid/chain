import React, { useState, useEffect } from "react";


const Manager = ({ state }) => {
  const [account, setAccount] = useState("");
  const [tbalance, settbalance] = useState("");
  const [twinner, settwinner] = useState("");
  const [account1, setAccount1] = useState([""]);
  const [cbalance, setCbalance] = useState(0);
 
  const [registerdPlayers, setRegisterdPlayers] = useState([]);
  const [lwinner, setLwinner] = useState("No winner yet");

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0]);
      web3.eth.getBalance(accounts[0]).then((balanceInWei) => {
        let balance = web3.utils.fromWei(balanceInWei);
        // console.log("Balance in wei:", balanceInWei);
        // console.log("Balance in ETH:", balance);
        setCbalance(balance);


      });
      setAccountListener(web3.givenProvider);
      setAccount(accounts[0]);


      
    };
   
    getAccount();
    
  }, [state, state.web3]);
  useEffect(() => {
    const getPlayers = async () => {
      const { contract } = state;
      const players = await contract.methods.getBalance().call();
      // const registerdPlayers = await Promise.all(
      //   players.map((player) => {
      //     return player;
      //   })
      // );

      // console.log(registerdPlayers);
      // setRegisterdPlayers(registerdPlayers);
     
    };
    // getPlayers();
  }, [state, state.contract]);
  const contractBalance = async () => {
    const { contract } = state;
    
    try {
      const balance = await contract.methods.getBalance().call({ from: account });
      console.log(balance);
      // setCbalance(balance);
      settbalance(balance);
    } catch (e) {
      settbalance("soory invalid creitionals");
    }
  };
  const total = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods.winner().send({ from: account });
      const balanced1 = await contract.methods.cp().call();
      console.log(balanced1);
      settwinner(balanced1);
      
    } catch (e) {
      settwinner("sorry no winner");
    }
  };
  const total1 = async () => {
    const { contract } = state;
    try {
     
      const balanced1 = await contract.methods.cp().call();
      console.log(balanced1);
      settwinner(balanced1);
      
    } catch (e) {
      settwinner("sorry no winner");
    }
  };
  return (
    <div className="App">
    <div className="card-title">
      <div className="card-body">
        <h1>Funding contract</h1>
      <h2>{cbalance} Eth</h2>
      <h4>Account no{account}</h4><p></p>
      <p>{tbalance}</p>
      <p>{twinner}</p>
<div><button className="btn btn-primary" onClick={total}>twinner</button>&nbsp;
<button className="btn btn-primary" onClick={total1}>Select CP</button>&nbsp;
<button className="btn btn-primary" onClick={contractBalance}>Balance</button>&nbsp;<button className="btn btn-danger">dra</button></div>
      </div>
    </div>
    {/* {
account1.map((items,i)=>{
    return(
<>
<p>0333{items}</p></>
   )
  })
  
  } */}

    
  </div>
  );
};

export default Manager;

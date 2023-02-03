import React, { useState, useEffect } from "react";
import { sendMoneyd,sendMoneydd } from "../connection";

const Crod = ({ state,address }) => {
  const [account, setAccount] = useState("");
  const [name, setname] = useState("");
  const [name1, setname1] = useState("");
  const [name11, setname11] = useState("");
  const [name22, setname22] = useState("");
  const [email, setemail] = useState("");
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
  const totalc= async () => {
    const { contract } = state;
    try {
      // console.log("cc");
    //   const balance = await contract.methods.createEvent("usman","22","33","32").send({ from: account });
      
      // const balance = await contract.methods.createEvent(name,email,name1,name1).send({ from: account });
      const balance1 = await contract.methods.getAmount().call();
      console.log(balance1);
      setname11(balance1);
      
    } catch (e) {
      setname11("sorry not created");
    }
  };
  const totald = async () => {
    const { contract } = state;
    try {
    //   const balance = await contract.methods.createEvent("usman","22","33","32").send({ from: account });
      
      // const balance = await contract.methods.createEvent(name,email,name1,name1).send({ from: account });
      const balance1 = await contract.methods.getBalance().call();
      console.log(balance1);
      setname11(balance1);
      
    } catch (e) {
      setname11("sorry not created");
    }
  };
  const total22 = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods.getuser().call();
      
      console.log("c",balance);
      
      setname22(balance)
      
    } catch (e) {
      setname22("sorry not created");
    }
  };
  function dp(){
    console.log("ppppp");
  }
  const total1e = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      const balance = await contract.methods.sendmoney().send({ from: account,value:web3.utils.toWei("1","ether")});
      // const balanced1 = await contract.methods.result().call();
      // console.log(balance);
      setname11("event booked");
      
    } catch (e) {
      setname11("sorry no ");
    }
  };
  return (
    <div className="contaner">
    <div className="row">
       <div className="col">
        <h2 className="text-light bg-dark text-center p-5 m-4">Crowd Funding System</h2>
       </div>
       </div>
       <div className="row">
       <div className="col text-center">
        Totaldonate  balance::{name11}<br></br>
        <br></br>
        <p>{account}</p>
        <p>{address}</p>
     
       <button className="btn btn-danger"onClick={totalc}>Minus</button>&nbsp;
       <button className="btn btn-danger"onClick={totald}>totalbalance</button>
       <button className="btn btn-danger"onClick={total1e}>sendmoney</button>
       </div>
      </div>
</div>


   

    

  );
};

export default Crod;

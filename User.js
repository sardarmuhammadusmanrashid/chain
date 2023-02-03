import { black } from "color-name";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sendMoneyd,sendMoneydd } from "../connection";

const User = ({ state }) => {
  const [account, setAccount] = useState("");
  const [name, setname] = useState("");
  const [namek, setnamek] = useState([""]);
  const [name1, setname1] = useState("");
  const [name11, setname11] = useState("");
  const [name22, setname22] = useState("");
  const [email, setemail] = useState("");
  const [tbalance, settbalance] = useState("");
  const [twinner, settwinner] = useState("");
  const [account1, setAccount1] = useState([""]);
  const [account11, setAccount11] = useState([""]);
  const [cbalance, setCbalance] = useState(0);
  const [name111, setname111] = useState("");
  const [registerdPlayers, setRegisterdPlayers] = useState([]);
  const [lwinner, setLwinner] = useState("No winner yet");

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };
  const dp=localStorage.getItem("phone");
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
   
    // totalc();
    // totalrdata();
    totalrdata2();
  }, [state, state.web3]);
  function totalc1(){
    console.log("ppppp");
  }
  const total1e = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      const balance = await contract.methods.getonedata(Number(dp)).call();
      // const balanced1 = await contract.methods.result().call();
    //   console.log(balance);
      setemail(balance[0]);
      setname1(balance[1]);
      setname22(balance[2]);
    //   setname11("user created");
      
    //   value:web3.utils.toWei("1","ether")
      
    } catch (e) {
    //   setname11("invalid creditionals");
    }
  };
  const totalc = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      const balance = await contract.methods.getalldata().call();
      // const balanced1 = await contract.methods.result().call();
    //   console.log(balance);
      setAccount1(balance);
    //   setname11("blood added");
    //   value:web3.utils.toWei("1","ether")
      
    } catch (e) {
    //   setname11("sorry no ");
    }
  };
  const totalrdata = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      const balance = await contract.methods.getuserproduct().call();
      // const balanced1 = await contract.methods.result().call();
      console.log("kk",balance[0][0]);
      setAccount1(balance);
    //   setname11("blood added");
    //   value:web3.utils.toWei("1","ether")
      
    } catch (e) {
      setname11("sorry no ");
    }
  };
  const totalrdata2 = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      const balance = await contract.methods.fetchalluser().call();
      // const balanced1 = await contract.methods.result().call();
      // console.log("jjjj");
      setemail(balance[0][1]);
      console.log("email",balance[0])
      setAccount11(balance);
      // console.log(email);
    //   setname11("blood added");
    //   value:web3.utils.toWei("1","ether")
      
    } catch (e) {
    //   setname11("sorry no ");
    }
  };
  const totalc2= async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      // console.log(name1);
      // console.log();
      let d=document.getElementById("nn");
      let dp=document.getElementById("lp");
      // console.log("bb",d.value);
      // console.log(dp.innerHTML)
      setemail(dp.innerHTML);
      setname11(d.value);
      console.log(name11,email);
      const balance = await contract.methods.assignTechRequest(email,name11).send({from:account});
      // const balanced1 = await contract.methods.result().call();
      // console.log(balance);
      // setAccount1(balance);
      setname111("Technian added");
    //   value:web3.utils.toWei("1","ether")
      
    } catch (e) {
      setname111("sorry no ");
    }
  };
  return (
    <div className="contaner">
    <div className="row">
        
    <div className="col-8 offset-4">
   



<p>Balance::{cbalance}</p>
<h3>Account ::{account}</h3>
</div>
</div>
<div className="row">
     
       
       {account11.map((name,i)=>{
        
        return (
          
             <div className="col-6 mt-5 p-5">
              <div className="card">
              <div className="card-body">
            <p>Name::{name[0]}&nbsp;&nbsp;&nbsp;<br></br><br></br>
            <small id="lp" value={name.techaddress}>{name[1]}</small>
            <br></br>&nbsp;&nbsp;&nbsp;
            
            
           
<br></br>

            <br></br><Link to={`/v/${i}`}><button className="btn btn-outline-secondary" onClick={totalc2}>Chat it</button></Link>&nbsp;&nbsp;
            </p>
            
            </div>
            </div>
            </div>
        )
       })}





    </div>
    </div>
    

   

    
    

  );
};

export default User;

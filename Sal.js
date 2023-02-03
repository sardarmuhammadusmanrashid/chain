import React, { useState, useEffect } from "react";
import { sendMoneyd,sendMoneydd } from "../connection";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  

} from "react-router-dom";
import axios from "axios";
const Sal = ({ state }) => {
  const [account, setAccount] = useState("");
  const [name, setname] = useState("");
  const [name1, setname1] = useState("");
  const [name11, setname11] = useState([""]);
  const [name22, setname22] = useState("");
  const [email, setemail] = useState("");
  const [tbalance, settbalance] = useState("");
  const [twinner, settwinner] = useState("");
  const [account1, setAccount1] = useState([""]);
  const [account11, setAccount11] = useState([""]);
  const [cbalance, setCbalance] = useState(0);
  const[img,setimg]=useState([""]); 
 
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
        console.log(accounts[0]);

      });
      setAccountListener(web3.givenProvider);
      setAccount(accounts[0]);


      
    };
   
    getAccount();
   total22();
   total2();
    
  }, [state, state.web3]);
  
  const total22 = async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods.userdata().call();
      
     
      
      console.log("dd");
      
    } catch (e) {
      console.log("sorry");
        }
  };
  const total2= async () => {
    const { contract } = state;
    try {
      const balance = await contract.methods.getcheckoutproduct().call();
      console.log(balance);
     
      
      setAccount11(balance);
      
    } catch (e) {
      console.log("sorry");
        }
  };
  
  return (
    <div className="contaner">
    <div className="row">
    <div className="col-8 offset-1">
       
    
    
    
       <p>Balance::{cbalance}</p>
       <h3>Account ::{account}</h3>
       
       </div>
       </div>
       <div className="row">
       
    {account11.map((name,i)=>{
        return (
             <div className="col-3 mt-5 p-5">
              <div className="card">
              <div className="card-title">
              {/* <img class="card-img-top" src={`https://gateway.pinata.cloud/ipfs/${name[1].substring(6)}`} alt="Card image cap"/> */}


              </div>
              <div className="card-body">
              

              
            <p>Name::{name[0]}&nbsp;<br></br>&nbsp;<br></br>Category::{name[3]}&nbsp;<br></br>Price::{name[2]}
            <br></br>
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

export default Sal;

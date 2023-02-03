import React, { useState, useEffect } from "react";
import { sendMoneyd,sendMoneydd } from "../connection";
import { useParams,Link } from 'react-router-dom';
import { hidden } from "ansi-colors";

const Vot = ({ state }) => {
  const [account, setAccount] = useState("");
  const [name, setname] = useState("");
  const [name1, setname1] = useState("");
  const [name11, setname11] = useState("");
  const [name111, setname111] = useState("");
  const [name22, setname22] = useState("");
  const [email, setemail] = useState("");
  const [tbalance, settbalance] = useState("");
  const [twinner, settwinner] = useState("");
  const [account1, setAccount1] = useState([""]);
  const [account11, setAccount11] = useState([""]);
  const [cbalance, setCbalance] = useState(0);
  const [namevv, setnamevv] = useState("");
  const [registerdPlayers, setRegisterdPlayers] = useState([]);
  const [lwinner, setLwinner] = useState("No winner yet");
  let id=useParams();
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
    total();
    totalrdata22();
    
  }, [state, state.web3]);
  const total = async () => {
    const { contract } = state;
    console.log(id.id);
    try {
      const balance = await contract.methods.fetchoneuser(Number(id.id)).call({ from: account });
      
      // const balance = await contract.methods.createEvent(name,email,name1,name1).send({ from: account });
      // const balance1 = await contract.methods.result().call();
    // console.log("aliza",balance);

    // window.location.href='/user';
    //   setname11("succesfully requestsent ");

      setname(balance);
      console.log(balance[0],balance[2],balance[3]);
      // setname(balance[1].substring(6));
setemail(balance[0]);
setname1(balance[1]);
setname11(balance[2]);

    } catch (e) {
      setnamevv("sorry not created");
    }
  };
  const GgetUser=async()=> {
    
    const { contract } = state;
    console.log(id.id);
    try {
      console.log("skk");
      
      const balance = await contract.methods.sendmsg(Number(id.id),name22).send({ from: account });
      
      // const balance = await contract.methods.createEvent(name,email,name1,name1).send({ from: account });
      // const balance1 = await contract.methods.result().call();
    // console.log("aliza",balance);
// 
    // window.location.href='/user';
    totalrdata2();
      setnamevv("message sent");


    } catch (e) {
      setnamevv("sorry not send");
    }
  };
  const totalrdata22 = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      const balance = await contract.methods.fetchallans().call();
      
     console.log(balance);
     setAccount11(balance);
      
      
    } catch (e) {
   
    }
  };
  const totalrdata2 = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      contract.methods.fetchallQ(Number(id.id)).send({from:account});
      
      console.log("ff");
      totalrdata22();
     
      
    } catch (e) {
   
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
    <div className="container">
    <div className="row bg-light">
      <div className="offset-3">
      {namevv==='message sent' && <p className="alert alert-success alert-dismissible fade show" role="alert">{namevv}
       <button type="button" class="close" data-dismiss="alert" aria-label="Close">
       <span aria-hidden="true">&times;</span>
     </button></p>
     }
  {namevv==='sorry not send' && <p className="alert alert-danger alert-dismissible fade show">{namevv}</p>}
      </div>
    <div className="col-8 bg-secondary  offset-2 mt-5 ">
   


<div className="m-2">
  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80"  style={{width:50,borderRadius:100,height:40}}/>
<p className="text-light">{email}</p>
</div>



  </div>
  <div className="col-8 offset-2 " style={{height:250,overflow:'auto'}} >
    <div className="row">
    {
    account11.map((items,i)=>{

    return(
    <div className="col-6 alert alert-primary m-2">
      <div><h6>{items[3]}</h6><p>{items[2]}</p></div>
    </div>
    )
  })}
    {
    account11.map((items,i)=>{

    return(
    <div className="col-4 alert alert-success " style={{marginLeft:430}}>
      <div><h6>{items[0]}</h6><p>{items[1]}</p></div>

    </div>
    )
    })}
    </div>
  </div>
  <div className="container"><div className="row"> 
  <div className="col-8 offset-2"  >
    
    <textarea value={name22} onChange={(e)=>setname22(e.target.value)} className="form-control m-2" rows={3} cols={140}></textarea>
  <button className=" form-control btn btn-primary m-2" onClick={GgetUser}>send message</button></div>
  <br></br><br></br>
  </div>
  
</div></div>
</div>
    </div>
    

   

    

  );
};

export default Vot;

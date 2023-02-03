// import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  

} from "react-router-dom";
import Web3 from "web3";
import React, { useState, useEffect } from "react";
import getWeb3 from "./getWeb3";
import Vot from './components/Vot';
import Calculator from "./contracts/Calculator.json";
import Blood from './components/Blood';
import Sal from './components/Sal';
import Crod from './components/Crod';
import Manager from "./components/Manager";
import Players from "./components/Players";
import Intro from "./components/Intro";

import User from './components/User';



// import {connectWeb3,connectWeb3Metamask} from './connection'
// import Sal from './components/Sal';
function App() {
  const [contractInstance, setContract] = useState(null)
  const [accounts, setAccounts] = useState()

 
  
    const [state, setState] = useState({
      web3: null,
      contract: null,
    });
    const [address, setAddress] = useState(null);
  
    useEffect(() => {
      const init = async () => {
        try {
          const web3 = await getWeb3();
          const networkId = await web3.eth.net.getId();
  
          const deployedNetwork = Calculator.networks[networkId];
          console.log("Contract Address:", deployedNetwork.address);
          const instance = new web3.eth.Contract(
            Calculator.abi,
            deployedNetwork && deployedNetwork.address
          );
          
          setAddress(deployedNetwork.address);
          setState({ web3, contract: instance });
        } catch (error) {
          alert("Falied to load web3 or contract.");
          console.log(error);
        }
      };
      init();
    }, []);
  
    return (
     
  
        <BrowserRouter> 


 
 
<Routes>
{/* {/* <Route path="/" element={<Crod state={state} address={address}/>} /> */}
<Route path="/" element={<Blood state={state} address={address} />} /> 
<Route path="/user" element={<User state={state} address={address} />} /> 
<Route path="/v/:id" element={<Vot state={state}  />} /> 
<Route path="/sal" element={<Sal state={state}  />}/>

</Routes>
</BrowserRouter>
     
  );
}

export default App;

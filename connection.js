import Web3 from "web3";


import CalculatorContract from "./contracts/Calculator.json";
// const Calculator= require('../build/contracts/Calculator.json');
// import Calculator from "../build/contracts/Calculator.json"
// function to test the truffle connection


// NOTE: 
// if http://localhost:8545 not working then try this http://127.0.0.1:8545/ 

async function connectWeb3() {
    const provider = new Web3.providers.HttpProvider( "http://localhost:7545");
    const web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    // console.log(accounts);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = await CalculatorContract.networks[networkId];
    const instance = new web3.eth.Contract(
        CalculatorContract.abi,
        deployedNetwork.address
    );
    return {accounts, instance}
}
// const {createInstance} = require('./connection.js')
async function connectWeb3Metamask() {
    const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    console.log("Injected web3 detected.", accounts, networkId);
    const deployedNetwork = await CalculatorContract.networks[networkId];
    const instance = new web3.eth.Contract(
        CalculatorContract.abi,
        deployedNetwork.address
    );
    return {accounts, instance}
}
async function sendMoneyd(){
    const {instance, accounts} = await connectWeb3();
    const provider = new Web3.providers.HttpProvider( "http://localhost:7545");
    const web3 = new Web3(provider);
    console.log("jjj");
   const res = await instance.methods.sendMoney().send({from: accounts[0],value:"2 ether"});
    // console.log("Event value:", res.events.success.returnValues.value);
    console.log("jjj1111");
    console.log(res);
    return res;
}
async function sendMoneydd(){
    const {instance, accounts} = await connectWeb3();
    const provider = new Web3.providers.HttpProvider( "http://localhost:7545");
    const web3 = new Web3(provider);
   const res = await instance.methods.dra().call({from: accounts[0] });
    // console.log("Event value:", res.events.success.returnValues.value);

    console.log(res);
    return res;
}


// // Here am I am switching the num by comparing them hence it will always be (larger-smaller) number.
// async function subFunction(contractInstance, account, num1, num2){
//     if(num2 > num1){
//         let res2 = await contractInstance.methods.subNum(Number(num2), Number(num1)).send({from: account});
//         console.log("Res:",res2);
//         return res2.events.success.returnValues.value;
//     }else{
//         let res2 = await contractInstance.methods.subNum(Number(num1), Number(num2)).send({from: account});
//         console.log("Res:",res2);
//         return res2.events.success.returnValues.value;
//     }
// }


export {connectWeb3, sendMoneyd, sendMoneydd,connectWeb3Metamask}
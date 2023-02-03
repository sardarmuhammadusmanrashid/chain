import React, { useEffect, useState } from "react";
const Players = ({ state, address }) => {
  const [account, setAccount] = useState("No account connected");
  const [registerdPlayers, setRegisterdPlayers] = useState([]);
  const [reload, setReload] = useState(false);

  const reloadEffect = () => {
    setReload(!reload);
  };

  const setAccountListener = (provider) => {
    provider.on("accountsChanged", (accounts) => {
      setAccount(accounts[0]);
    });
  };
  const contractBalance = async () => {
    const { contract } = state;
    const { web3 } = state;
    try {
      const balance = await contract.methods.pay().send(
        { from: account,value:web3.utils.toWei("2","ether") }
        );
      console.log(balance);
      // setCbalance(balance);
      // settbalance(balance);
    } catch (e) {
      // settbalance("soory invalid creitionals");
      console.log("sorry sir");
    }
  };
  useEffect(() => {
    const getAccount = async () => {
      const { web3 } = state;
      const accounts = await web3.eth.getAccounts();
      //  console.log(accounts);
      setAccountListener(web3.givenProvider);

      setAccount(accounts[0]);
    };
    state.web3 && getAccount();
  }, [state, state.web3]);
  useEffect(() => {
    const getPlayers = async () => {
      const { contract } = state;
      const players = await contract.methods.getuser().call();
      const registerdPlayers = await Promise.all(
        players.map((player) => {
          return player;
        })
      );

      console.log(registerdPlayers);
      setRegisterdPlayers(registerdPlayers);
      // reloadEffect();
    };
     getPlayers();
  }, [state, state.contract]);
  return (
    <>
      <ul className="list-group" id="list">
        <div className="center">
          <li className="list-group-item" aria-disabled="true">
            <b>Connected account :</b> {account}
          </li>
          <li className="list-group-item">
            <b>Please pay 1 ether on this contract address : </b> {address}
          </li>
           <li className="list-group-item">
            <button onClick={contractBalance}>Pay balance</button>
          </li>
          <li className="list-group-item">
            <b>Registerd Players </b>:
            <br />
            <br />
            {/* {registerdPlayers.length !== 0 &&
              registerdPlayers.map((name) => <p key={name}>{name}</p>)} */}
          </li>
        </div>
      </ul>
    </>
  );
};
export default Players;

import Caver from "caver-js";
import {DEPLOYED_ABI, DEPLOYED_ADDRESS} from './common';
import {auth} from '../src/pages/Login'
const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}
const cav = new Caver(config.rpcURL);

const EventContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const walletInstance = sessionStorage.getItem('walletInstance')
// var ipfsClient = require('ipfs-http-client');
// var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

export const getWallet = () => {
  if (cav.klay.accounts.wallet.length) {
    console.log(cav.klay.accounts.wallet[0]);
    return cav.klay.accounts.wallet[0];
  }
}

export const hostEvent = (value) => {
  console.log(value);
  console.log(EventContract);
  // console.log(DEPLOYED_ADDRESS);
  // console.log(EventContract);
  getWallet();
  console.log(walletInstance)
}


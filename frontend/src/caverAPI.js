import Caver from "caver-js";
const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}
const cav = new Caver(config.rpcURL);

const EventContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
// const tsContract = new cav.klay.Contract(DEPLOYED_ABI_TOKENSALES, DEPLOYED_ADDRESS_TOKENSALES);

// var ipfsClient = require('ipfs-http-client');
// var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

export const getWallet = () => {

}

export const hostEvent = (value) => {
  console.log(value);
  console.log(EventContract);
}


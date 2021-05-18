import Caver from "caver-js";
import {DEPLOYED_ABI, DEPLOYED_ADDRESS} from './common';
import {auth} from '../src/pages/Login'
const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651'
}
const cav = new Caver(config.rpcURL);

const EventContract = new cav.klay.Contract(DEPLOYED_ABI, DEPLOYED_ADDRESS);
const walletInstance = sessionStorage.getItem('walletInstance')
if(walletInstance){
  cav.klay.accounts.wallet.add(JSON.parse(walletInstance));
}
// var ipfsClient = require('ipfs-http-client');
// var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

export const getWallet = () => {
  // console.log(cav.klay.accounts.wallet);
  if (cav.klay.accounts.wallet.length) {
    // console.log(cav.klay.accounts.wallet[0]);
    return cav.klay.accounts.wallet[0];
  }
}

export const hostEvent = async(value) => {
  console.log(value);
  console.log(EventContract);
  console.log(walletInstance)
  const sender = getWallet();
  console.log(sender);
    const feePayer = cav.klay.accounts.wallet.add('0xb49458083fbe40c2b0f91f413236e9261e8c6d978701e88a78598be7a773c28c')
    // using the promise
    const { rawTransaction: senderRawTransaction } = await cav.klay.accounts.signTransaction({
      type: 'FEE_DELEGATED_SMART_CONTRACT_EXECUTION',
      from: sender.address,
      to:   DEPLOYED_ADDRESS,
      data: EventContract.methods.mintToken(value.user.eventname, value.user.Counting, value.user.Item).encodeABI(),
      gas:  '500000',
      value: cav.utils.toPeb('0', 'KLAY'),
    }, sender.privateKey)

    cav.klay.sendTransaction({
      senderRawTransaction: senderRawTransaction,
      feePayer: feePayer.address,
    })
    .then(function(receipt){
      if (receipt.transactionHash) {
        alert(receipt.transactionHash);
      }
    });
}

export const getToken = async(tokenId) => {
  const token = await EventContract.methods.getToken(tokenId).call();
  console.log(token);
  return token;
}
  
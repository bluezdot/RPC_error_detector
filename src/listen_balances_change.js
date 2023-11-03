// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

async function main () {
    // Connect WS
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({provider: wsProvider});
  
    // Retrieve the initial balance. Since the call has no callback, it is simply a promise
    // that resolves to the current on-chain value
    // let { data: { free: previousFree }, nonce: previousNonce } = await api.query.system.account(ALICE);
  
    // Here we subscribe to any balance changes and update the on-screen value
    const res = api.query.system.account(ALICE, () => {
      
    });
    res.then((data) => {
      console.log("b");
    });
    // console.log(res);
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
    console.log('hello');
  } 

main().catch(console.error);
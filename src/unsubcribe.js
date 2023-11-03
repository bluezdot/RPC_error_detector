// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

const ALICE = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';

async function main () {
    // Connect WS
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({provider: wsProvider});

    // Subscribe to chain updates and log the current block number on update.
    const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
      console.log(`Chain is at block: #${header.number}`);
    });
  
    // In this example we're calling the unsubscribe() function that is being
    // returned by the api call function after 20s.
    setTimeout(() => {
      unsubscribe();
      console.log('Unsubscribed');
    }, 2000);
  }

  main().catch(console.error);
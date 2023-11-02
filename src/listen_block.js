// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main () {
    // Connect WS
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({provider: wsProvider});

    let count = 0;
    const unsubscribe = await api.rpc.chain.subscribeNewHeads((header) => {
        console.log(`Chain is at block: #${header.number}`);
    
        if (++count === 256) {
          unsubscribe();
          process.exit(0);
        }
      });
}   

main().catch(console.error);
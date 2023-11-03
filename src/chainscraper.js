// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

// async function main () {
//     try {
//         const wsProvider = new WsProvider('wss://enjin-matrix-rpc-1.dwellir.com/');
//         const api = await ApiPromise.create({provider: wsProvider});
//         console.log("success")
//     } catch (error) {
//         console.error(error);
//     } finally {
//         process.exit();
//     }
// }
 // Construct
 async function main () {
    const wsProvider = new WsProvider('wss://enjin-matrix-rpc-1.dwellir.com/');
    const api = await ApiPromise.create({ provider: wsProvider });
    console.log(api.genesisHash);
    // console.log(api.tx.balances.transfer);
}

main();

// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main () {

    // Connect WS

    // wsProvider.on('disconnected', () => unsuccessful.add(wsProvider));
    // wsProvider.on('connected', () => successful.add(wsProvider));
    // wsProvider.on('error', (error) => unsuccessful.add(wsProvider));

    try {
        const wsProvider = new WsProvider('wss://rpc.efi3211e2nity.io');
        const api = await ApiPromise.create({provider: wsProvider});
        console.log("success")
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }

    // console.log(`successful connections: ${successful}`);
    // console.log(`unsuccessful connections: ${unsuccessful}`);
    // Retrieve the chain & node information information via rpc calls
    // const [chain, nodeName, nodeVersion] = await Promise.all([
    //     api.rpc.system.chain(),
    //     api.rpc.system.name(),
    //     api.rpc.system.version()    
    // ]);
    // console.log(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);
}

main();

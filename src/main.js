// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main () {
    const successful = new Set();
    const unsuccessful = new Set();

    // Connect WS
    const wsProvider = new WsProvider('wss://rpc.efinity.io');

    wsProvider.on('disconnected', () => {
        console.log('provider', 'disconnected');
        throw new Error('WebSocket disconnected');
    });

    wsProvider.on('connected', () => console.log('provider', 'connected'));

    wsProvider.on('error', (error) => {
        console.log('provider', 'error', error);
        throw new Error('WebSocket error');
    });
    // wsProvider.on('disconnected', () => unsuccessful.add(wsProvider));
    // wsProvider.on('connected', () => successful.add(wsProvider));
    // wsProvider.on('error', (error) => unsuccessful.add(wsProvider));

    try {
        const api = await ApiPromise.create({provider: wsProvider});
        // Rest of your code after successful connection
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

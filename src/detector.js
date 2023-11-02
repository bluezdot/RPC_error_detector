// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function connectToProvider(providerUrl) {
    const wsProvider = new WsProvider(providerUrl);

    return new Promise((resolve, reject) => {
        wsProvider.on('disconnected', () => {
            console.log(`Provider ${providerUrl} disconnected`);
            reject(new Error(`WebSocket disconnected for provider ${providerUrl}`));
        });

        wsProvider.on('connected', () => {
            console.log(`Provider ${providerUrl} connected`);
            resolve({ providerUrl, wsProvider });
        });

        wsProvider.on('error', (error) => {
            console.log(`Provider ${providerUrl} error:`, error);
            reject(new Error(`WebSocket error for provider ${providerUrl}`));
        });
    });
}

async function main() {
    const providerList = ['wss://rpc.efinity.io', 'wss://rpc.polkadot.io', 'wss://ws.rococo.dolphin.engineering']

    const successful = [];
    const unsuccessful = [];

    for (const providerUrl of providerList) {
        try {
            const { providerUrl: connectedUrl } = await connectToProvider(providerUrl);
            // const api = await ApiPromise.create({ provider: wsProvider });
            successful.push(connectedUrl);
            // Rest of your code after successful connection
        } catch (error) {
            console.error(error);
            unsuccessful.push(providerUrl);
        }
    }

    console.log('Successful connections:', successful);
    console.log('Unsuccessful connections:', unsuccessful);

    process.exit();
}

main();
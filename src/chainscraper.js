// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main () {
    try {
        // const wsProvider = new WsProvider('wss://rpc.matrix.blockchain.enjin.io/');
        // const wsProvider = new WsProvider('wss://pioneer-rpc-3.bit.country/wss');
        const wsProvider = new WsProvider('wss://wss.api.moonbeam.network');
        
        
        const api = await ApiPromise.create({ provider: wsProvider });

        // Get chain info
        const [genesisHash, paraId, tokenDecimal, nativeTokenSymbol, ss58Prefix] = await Promise.all([
            api.genesisHash.toHex(),
            (await api.query.parachainInfo.parachainId()).toString(),
            parseInt(api.registry.getChainProperties().tokenDecimals.toHuman()),
            // api.registry.getChainProperties().toHuman(),
            api.registry.getChainProperties().tokenSymbol.toHuman()[0],
            parseInt(api.registry.getChainProperties().ss58Format.toHuman()),
        ]);
        console.log('ss58Prefix:', ss58Prefix, '\n', 'genesisHash:', genesisHash, '\n', 'tokenDecimal:', tokenDecimal, '\n', 'nativeTokenSymbol:', nativeTokenSymbol, '\n', 'paraId:', paraId);
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
}
//  // Construct
//  async function main () {
//     const wsProvider = new WsProvider('wss://rpc.relay.blockchain.enjin.io/');
//     const api = await ApiPromise.create({ provider: wsProvider });
//     console.log(api.genesisHash.toHex());
//     // console.log(api.tx.balances.transfer);
// }

main();

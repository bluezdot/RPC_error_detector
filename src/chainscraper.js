// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

async function main () {
    try {
        // Config provider 
        // test chain
        // const pr = 'wss://rpc.polkadot.io';
        // const pr = 'wss://wss.api.moonbeam.network';
        
        // relay chain
        // const pr = 'wss://rpc.relay.blockchain.enjin.io/'
        
        // matrix chain
        // const pr = 'wss://rpc.matrix.blockchain.enjin.io/'
        const pr ='wss://rpc-0.gemini-3g.subspace.network/ws'
        
        const wsProvider = new WsProvider(pr);
        const api = await ApiPromise.create({ provider: wsProvider });






        // Get chain info
        const [genesisHash, paraId, tokenDecimal, nativeTokenSymbol, ss58Prefix, existentialDeposit] = await Promise.all([
            api.genesisHash.toPrimitive(),
            (await api.query.parachainInfo.parachainId()).toHuman(),
            // 0,
            parseInt(api.registry.getChainProperties().tokenDecimals.toHuman()),
            // api.registry.getChainProperties().toHuman(),
            api.registry.getChainProperties().tokenSymbol.toPrimitive(),
            parseInt(api.registry.getChainProperties().toHuman()),
            // 0
            api.consts.balances.existentialDeposit.toPrimitive(),
        ]);
        // Warning: handle the case of undefined value.
        // Get other info
        // const s = await api.query.staking.erasStakers(1250, '1zugcag7cJVBtVRnFxv5Qftn7xKAnR6YJ9x4x3XLgGgmNnS');


        // Log chain info
        console.log('ss58Prefix:', ss58Prefix, '\n', 'genesisHash:', genesisHash, '\n', 'tokenDecimal:', tokenDecimal, '\n', 'nativeTokenSymbol:', nativeTokenSymbol, '\n', 'paraId:', paraId, '\n', 'existentialDeposit:', existentialDeposit);
        // console.log('s:', s.toPrimitive().own);
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
}

main();

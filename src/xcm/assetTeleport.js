// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady, decodeAddress } from '@polkadot/util-crypto';

async function main () {
    try {
        await teleport();
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
    
}

async function teleport() {

    // SET UP
    const pr ='wss://rococo-rpc.polkadot.io'   
    const wsProvider = new WsProvider(pr);
    const api = await ApiPromise.create({ provider: wsProvider });
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    const recipientParaId = 1000; // Destination parachain ID
    const amount = "100000000000"; // Amount to send
    const toAddr = "FtyWs31VbvNbERc6VC1ZSW6ZmYPMmaj5ZKPBKsJckhiddqF"; // Destination address

    // let fromAddr = "5FPMrYh8sEuSqacAKnNxfV96RBG9Z6mYdBUdnfbM8xVDtaVj";
    const mnemonic = 'hair myth once wine buffalo loan force because long dolphin nut physical';
    const { pair, json } = keyring.addUri(mnemonic, '123123123', { name: 'name' });
    console.log("KEY PAIR: ", pair.toJson());
    console.log("Json: ", json);

    const bl1 = api.query.system.account(pair.address, (result) => {
        console.log('balance latest', result.toJSON().data.free/10**12);
    });

    let dest = {
        V3: {
                interior: {
                    X1: {
                        ParaChain: recipientParaId,
                    }
                },
                parents: 1
            }
    };
    let beneficiary = {
        V3: {
            interior: {
                X1: {
                    AccountId32: {
                        id: decodeAddress(toAddr)
                    }
                }
            },
            parents: 0
        }
    };
    let assets = {
        V3: [{
                fun: {
                    Fungible: amount
                },
                id: {
                    Concrete: {
                        interior: 'Here',
                        parents: 0
                    }
                }
            }]
    };
    let feeAssetItem = 0;
    let feeLimitObj = { Unlimited: null };

    // CREATE AND SEND TX
    let tx = api.tx.xcmPallet.limitedTeleportAssets(dest, beneficiary, assets, feeAssetItem, feeLimitObj);

    let hash = tx.signAndSend(pair, { nonce: 662 }, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);

        if (status.isInBlock) {
            console.log('Included at block hash', status.asInBlock.toHex());
            console.log('Events:');

            events.forEach(({ phase, event: { data, method, section } }) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
        } else if (status.isFinalized) {
            console.log('Finalized block hash', status.asFinalized.toHex());

            api.query.system.account(pair.address).then((balance) => {
                console.log("BALA", balance.toJSON().data.free/10**12);
            }).catch(console.error);
        }
    });
    console.log("Hash: ", hash.toString());
    const bl2 = await api.query.system.account(pair.address);
    console.log("BALANCE: ", bl2.toJSON().data.free/10**12);
}
    
main();

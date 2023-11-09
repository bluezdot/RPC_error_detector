// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady } from '@polkadot/util-crypto';

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
    const recipientParaId = 1000;
    const amount = "10000000000000";
    const toAddr = "FtyWs31VbvNbERc6VC1ZSW6ZmYPMmaj5ZKPBKsJckhiddqF"; // Địa chỉ trên Assethub

    // let fromAddr = "5FPMrYh8sEuSqacAKnNxfV96RBG9Z6mYdBUdnfbM8xVDtaVj";
    const mnemonic = 'hair myth once wine buffalo loan force because long dolphin nut physical';
    const { pair, json } = keyring.addUri(mnemonic, '123123123', { name: 'name' });
    console.log("KEY PAIR: ", pair.toJson());
    console.log("Json: ", json);

    var resp = await api.query.system.account(pair.address);
    console.log("BALANCE: ", resp.toJSON().data.free);

    let dest = {
        V3: {
                interior: {
                    X1: {
                        ParaChain: recipientParaId
                    }
                },
                parents: 0
            }
    };
    let beneficiary = {
        V3: {
            interior: {
                X1: {
                    AccountId32: {
                        id: api.createType('AccountId32', toAddr).toHex()
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

    // CREATE AND SEND TX
    let tx = api.tx.xcmPallet.teleportAssets(dest, beneficiary, assets, feeAssetItem);
    
    tx.signAndSend(pair, ({ events = [], status }) => {
        console.log('Transaction status:', status.type);

        if (status.isInBlock) {
            console.log('Included at block hash', status.asInBlock.toHex());
            console.log('Events:');

            events.forEach(({ phase, event: { data, method, section } }) => {
                console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
            });
        } else if (status.isFinalized) {
            console.log('Finalized block hash', status.asFinalized.toHex());

            process.exit(0);
        }
    });

    var resp = await api.query.system.account(pair.address);
    console.log("BALANCE: ", resp.toJSON().data.free);
}
    
main();

// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
import keyring from '@polkadot/ui-keyring';
import { cryptoWaitReady, decodeAddress} from '@polkadot/util-crypto';

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
    const pr ='wss://westend-asset-hub-rpc.polkadot.io'; // Sender
    const wsProvider = new WsProvider(pr);
    const api = await ApiPromise.create({ provider: wsProvider });
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 42, type: 'sr25519' });
    const recipientParaId = 1002; // Destination parachain ID
    const amount = "100000000000"; // Amount to send
    const toAddr = "FtyWs31VbvNbERc6VC1ZSW6ZmYPMmaj5ZKPBKsJckhiddqF"; // Địa chỉ trên Assethub
    const mnemonic = 'hair myth once wine buffalo loan force because long dolphin nut physical';
    const { pair, json } = keyring.addUri(mnemonic, '123123123', { name: 'name' });

    const bl1 = await api.query.system.account(pair.address);
    console.log("BALANCE: ", bl1.toJSON().data.free/10**12);

    let dest = {
        V3: {
                interior: {
                    X1: {
                        ParaChain: recipientParaId
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
    let tx = api.tx.polkadotXcm.limitedReserveTransferAssets(dest, beneficiary, assets, feeAssetItem, feeLimitObj);
    console.log("TX: ", tx.toHex());

    // let hash = await tx.signAndSend(pair, ({ events = [], status }) => {
    //     console.log('Transaction status:', status.type);

    //     if (status.isInBlock) {
    //         console.log('Included at block hash', status.asInBlock.toHex());
    //         console.log('Events:');

    //         events.forEach(({ phase, event: { data, method, section } }) => {
    //             console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
    //         });
    //     } else if (status.isFinalized) {
    //         console.log('Finalized block hash', status.asFinalized.toHex());
    //         process.exit(0);
    //     }
    // });

    console.log("Hash: ", hash.toString());
    const bl2 = await api.query.system.account(pair.address);
    console.log("BALANCE: ", bl2.toJSON().data.free/10**12);
}
    
main();

// https://polkadot.subscan.io/xcm_message/polkadot-2980425b141364b64f8945b69068008aa54c4c7c ??
// https://polkadot.subscan.io/xcm_message/polkadot-65d0f6364b41fc3b795193c127a7f86a83bf29b8 ??
// PalletInstance, GeneralIndex ???


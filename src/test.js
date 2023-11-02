// Import
import { ApiPromise, WsProvider } from '@polkadot/api';

// Construct
const wsProvider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider: wsProvider });

// exists
const sizeY = await api.query.staking.validators.size('DB2mp5nNhbFN86J9hxoAog8JALMhDXgwvWMxrRMLNUFMEY4');
// non existent
const sizeN = await api.query.staking.validators.size('EoukLS2Rzh6dZvMQSkqFy4zGvqeo14ron28Ue3yopVc8e3Q');

console.log(sizeY.isZero(), sizeY.toNumber()); // false 4
console.log(sizeN.isZero(), sizeY.toNumber()); // true 0

// // The length of an epoch (session) in Babe
// console.log(api.consts.babe.epochDuration.toNumber());

// // The amount required to create a new account
// console.log(api.consts.balances.existentialDeposit.toNumber());
// console.log(api.consts.balances.balances);

// // The amount required per byte on an extrinsic
// console.log(api.consts.transactionPayment.transactionByteFee);

// // ApiPromise
// //   .create({ provider: wsProvider })
// //   .then((api) =>
// //     console.log(api.genesisHash.toHex())
// //   );
// // Retrieve
// console.log(api.genesisHash.toHex());
// // console.log(api.runtimeVersion);

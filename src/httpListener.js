import { ethers } from "ethers";

async function main () {
    console.log("success");
    const provider = new ethers.JsonRpcProvider('https://rpc.relay.blockchain.enjin.io/');
    console.log(await provider.getBlockNumber());
}
main();
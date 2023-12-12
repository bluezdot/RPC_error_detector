// Import
import { ApiPromise, WsProvider } from '@polkadot/api';
const pr ='wss://polkadot-rpc.dwellir.com' 
const wsProvider = new WsProvider(pr);
const api = await ApiPromise.create({ provider: wsProvider });

// Input: blockNumber
// Output: [EraIndex, EraStartTime]
async function getTimeFromeBlockNumber(blockNumber) {
    const blockHash = await api.rpc.chain.getBlockHash(blockNumber);
    const apiAt = await api.at(blockHash);

    // retrieve the activeEra
    const activeEraOpt = await apiAt.query.staking.activeEra();
    if (activeEraOpt.isSome) {
        const { index, start } = activeEraOpt.unwrap();
        return [index, new Date(start.unwrap().toNumber()).toString()];
    }
    else {
        console.log('no activeEra found')
    }
    return;
}

function hourToTime(floatHours) {
    // Extract the whole number of hours
    const hours = Math.floor(floatHours);
  
    // Calculate the remaining minutes
    const floatMinutes = (floatHours - hours) * 60;
    const minutes = Math.floor(floatMinutes);
  
    // Calculate the remaining seconds
    const floatSeconds = (floatMinutes - minutes) * 60;
    const seconds = Math.round(floatSeconds);
  
    return {
      hours,
      minutes,
      seconds,
    };
  }

async function main () {
    try {
        const deriveSessionProgress = await api.derive.session.progress();

        // Cách 1:
        const blockTime = 6; // TODO: check block time = 6s for other chains.
        const eraLength = deriveSessionProgress.eraLength.toNumber();
        const eraProgress = deriveSessionProgress.eraProgress.toNumber();
        const remainingSlots = eraLength - eraProgress;
        const remainingHours = 6 * remainingSlots / 60 / 60;
    
        console.log("Remaining time (h): ", remainingHours); 

        const time = hourToTime(remainingHours);
        console.log(time);
        
        // Cách 2:
        // const start = new Date(deriveSessionProgress.activeEraStart.unwrap().toNumber());
        // const end = new Date(start.getTime() + eraLength * 6 * 1000);
        // const currentProgress = deriveSessionProgress.eraProgress.toNumber();
        // const remaining = end.getTime() - currentProgress;
        // console.log(start);
        // console.log(end);
        // console.log(currentProgress);
        // console.log(remaining);
        // console.log(remaining);

        // Cách 3: Sử dụng blockNumber
        // const blockNumber = 18559976;
        // const infor = await getTimeFromeBlockNumber(blockNumber)
        // console.log("Start time: ", infor[1]) // Thời gian bắt đầu Era
        // ...
    } catch (error) {
        console.error(error);
    } finally {
        process.exit();
    }
}

main();
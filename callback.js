function fetchData(callback) {
    setTimeout(() => {
        const data = 'This is some data';
        callback(data);
    }, 2000); // Simulate a delay of 2 seconds
}

function processResult(data) {
    console.log('Processing:', data);
}

fetchData(processResult);
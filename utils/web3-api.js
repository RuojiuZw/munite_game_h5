export async function getBlock(web3) {
    return await web3.eth.getBlock()
}

export async function getCurrentAccount() {
    let a = await window.ethereum.enable()
    return a[0]
}

export async function getBalance(web3, address) {
    const balance = await web3.eth.getBalance(address)
    return Number(balance) / 10**18
}

export async function decimals(contract, address) {
    return await contract.methods.decimals().call({from:address});
}

export async function getToken20Balance(contract, address, decimal) {
    const balance = await contract.methods.balanceOf(address).call({from:address})
    return Number(balance) / Math.pow(10, Number(decimal))
}

export async function sendTransaction(web3, fromAddress, toAddress, amount) {
    await web3.eth.sendTransaction({
        from: fromAddress,
        to: toAddress,
        value: amount
    })
}

export async function sendErc20Transaction(web3, contract, contractAddress, fromAddress, toAddress, amount) {
    const data = contract.methods.transfer(toAddress, amount).encodeABI();
    const transactionObject = {
        from: fromAddress,
        to: contractAddress,
        data: data,
    };
    web3.eth.sendTransaction(transactionObject)
        .on('transactionHash', function (hash) {
            console.log('Transaction Hash:', hash);
        }).on('receipt', function (receipt) {
            console.log('Transaction Receipt:', receipt);
        }).on('error', function (error) {
            console.error('Transaction Error:', error);
        });
}

export async function erc20EstimateGas(contract, fromAddress, toAddress, amount) {
    return await contract.methods.transfer(toAddress, amount).estimateGas({from: fromAddress})
}

function timestampToTime(timestamp) {
    let date = new Date(Number(timestamp) * 1000); // 将秒数转换为毫秒数
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);

    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
}

export async function getStartTimestamp(contract, address) {
    const timestamp = await contract.methods.startTime(address).call({from:address})
    return timestampToTime(timestamp);
}

export async function getEndTimestamp(contract, address) {
    const timestamp = await contract.methods.endTime(address).call({from:address})
    return timestampToTime(timestamp);
}

export async function getBalanceOfPool(contract, decimal, address) {
    const balance = await contract.methods.balanceOf().call({from:address})
    return Number(balance) / Math.pow(10, decimal)
}

export async function getReleasable(contract, decimal, address) {
    const releasable = await contract.methods.releasable(address).call({from:address})
    return Number(releasable) / Math.pow(10, decimal)
}

export async function getReleased(contract, decimal, address) {
    const released = await contract.methods.released(address).call({from:address})
    return Number(released) / Math.pow(10, decimal)
}

export async function release(web3, contract, contractAddress, fromAddress) {
    const data = contract.methods.release().encodeABI();
    const transactionObject = {
        from: fromAddress,
        to: contractAddress,
        data: data,
    };
    web3.eth.sendTransaction(transactionObject)
        .on('transactionHash', function (hash) {
            console.log('Transaction Hash:', hash);
        }).on('receipt', function (receipt) {
        console.log('Transaction Receipt:', receipt);
    }).on('error', function (error) {
        console.error('Transaction Error:', error);
    });
}

export async function approve(web3, contract, fromAddress, toAddress, amount) {
    const data = contract.methods.approve(toAddress, amount).encodeABI();
    const transactionObject = {
        from: fromAddress,
        to: contract.options.address,
        data: data,
    };
    return new Promise((resolve, reject) => {
        web3.eth.sendTransaction(transactionObject)
        .on('transactionHash', function (hash) {
            resolve(hash);
        }).on('receipt', function (receipt) {
            resolve(receipt);
        }).on('error', function (error) {
            reject(error);
        });
    })
}
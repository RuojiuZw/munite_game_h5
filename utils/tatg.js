async function sendTransaction(web3, contract, fromAddress, data) {
    let transactionObject = {
        from: fromAddress,
        to: contract.options.address,
        data: data
    };

    return new Promise(async (resolve, reject) => {
        try {
            await web3.eth.sendTransaction(transactionObject)
                .on('transactionHash', (hash) => resolve(hash))
                .on('receipt', (receipt) => resolve(receipt))
                .on('error', (error) => {
                    reject(error)
                });
        } catch(e) {
            reject(e)
        }
    });
}

/**
 * 购买矿机
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @param miningMachineType 矿机类型
 * @returns {Promise<unknown>}
 */
export async function buyMiningMachine(web3, contract, fromAddress, miningMachineType) {
    const data = contract.methods.buyMiningMachine(miningMachineType).encodeABI();
    return await sendTransaction(web3, contract, fromAddress, data)
}

/**
 * 购买道具
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @param propType 道具类型
 * @returns {Promise<unknown>}
 */
export async function buyMiningProp(web3, contract, fromAddress, propType) {
    const data = contract.methods.buyProp(propType).encodeABI();
    return await sendTransaction(web3, contract, fromAddress, data)
}

/**
 * 购买燃料
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @param fuelType 燃料类型
 * @returns {Promise<unknown>}
 */
export async function buyMiningFuel(web3, contract, fromAddress, fuelType) {
    const data = contract.methods.buyFuel(fuelType).encodeABI();
    return await sendTransaction(web3, contract, fromAddress, data)
}

/**
 * 开通工具栏
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @returns {Promise<unknown>}
 */
export async function openToolBar(web3, contract, fromAddress) {
    const data = contract.methods.openToolBar().encodeABI();
    return await sendTransaction(web3, contract, fromAddress, data)
}

/**
 * 开通背包栏
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @returns {Promise<unknown>}
 */
export async function openBackpack(web3, contract, fromAddress) {
    const data = contract.methods.openBackpack().encodeABI();
    return await sendTransaction(web3, contract, fromAddress, data)
}

/**
 * 交易，卖出tatg
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @param tatgNumber 卖出tatg数量
 * @returns {Promise<unknown>}
 */
export async function transferSellTatg(web3, contract, fromAddress, tatgNumber) {
    const data = contract.methods.transfer(tatgNumber).encodeABI();
    return await sendTransaction(web3, contract, fromAddress, data)
}

/**
 * 提取奖励
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @returns {Promise<unknown>}
 */
export async function withdrawal(web3, contract, fromAddress) {
    const data = contract.methods.withdrawal().encodeABI();
    return await sendTransaction(web3, contract, fromAddress, data)
}

/**
 * 可提取奖励
 * @param web3 web3对象
 * @param contract 交换合约
 * @param fromAddress 用户地址
 * @returns {Promise<unknown>}
 */
export async function releasable(web3, contract, fromAddress, decimals) {
    let rewardAmount = await contract.methods.releasable(fromAddress).call({from:fromAddress})
    return Number(rewardAmount) / Math.pow(10, decimals)
}

export async function allowance(web3, contract, fromAddress, spender, decimals) {
    let rewardAmount = await contract.methods.allowance(fromAddress, spender).call({from:fromAddress})
    return Number(rewardAmount) / Math.pow(10, decimals)
}

export const BlockTags = {
    EARLIEST: 'earliest',  // 创世区块
    LATEST: 'latest',      // 最新区块
    PENDING: 'pending',    // 待处理区块
    FINALIZED: 'finalized', // 已确认区块
    SAFE: 'safe'           // 安全区块
}

// Goerli测试网配置
export const GoerliConfig = {
    accountAddress: "",
    usdtAddress: "0x8A3c1028d711478Ab1CdFD7582B88b61d05cafa8",
    usdtDecimals: 6,
    tatgAddress: "0x29E36522532Ec7Ed290F1F703a517118CfAe7e98",
    tatgDecimals: 18,
    utswapAddress: "0xf9E4C6dc5D73568A39cD3D5F8D1185c55760D76c",
}

// BNB主网配置
export const BNBConfig = {
    accountAddress: "",
    usdtAddress: "0x55d398326f99059ff775485246999027b3197955",
    usdtDecimals: 18,
    tatgAddress: "0xE771787e0a641C663857361e7c5e167901803982",
    tatgDecimals: 18,
    utswapAddress: "0x930e89e3a81d3A749E58b401533207b60B5cf124",
}

export const GasConfig = {
    gasPrice: 3030000000,
    gas: 50000,
}

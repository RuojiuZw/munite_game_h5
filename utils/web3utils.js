import Web3 from "web3";

class Web3Api {
  constructor() {
    this.web3 = null;
    this.chainId = null;
  }

  // 初始化web3实例
  async init() {
    if (typeof window.ethereum !== "undefined") {
      try {
        this.web3 = new Web3(window.ethereum);
        return this.web3;
      } catch (error) {
        console.error("Web3初始化错误:", error);
        throw error;
      }
    } else {
      throw new Error("请安装MetaMask钱包");
    }
  }

  // 请求连接钱包
  async requestAccounts() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return accounts;
    } catch (error) {
      console.error("请求账户错误:", error);
      throw error;
    }
  }

  // 获取当前账户
  async getAccounts() {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      console.log("获取账户:", accounts);
      return accounts;
    } catch (error) {
      console.error("获取账户错误:", error);
      throw error;
    }
  }

  // 获取链ID
  async getChainId() {
    try {
      if (!this.web3) throw new Error("Web3未初始化");
      const chainId = await this.web3.eth.getChainId();
      this.chainId = chainId;
      return chainId;
    } catch (error) {
      console.error("获取链ID错误:", error);
      throw error;
    }
  }

  // 获取账户余额
  async getBalance(address) {
    try {
      if (!this.web3) throw new Error("Web3未初始化");
      const balance = await this.web3.eth.getBalance(address);
      return this.web3.utils.fromWei(balance, "ether");
    } catch (error) {
      console.error("获取余额错误:", error);
      throw error;
    }
  }

  // 切换网络
  async switchNetwork(chainId) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: Web3.utils.toHex(chainId) }],
      });
      return true;
    } catch (error) {
      console.error("切换网络错误:", error);
      throw error;
    }
  }

  // 添加网络
  async addNetwork(networkDetails) {
    try {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [networkDetails],
      });
      return true;
    } catch (error) {
      console.error("添加网络错误:", error);
      throw error;
    }
  }

  // 发送交易
  async sendTransaction(transaction) {
    try {
      if (!this.web3) throw new Error("Web3未初始化");
      const receipt = await this.web3.eth.sendTransaction(transaction);
      return receipt;
    } catch (error) {
      console.error("发送交易错误:", error);
      throw error;
    }
  }

  // 获取代币余额
  async getTokenBalance(tokenAddress, walletAddress) {
    try {
      if (!this.web3) throw new Error("Web3未初始化");
      const minABI = [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
      ];
      const contract = new this.web3.eth.Contract(minABI, tokenAddress);
      const balance = await contract.methods.balanceOf(walletAddress).call();
      return this.web3.utils.fromWei(balance, "ether");
    } catch (error) {
      console.error("获取代币余额错误:", error);
      throw error;
    }
  }
}

export default new Web3Api();

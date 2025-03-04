import web3Api from "@/utils/web3utils";
import {
	ADDRESS
} from "../../utils/address";
import {
	BlockTags
} from "../../utils/tatg";
import USDT_ABI from "../../utils/json/usdt.json";
import TATG_ABI from "../../utils/json/tatg.json";
import UTSWAP_ABI from "../../utils/json/utswap.json";
import {
	authWalletLogin,
	getBaseInfo,
	httpAuthWalletLogin,
	httpRefreshToken,
	register,
} from "../../request/api";
const state = {
	web3: null,
	userAccount: null,
	isConnecting: false,
	chainId: null,
	balance: "0",
	usdtContract: null,
	tatgContract: null,
	utswapContract: null,
	tokenInfo: uni.getStorageSync("mg_tokenInfo") || {
		expiresTime: 0
	},
	registerInfo: {
		userName: null,
		inviteCode: null,
	},
	userInfo: uni.getStorageSync("my_userInfo") || {
		expiresTime: 0
	},
};

const mutations = {
	SET_WEB3(state, web3) {
		state.web3 = web3;
	},
	SET_USER_ACCOUNT(state, account) {
		state.userAccount = account;
	},
	SET_CONNECTING(state, status) {
		state.isConnecting = status;
	},
	SET_CHAIN_ID(state, chainId) {
		state.chainId = chainId;
	},
	SET_BALANCE(state, balance) {
		state.balance = balance;
	},
	SET_USDT_CONTRACT(state, contract) {
		state.usdtContract = contract;
	},
	SET_TATG_CONTRACT(state, contract) {
		state.tatgContract = contract;
	},
	SET_UTSWAP_CONTRACT(state, contract) {
		state.utswapContract = contract;
	},
	SET_REGISTER_INFO(state, info) {
		state.registerInfo = info;
	},
	SET_TOKEN_INFO(state, info) {
		state.tokenInfo = info;
		uni.setStorageSync("mg_tokenInfo", info);
	},
	SET_USER_INFO(state, info) {
		state.userInfo = info
		uni.setStorageSync("my_userInfo", info);
	}
};

const actions = {
	// 初始化web3
	async initWeb3({
		commit,
		dispatch
	}) {
		try {
			const web3Instance = await web3Api.init();
			commit("SET_WEB3", web3Instance);
			console.log("Web3已初始化");

			const accounts = await web3Api.getAccounts();
			if (accounts && accounts.length > 0) {
				commit("SET_USER_ACCOUNT", accounts[0]);
				dispatch("setupWalletListeners");
				dispatch("updateWalletInfo");
				dispatch("onInitContract");
			}
		} catch (error) {
			console.error("Web3初始化错误:", error);
			uni.showToast({
				title: error.message,
				icon: "none",
			});
		}
	},

	// 设置钱包监听器
	setupWalletListeners({
		commit,
		dispatch
	}) {
		window.ethereum.on("accountsChanged", (accounts) => {
			if (accounts.length === 0) {
				commit("SET_USER_ACCOUNT", null);
				commit("SET_BALANCE", "0");
				console.log("钱包已断开连接");
			} else {
				commit("SET_USER_ACCOUNT", accounts[0]);
				dispatch("updateWalletInfo");
				console.log("钱包地址已更改:", accounts[0]);
			}
		});

		window.ethereum.on("chainChanged", (_chainId) => {
			commit("SET_CHAIN_ID", _chainId);
			dispatch("updateWalletInfo");
			console.log("网络已更改:", _chainId);
		});
	},

	// 更新钱包信息
	async updateWalletInfo({
		state,
		commit
	}) {
		if (!state.userAccount) return;

		try {
			const [chainId, balance] = await Promise.all([
				web3Api.getChainId(),
				web3Api.getBalance(state.userAccount),
			]);
			commit("SET_CHAIN_ID", chainId);
			commit("SET_BALANCE", balance);
		} catch (error) {
			console.error("获取钱包信息错误:", error);
		}
	},

	// 连接钱包
	async connectWallet({
		state,
		commit,
		dispatch
	}) {
		if (state.isConnecting) {
			console.log("正在处理连接请求，请稍候...");
			return;
		}
		try {
			commit("SET_CONNECTING", true);
			if (!state.web3) {
				await dispatch("initWeb3");
			}
			if (state.userAccount) {
				console.log("钱包已连接:", state.userAccount);
				return;
			}
			const accounts = await web3Api.requestAccounts();
			if (accounts && accounts.length > 0) {
				commit("SET_USER_ACCOUNT", accounts[0]);
				dispatch("setupWalletListeners");
				dispatch("updateWalletInfo");
			}
		} catch (error) {
			console.error("连接钱包错误:", error);
			uni.showToast({
				title: error.message || "连接钱包失败",
				icon: "none",
			});
		} finally {
			commit("SET_CONNECTING", false);
		}
	},
	async onInitContract({
		state,
		commit,
		dispatch
	}) {
		console.log("onInitContract");

		if (!state.web3 || !state.userAccount) {
			console.error("Web3或账户未初始化");
			return;
		}

		try {
			// 先检查网络ID
			const networkId = await state.web3.eth.net.getId();
			console.log("当前网络ID:", networkId);

			// 设置默认的gas配置
			const defaultGasPrice = await state.web3.eth.getGasPrice();
			const defaultGas = 500000; // 设置一个合理的gas限制

			const contractConfig = {
				from: state.userAccount,
				gasPrice: defaultGasPrice,
				gas: defaultGas,
			};

			// 使用Promise.all并添加超时处理
			const checkContract = async (address) => {
				try {
					const result = await Promise.race([
						state.web3.eth.getTransactionCount(address, BlockTags.LATEST),
						new Promise((_, reject) =>
							setTimeout(() => reject(new Error("请求超时")), 10000)
						),
					]);
					return result;
				} catch (error) {
					console.error(`检查合约 ${address} 失败:`, error);
					return 0;
				}
			};

			// 初始化USDT合约
			// const usdtTxCount = await checkContract(ADDRESS.USDT_CONTRACT_ADDRESS);
			// if (Number(usdtTxCount) === 0) {
			// 	uni.showToast({
			// 		title: "USDT合约未部署或无法访问",
			// 		icon: "none",
			// 	});
			// 	return;
			// }

			// try {
			// 	const usdtContract = new state.web3.eth.Contract(
			// 		USDT_ABI,
			// 		ADDRESS.USDT_CONTRACT_ADDRESS,
			// 		contractConfig
			// 	);
			// 	commit("SET_USDT_CONTRACT", usdtContract);
			// } catch (error) {
			// 	console.error("USDT合约初始化失败:", error);
			// }

			// // 初始化TATG合约
			// const tatgTxCount = await checkContract(ADDRESS.TATG_CONTRACT_ADDRESS);
			// if (Number(tatgTxCount) === 0) {
			// 	uni.showToast({
			// 		title: "TATG合约未部署或无法访问",
			// 		icon: "none",
			// 	});
			// 	return;
			// }

			// try {
			// 	const tatgContract = new state.web3.eth.Contract(
			// 		TATG_ABI,
			// 		ADDRESS.TATG_CONTRACT_ADDRESS,
			// 		contractConfig
			// 	);
			// 	commit("SET_TATG_CONTRACT", tatgContract);
			// } catch (error) {
			// 	console.error("TATG合约初始化失败:", error);
			// }

			// // 初始化交换合约
			// const utswapTxCount = await checkContract(
			// 	ADDRESS.UTSWAP_CONTRACT_ADDRESS
			// );
			// if (Number(utswapTxCount) === 0) {
			// 	uni.showToast({
			// 		title: "Swap合约未部署或无法访问",
			// 		icon: "none",
			// 	});
			// 	return;
			// }

			// try {
			// 	const utswapContract = new state.web3.eth.Contract(
			// 		UTSWAP_ABI,
			// 		ADDRESS.UTSWAP_CONTRACT_ADDRESS,
			// 		contractConfig
			// 	);
			// 	commit("SET_UTSWAP_CONTRACT", utswapContract);
			// } catch (error) {
			// 	console.error("Swap合约初始化失败:", error);
			// }
		} catch (error) {
			console.error("合约初始化过程出错:", error);
			uni.showToast({
				title: "合约初始化失败，请检查网络连接",
				icon: "none",
			});
		}
	},
	async authWalletLogin({
		state,
		commit,
		dispatch
	}) {
		try {
			if (!state.web3) {
				await dispatch("initWeb3");
			}
			if (!state.userAccount) {
				throw new Error("请先连接钱包");
			}
			// 构造签名消息
			const message = `Authorize to login account[${state.userAccount}]`;
			try {
				// 请求签名
				const signature = await state.web3.eth.personal.sign(
					message,
					state.userAccount,
					"" // 密码参数，MetaMask会忽略这个参数
				);
				// 这里可以添加调用后端API的逻辑，发送注册信息
				const loginData = {
					walletAddress: state.userAccount,
					sign: signature,
					dataSign: message,
					timestamp: Date.now(),
				};
				console.log("登陆数据:", loginData);
				httpAuthWalletLogin(loginData)
					.then((res) => {
						uni.showToast({
							title: "登陆成功",
							icon: "success",
						});
						commit("SET_TOKEN_INFO", res.data);
						// 可以在这里添加跳转逻辑
						uni.reLaunch({
							url: "/pages/index/index",
						});
					})
					.catch((err) => {
						console.error("登陆失败:", err);
						uni.showToast({
							title: err.data.msg,
							icon: "none",
						});
					});
			} catch (error) {
				console.error("签名失败:", error);
				throw new Error("用户取消签名");
			}
		} catch (error) {
			console.error("登陆失败:", error);
			throw error;
		}
	},

	async bindWallet({
		state,
		commit,
		dispatch
	}) {
		if (!state.registerInfo.userName) {
			throw new Error("用户名不能为空");
		}
		try {
			if (!state.web3) {
				await dispatch("initWeb3");
			}
			if (!state.userAccount) {
				throw new Error("请先连接钱包");
			}

			// 构造签名消息
			const message = `Authorize ${state.registerInfo.userName} to login account[${state.userAccount}]`;

			try {
				// 请求签名
				const signature = await state.web3.eth.personal.sign(
					message,
					state.userAccount,
					"" // 密码参数，MetaMask会忽略这个参数
				);

				// 这里可以添加调用后端API的逻辑，发送注册信息
				const registerData = {
					username: state.registerInfo.userName,
					inviteCode: state.registerInfo.inviteCode,
					walletAddress: state.userAccount,
					sign: signature,
					dataSign: message,
					timestamp: Date.now(),
				};
				console.log("注册数据:", registerData);
				register(registerData)
					.then((res) => {
						uni.showToast({
							title: "绑定成功",
							icon: "success",
						});
						commit("SET_TOKEN_INFO", res.data);
						// 可以在这里添加跳转逻辑
						uni.reLaunch({
							url: "/pages/index/index",
						});
					})
					.catch((err) => {
						console.error("注册失败:", err);
						uni.showToast({
							title: err.data.msg,
							icon: "none",
						});
					});
			} catch (error) {
				console.error("签名失败:", error);
				throw new Error("用户取消签名");
			}
		} catch (error) {
			console.error("绑定钱包错误:", error);
			throw error;
		}
	},

	async refreshToken({
		state,
		commit,
		dispatch
	}) {
		try {
			if (!state.tokenInfo.refreshToken) {
				throw new Error("Token信息不存在");
			}
			let res = await httpRefreshToken(state.tokenInfo.refreshToken);
			if (res.code == 0) {
				commit("SET_TOKEN_INFO", res.data);
			} else {
				uni.showToast({
					title: res.msg,
					icon: "none",
				});
			}
		} catch (error) {
			console.error("刷新Token失败:", error);
			uni.showToast({
				title: "刷新TOKEN失败",
				icon: "none",
			});
		}
	},

	async refreshUserInfo({
		state,
		commit,
		dispatch
	}) {
		let res = await getBaseInfo();
		if (res.code == 0) {
			commit("SET_USER_INFO", res.data);
		} else {
			uni.showToast({
				title: res.msg,
				icon: "none",
			});
		}
	},
	async onLogout({
		state,
		commit,
		dispatch
	}) {
		commit("SET_USER_INFO", {});
		commit("SET_TOKEN_INFO", {});
		uni.removeStorageSync("mg_tokenInfo");
		uni.removeStorageSync("my_userInfo");
		uni.reLaunch({
			url: "/pages/login/index",
		});
	}
};

const getters = {
	isConnected: (state) => !!state.userAccount,
	shortAddress: (state) => {
		if (!state.userAccount) return "";
		return `${state.userAccount.slice(0, 6)}...${state.userAccount.slice(-4)}`;
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters,
};
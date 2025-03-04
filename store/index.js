// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
import web3 from './modules/web3'
Vue.use(Vuex)
const store = new Vuex.Store({
			// #endif

			// #ifdef VUE3
			import {
				createStore
			} from 'vuex'
			const store = createStore({
				// #endif
				state: {
					baseUrl: "",
					env: "",
					language: "",
					userInfo: {},
					userId: uni.getStorageSync("userId"),
					token: uni.getStorageSync("token"),
				},
				mutations: {
					setUserInfo(state, userInfo) {
						state.userInfo = userInfo
						if (userInfo.uid) {
							state.userId = userInfo.uid
							uni.setStorageSync("userId", userInfo.uid)
						}
						if (userInfo.token) {
							state.token = userInfo.token
							uni.setStorageSync("token", userInfo.token)
						}
					},
					setEnv(state, env) {
						state.env = env
					},
					setLanguage(state, language){
						state.language = language
						uni.setLocale(language)
					},
					refreshUser(state) {
						console.log("刷新账号", state)
						uni.removeStorageSync("_thirdPartUid")
						uni.removeStorageSync("token")
						uni.removeStorageSync("userId")
						state.userId = uni.getStorageSync("userId")
						state.token = uni.getStorageSync("token")
					}
				},
				getters: {
					currentColor(state) {
						return state.colorList[state.colorIndex]
					}
				},
				actions: {
					// lazy loading openid
					getUserOpenId: async function({
						commit,
						state
					}) {
						return await new Promise((resolve, reject) => {
							if (state.openid) {
								resolve(state.openid)
							} else {}
						})
					},
					getPhoneNumber: function({
						commit
					}, univerifyInfo) {}
				},
				modules: {
					web3
				}
			})

			export default store
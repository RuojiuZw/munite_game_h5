import store from "@/store/index.js";
import {
	httpRefreshToken
} from "./api";
const timeout = 10 * 1000;
let base_url = "http://165.154.244.254:48080";

export const request = async (params) => {
	// 获取不到的话默认使用正式服 防止正式服出现错误
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let isToken = params.isToken != false;
	let header = {
		"Content-Type": "application/json;charset=UTF-8",
		"tenant-id": "1",
		...params.header,
	};
	let tokenInfo = store.state.web3.tokenInfo;
	if (isToken) {
		//需要的才去验证是否过期
		if (tokenInfo.accessToken) {
			//有 判断是否过期
			let remainingTime = tokenInfo.expiresTime - new Date().getTime();
			if (remainingTime < 60 * 1000) {
				await store.dispatch("web3/refreshToken");
				tokenInfo = store.state.web3.tokenInfo;
			}
		}
		if (tokenInfo && tokenInfo.accessToken) {
			header.Authorization = "Bearer " + tokenInfo.accessToken;
		}
	}
	if (method == "put") {
		header["Content-Type"] = "application/x-www-form-urlencoded"
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			timeout: timeout,
			data: data,
			success(res) {
				// 根据返回的状态码做出对应的操作
				if (res.statusCode == 200) {
					const data = res.data;
					if (typeof data == "object") {
						if (data.code == 0) {
							resolve(data);
						} else {
							console.error("错误码:", data.code, "错误原因", data.msg);
							switch (data.code) {
								case 401:
									uni.navigateTo({
										url: "/pages/login/index",
									});
									break;
								default:
									break;
							}
							reject(res);
						}
					} else {
						uni.showToast({
							icon: "none",
							title: "请求得到的结果出错!",
							duration: 2000,
						});
						reject(res);
					}
				} else {
					uni.showToast({
						icon: "none",
						title: "请求出错:code" + res.statusCode,
						duration: 2000,
					});
					reject(res);
				}
			},
			fail(err) {
				if (err.errMsg.indexOf("request:fail") !== -1) {
					uni.showToast({
						icon: "none",
						title: "网络请求出错!",
						duration: 2000,
					});
				}
				reject(err);
			},
			complete() {
				// 不管成功还是失败都会执行
				// uni.hideLoading();
				// uni.hideToast();
			},
		});
	});
};
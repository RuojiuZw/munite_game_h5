import store from "@/store/index.js"
const timeout = 10 * 1000
let base_url = store.state.env == 'debug' ? 'https://servertest.10m.com.cn/' : "https://serverpro.10m.com.cn/"

export const request = async (params) => {
	// 获取不到的话默认使用正式服 防止正式服出现错误
	let url = params.url;
	let method = params.method || "get";
	let data = params.data || {};
	let header = {
		'Content-Type': 'application/json;charset=UTF-8',
		...params.header
	}
	if (method == "post") {
		header = {
			'Content-Type': 'application/json'
		};
		data['language'] = store.state.language
		if (params.isSign) {
			data['token'] = store.state.token
			data['uid'] = store.state.userId
		}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: base_url + url,
			method: method,
			header: header,
			timeout: timeout,
			data: data,
			success(response) {
				const res = response
				// 根据返回的状态码做出对应的操作
				//获取成功
				// console.log(res.statusCode);
				if (res.statusCode == 200) {
					if (typeof(res.data) == 'object' && res.data.code == 0) {
						resolve(res.data);
					} else {
						console.log(res.data)
						// if (res.data.msg && !params.noToast) {
							// uni.showToast({
							// 	icon: "none",
							// 	title: ERROR_CODE[res.data.code],
							// 	duration: 2000,
							// })
						// }
						reject(res);
					}
				} else {
					// uni.showToast({
					// 	icon: "none",
					// 	title: ERROR_CODE["again"],
					// 	duration: 2000,
					// })
					reject(res);
				}
			},
			fail(err) {
				console.log(err)
				if (err.errMsg.indexOf('request:fail') !== -1) {
					// uni.showToast({
					// 	icon: "none",
					// 	title: ERROR_CODE['network'],
					// 	duration: 2000
					// })
				} else {
					// uni.showToast({
					// 	icon: "none",
					// 	title: ERROR_CODE['unknown'],
					// 	duration: 2000
					// })
				}
				reject(err);
			},
			complete() {
				// 不管成功还是失败都会执行
				// uni.hideLoading();
				// uni.hideToast();
			}
		});
	})
}

function getUrlParams() {
	let params = {};
	let queryString = window.location.hash.substring(3);
	if (queryString == '') {
		queryString = window.location.search.substring(1);
	}
	if (queryString.indexOf('?') < 0) {
		return params;
	}
	if (queryString.length === 0) {
		return params;
	}
	let pairs = queryString.split('&');
	pairs.forEach(pair => {
		let [key, value] = pair.split('=');
		value = decodeURIComponent(value.replace(/\+/g, ' '));
		if (params.hasOwnProperty(key)) {
			if (!Array.isArray(params[key])) {
				params[key] = [params[key]];
			}
			params[key].push(value);
		} else {
			params[key] = value;
		}
	});
	return params;
}
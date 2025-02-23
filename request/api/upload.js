import {
	getOssToken
} from "./index.js"
import OSS from 'ali-oss'


const refreshSTSToken = async () => {
	const info = await getOssToken()
	return {
		accessKeyId: info.data.AccessKeyId,
		accessKeySecret: info.data.AccessKeySecret,
		stsToken: info.data.SecurityToken
	}
}
let ossData = null
export const getOssClient = cb => {
	if (ossData) {
		cb && cb(new OSS(ossData))
	} else {
		getOssToken().then(res => {
			ossData = {
				region: 'oss-cn-shenzhen',
				accessKeyId: res.data.AccessKeyId,
				accessKeySecret: res.data.AccessKeySecret,
				bucket: '10mlove',
				stsToken: res.data.SecurityToken,
				refreshSTSToken: refreshSTSToken(),
				refreshSTSTokenInterval: 300000,
				timeout: 60 * 10 * 1000
			}
			cb && cb(new OSS(ossData))
		}).catch(err => {
			console.log(err)
			uni.showToast({
				icon: "none",
				title: "获取oss数据发生错误:",
				duration: 2000,
			})
		})
	}
}

export const uploadFile = (file) => {
	return new Promise((resolve, reject) => {
		getOssClient(ossClient => {
			uni.showLoading({
				title: '正在上传...',
			});
			const tmpcnt = file.name.lastIndexOf('.')
			const exname = file.name.substring(tmpcnt + 1).toLowerCase()
			let fileName = '/third/user_head/app_' + new Date().getTime() + '.' +
				exname
			ossClient.put(fileName, file)
				.then(res => {
					uni.hideLoading()
					resolve('https://lvoss.10m.com.cn/' + res.name)
					uni.showToast({
						title: "上传成功！",
						duration: 2000,
					})
				}).catch(err => {
					ossData = null
					uni.showToast({
						icon: "none",
						title: "上传文件失败！请重试！",
						duration: 2000,
					})
					uni.hideLoading()
					reject(err)
				})
		})
	})
}



export const base64ToFile = (base64Data, filename) => {
	// 将base64的数据部分提取出来
	const parts = base64Data.split(';base64,');
	const contentType = parts[0].split(':')[1];
	const raw = window.atob(parts[1]);
	// 将原始数据转换为Uint8Array
	const rawLength = raw.length;
	const uInt8Array = new Uint8Array(rawLength);
	for (let i = 0; i < rawLength; ++i) {
		uInt8Array[i] = raw.charCodeAt(i);
	}

	// 使用Blob对象创建File对象
	const blob = new Blob([uInt8Array], {
		type: contentType
	});
	return new File([blob], filename, {
		type: contentType
	});
}
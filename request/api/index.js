// 引入 request 文件
import { getDeviceOS, getDeviceOSIndex } from '../../utils/utils.js'
import {
	request
} from '../request.js'


export const getBannerList = (params) => {
	return request({
		url: "browser/banner/list",
		method: 'post',
		data: params,
		noToast:true,
		isSign:true,
		header: {} // 自定义
	})
}

export const getIconList = (params) => {
	return request({
		url: "browser/icon/list",
		method: 'post',
		data: params,
		noToast:true,
		isSign:true,
		header: {} // 自定义
	})
}

export const getGameSearch = (params) => {
	params['platform'] = getDeviceOSIndex()
	return request({
		url: "browser/game/search",
		method: 'post',
		data: params,
		noToast:true,
		isSign:true,
		header: {} // 自定义
	})
}


export const gameStart = (params) => {
	return request({
		url: "browser/game/start",
		method: 'post',
		data: params,
		noToast:true,
		isSign:true,
		header: {} // 自定义
	})
}
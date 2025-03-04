// 引入 request 文件
import {
	getDeviceOS,
	getDeviceOSIndex
} from '../../utils/utils.js'
import {
	request
} from '../request.js'

/**
 * 钱包登陆
 * @param {*} params 
 * @returns 
 */
export const httpAuthWalletLogin = (params) => {
	return request({
		url: "/app-api/member/auth/walletLogin",
		method: 'post',
		data: params,
		isToken: false,
	});
};

/**
 * 注册
 * @param {*} params 
 * @returns 
 */
export const register = (params) => {
	return request({
		url: "/app-api/member/auth/register",
		method: 'post',
		data: params,
		header: {}, // 自定义
		isToken: false,
	})
}
/**
 * 刷新token
 */
export const httpRefreshToken = (refreshToken) => {
	return request({
		url: "/app-api/member/auth/refresh-token?refreshToken=" + refreshToken,
		method: 'post',
		isToken: false,
	})
}

/**
 * 获取用户信息
 * @param {*} params 
 * @returns 
 */
export const getBaseInfo = () => {
	return request({
		url: "/app-api/member/user/get",
		method: 'get',
	})
}
/**
 * 获取世界树信息
 * @param {*} params 
 * @returns 
 */
export const getYggdrasilInfo = (params) => {
	return request({
		url: "/app-api/core/yggdrasil/info",
		method: 'get',
		data: params,
	})
}

/**
 * 获取世界树碎片列表信息
 * @param {*} params 
 * @returns 
 */
export const getDebrisList = (params) => {
	return request({
		url: "/app-api/core/yggdrasil/debris-list",
		method: 'get',
		data: params,
	})
}

/**
 * 领取红宝石
 * @param {*} params 
 * @returns 
 */
export const receiveCollectionRuby = (params) => {
	return request({
		url: "/app-api/core/yggdrasil/receive-collection-ruby",
		method: 'put',
		data: params,
	})
}


/**
 * 获取上架MG图腾
 * @param {*} params 
 * @returns 
 */
export const getShopTotemList = (params) => {
	return request({
		url: "/app-api/core/item-template/totem/list",
		method: 'get',
		data: params,
	})
}


/**
 * 获得上架竞技道具列表
 * @param {*} params 
 * @returns 
 */
export const getShopPropList = (params) => {
	return request({
		url: "/app-api/core/item-template/prop/list",
		method: 'get',
		data: params,
	})
}


/**
 * 获得用户背包信息
 * @param {*} params 
 * @returns 
 */
export const getMyBagData = (params) => {
	return request({
		url: "/app-api/core/member-center/member-bag/info",
		method: 'get',
		data: params,
	})
}

/**
 * 获得账户信息
 * @param {*} params 
 * @returns 
 */
export const getTeamInfo = (params) => {
	return request({
		url: "/app-api/core/member-center/member-profile",
		method: 'get',
		data: params,
	})
}

/**
 * 兑换物品
 * @param {*} params 
 * @returns 
 */
export const redeemItem = (params) => {
	return request({
		url: "/app-api/core/member-center/redeem-item",
		method: 'put',
		data: params,
	})
}
/**
 * 安装图腾
 * @param {*} params 
 * @returns 
 */
export const equipTotem = (params) => {
	return request({
		url: "/app-api/core/member-center/equip-totem",
		method: 'put',
		data: params,
	})
}

/**
 * 卸载图腾
 * @param {*} params 
 * @returns 
 */
export const unequipTotem = (params) => {
	return request({
		url: "/app-api/core/yggdrasil/unequip-totem",
		method: 'put',
		data: params,
	})
}

/**
 * 领取空投礼物
 * @param {*} params 
 * @returns 
 */
export const receiveAirdropGift = (params) => {
	return request({
		url: "/app-api/core/yggdrasil/receive-airdrop-gift",
		method: 'put',
		data: params,
	})
}

/**
 * 游戏场首页
 * @param {*} params 
 * @returns 
 */
export const getGamePage = (params) => {
	return request({
		url: "/app-api/core/game/homepage",
		method: 'get',
		data: params,
	})
}

/**
 * 休闲游戏场首页
 * @param {*} params 
 * @returns 
 */
export const getGameQuadPickHome = (params) => {
	return request({
		url: "/app-api/core/quad-pick/homepage",
		method: 'get',
		data: params,
	})
}

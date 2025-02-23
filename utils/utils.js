import moment from 'moment'
import { ANDROID_TYPE, IOS_TYPE } from './TYPE_ENUM'

export function uuid() {
	var s = []
	var hexDigits = '0123456789abcdef'
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
	}
	s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = '-'
	var uuid = s.join('')
	return uuid
}

// 日期格式化
export function formatDate(date, fmt) {
	if (!date) {
		return ''
	}
	if (date.toString().length <= 10) {
		date = date.toString() + '000'
	}
	return moment(parseInt(date)).format(fmt)
}

export function getDeviceOS(type) {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return IOS_TYPE == type;
	}
	if (/android/i.test(userAgent)) {
		return ANDROID_TYPE == type;
	}
	return 'Unknown';
}

export function getDeviceOSIndex() {
	const userAgent = navigator.userAgent || navigator.vendor || window.opera;
	if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
		return 2;
	}
	if (/android/i.test(userAgent)) {
		return 1;
	}
	return 3;
}
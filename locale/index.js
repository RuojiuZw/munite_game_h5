import en from './en.json'
import zh from './zh.json'
const lang = uni.getStorageSync('language') || uni.getLocale(); //获取缓存中的语言
// VueI18n构造函数所需要的配置
const i18nConfig = {
	locale: lang, //当前语言
	// 所需要用的语言包
	messages: {
		en,
		zh
	}
}

// #ifndef VUE3
import Vue from 'vue'
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
const i18n = new VueI18n(i18nConfig)
// #endif
// #ifdef VUE3
import {
	createI18n
} from 'vue-i18n' // v9.x
const i18n = createI18n(i18nConfig)
// #endif
export default i18n
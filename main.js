import App from './App'
import store from './store'
import wuUI from "@/uni_modules/wu-ui-tools";
import i18n from '@/locale/index.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.prototype.$store = store
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	wuUI,
	store,
	i18n,
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(wuUI)
	app.use(store)
	app.use(i18n)
	return {
		app
	}
}
// #endif
uni.$w.setConfig({
	// 修改$wu.config对象的属性
	config: {
		// 修改默认单位为rpx，相当于执行 uni.$wu.config.unit = 'rpx'
		unit: 'rpx'
	},
	// 修改$wu.props对象的属性
	props: {
		// 修改wu-text组件的size参数的默认值，注意：默认值都要用default声明
		text: {
			color: {
				default: 'red'
			}
		}
		// 其他组件属性配置，具体的参数名称可以去每个组件的props.js中进行查看
		// ......
	}
})
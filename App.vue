<script>
	import store from "@/store/index.js"
	import VConsole from "vconsole"
	import {
		version
	} from './package.json'
	export default {
		mounted() {
			if (uni.getStorageSync("isDebug")) {
				var vConsole = new VConsole();
			}
			uni.onLocaleChange((e) => {
				console.log("语言切换", e)
				this.$i18n.locale = e.locale
			})
		},
		onLaunch: function(option) {
			const {
				query
			} = option
			// #ifdef H5
			console.log(
				`%c hello uniapp %c v${version} `,
				'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
				'background:#007aff ;padding: 1px; border-radius: 0 3px 3px 0;  color: #fff; font-weight: bold;'
			)
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {},
		methods: {}
	}
</script>

<style lang="scss">
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import '@/static/customicons.css';

	/* H5 兼容 pc 所需 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}

	img {
		-webkit-touch-callout: none;
	}

	uni-page,
	uni-page-body {
		min-height: 100% !important;
		height: auto !important;
	}

	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}

	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}


	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #FEF4D8;
		height: 100%;
		font-size: 28rpx;
		font-family: PingFang SC;
	}

	.fix-pc-padding {
		padding: 0 50px;
	}

	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}

	.uni-header-image {
		width: 100px;
		height: 100px;
	}

	.uni-hello-text {
		color: #7A7E83;
	}

	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}

	/* #endif*/

	.singe-line {
		text-overflow: ellipsis;
		overflow: hidden;
		word-break: break-all;
		white-space: nowrap;
	}

	@keyframes payLoading {
		0% {
			opacity: 1;
			transform: scale(1);
		}

		100% {
			opacity: 0.3;
			transform: scale(0.5);
		}
	}

	/*每个页面公共css */
	/* 解决小程序和app滚动条的问题 */
	/* #ifdef MP-WEIXIN || APP-PLUS */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	/* #endif */

	/* 解决H5 的问题 */
	/* #ifdef H5 */
	uni-scroll-view .uni-scroll-view::-webkit-scrollbar {
		/* 隐藏滚动条，但依旧具备可以滚动的功能 */
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
		color: transparent;
	}

	/* #endif */
</style>
<template>
	<view class="login-page">
		<top-bar-box></top-bar-box>
		<view class="login-content-box">
			<view class="login-title">About MG</view>
			<view class="login-msg-list">
				<view class="login-msg-item">
					MG是一款基于区块链技术的公平博弈小游戏平台。
				</view>
				<br>
				<view class="login-msg-item">
					会员通过简单的竞技小游戏，来与其他
					所有会员一起公平公正的博弈，
					并在获胜后，赢得回报。
				</view>
			</view>
		</view>
		<view class="button-list">
			<view class="button-item">钱包登陆</view>
			<view class="button-item">账号注册</view>
		</view>

		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex' //引入mapState
	export default {
		data() {
			return {}
		},
		computed: {
			...mapState({
				language: state => state.language
			}),
		},
		onLoad(e) {},
		onShow() {},
		onHide() {},
		methods: {}
	}
</script>

<style scoped>
	.login-content-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.login-title {
		margin-top: 55rpx;
		font-size: 35rpx;
		color: #000000;
		font-weight: 600;
	}

	.login-msg-list {
		margin-top: 39rpx;
		padding: 0 120rpx;
	}

	.login-msg-item {
		white-space: pre-line;
	}

	.button-list {
		margin-top: 120rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 60rpx;
	}

	.button-item {
		width: 223rpx;
		height: 83rpx;
		background: url("@/static/image/com/btn_bg.png") no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		font-size: 35rpx;
		justify-content: center;
	}
</style>
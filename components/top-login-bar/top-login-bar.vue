<template>
	<view class="top-login-bar">
		<view class="left-box">
			<image class="logo-icon" src="/static/image/com/logo_w.png"></image>
			<view class="left-text-list">
				<view class="top-title">Munite Game</view>
				<view class="top-text">一个没有输家的游戏</view>
			</view>
		</view>
		<view class="right-box">
			<view class="right-text-list">
				<view class="right-name">Munite Game</view>
				<view class="right-lv">LV:01</view>
			</view>
			<image class="header-icon" src="/static/image/com/logo_w.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: "top-login-bar",
		data() {
			return {};
		},
		mounted() {},
		methods: {}
	}
</script>

<style scoped>
	.top-login-bar {
		width: 100%;
		height: 169rpx;
		background: #FFDB7B;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.8);
		display: flex;
		position: relative;
		z-index: 999;
	}

	.left-box {
		background: #FF9C00;
		width: 360rpx;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 2px 0px 8rpx rgba(0, 0, 0, 0.3);
	}


	.logo-icon {
		width: 111rpx;
		height: 74rpx;
	}

	.left-text-list {
		margin-left: 10rpx;
	}

	.top-title {
		font-size: 28rpx;
		font-weight: 500;
		color: #fff;
	}

	.top-text {
		font-size: 21rpx;
		color: rgba(255, 255, 255, 0.45);
	}

	.right-box {
		padding-right: 20rpx;
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	.right-text-list {
		margin-right: 10rpx;
		margin-top: 50rpx;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		gap: 10rpx;
	}

	.header-icon {
		width: 131rpx;
		height: 128rpx;
	}
</style>
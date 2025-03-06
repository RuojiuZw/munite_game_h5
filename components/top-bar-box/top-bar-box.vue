<template>
	<view class="top-bar-box">
		<img src="@/static/image/com/logo_color.png" class="top-bar-logo" />
		<view class="top-bar-title">Munite Game</view>
		<view class="top-bar-text">一個沒有輸家的遊戲</view>
	</view>
</template>

<script>
	export default {
		name: "top-bar-box",
		data() {
			return {};
		},
		mounted() {},
		methods: {}
	}
</script>

<style scoped>
	.top-bar-box {
		width: 100%;
		height: 330rpx;
		background: #FFDB7B;
		background-image: url("@/static/image/com/logo_no_color.png");
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.8);
		position: relative;
		z-index: 999;
	}

	.top-bar-logo {
		width: 226rpx;
		height: 149rpx;
	}

	.top-bar-title {
		margin: 18rpx 0;
		font-size: 28rpx;
		color: #000000;
	}

	.top-bar-text {
		color: rgba(0, 0, 0, 0.45);
	}
</style>
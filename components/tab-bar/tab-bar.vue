<template>
	<view class="tab-bar-box">
		<view class="left-button" @click="onToTab('/pages/shoppingMall/index')">
			<img class="some-button-icon" src="@/static/tabbar-3.png" />
			<view class="menu-text">商城</view>
		</view>
		<view class="content-big-button" @click="onToTab('/pages/index/index')">
			<img class="big-icon" src="@/static/tabbar-3.png" />
			<view class="menu-text">游戏场</view>
		</view>
		<view class="right-button" @click="onToTab('/pages/worldTree/index')">
			<img class="some-button-icon" src="@/static/tabbar-3.png" />
			<view class="menu-text">世界树</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "tab-bar",
		emits: ['onTabBar'],
		data() {
			return {
				oldVideo: null,
				oldVideoIndex: -1,
				isMutedList: {}
			};
		},
		mounted() {},
		methods: {
			onToTab(url) {
				uni.switchTab({
					url: url
				})
			}
		}
	}
</script>

<style scoped>
	.tab-bar-box {
		display: flex;
		align-items: end;
		justify-content: center;
		gap: 40rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 184rpx;
		background: url("/static/tab-bar-bg.png") no-repeat;
		background-size: 100%;
	}

	.left-button,
	.right-button,
	.content-big-button {
		display: flex;
		flex-direction: column;
		font-size: 28rpx;
		text-align: center;
		margin-bottom: 45rpx;
	}

	.big-icon {
		width: 185rpx;
		height: 185rpx;
	}

	.some-button-icon {
		width: 152rpx;
		height: 152rpx;
	}

	.menu-text {
		margin-top: -20rpx;
		color: #fff;
		align-items: center;
	}
</style>
<template>
	<view class="top-login-bar">
		<view class="left-box">
			<image class="logo-icon" src="@/static/image/com/logo_w.png"></image>
			<view class="left-text-list">
				<view class="top-title">Munite Game</view>
				<view class="top-text">一個沒有輸家的遊戲</view>
			</view>
		</view>
		<view class="right-box">
			<view class="right-text-list">
				<view class="right-name">{{ userInfo.username || "" }}</view>
				<view class="right-lv" v-if="userInfo.level">Lv:{{ userInfo.level.level || 0 }}</view>
			</view>
			<image @click="toMyUserInfo()" class="header-icon" :src="userInfo.avatar"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from "vuex";
	import {
		getBaseInfo
	} from "../../request/api";
	export default {
		name: "top-login-bar",
		data() {
			return {
			};
		},
		computed: {
			...mapState({
				userInfo: (state) => state.web3.userInfo,
				tokenInfo: (state) => state.web3.tokenInfo,
			}),
		},
		mounted() {
			this.onInitData();
		},
		methods: {
			...mapActions("web3", ["refreshToken", "refreshUserInfo"]),
			async onInitData() {
				this.refreshUserInfo()
			},
			toMyUserInfo() {
				uni.reLaunch({
					url: "/pages/myPage/index",
				});
			},
		},
	};
</script>

<style scoped>
	.top-login-bar {
		width: 100%;
		height: 169rpx;
		background: #ffdb7b;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.8);
		display: flex;
		position: relative;
		z-index: 99;
	}

	.left-box {
		background: #ff9c00;
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
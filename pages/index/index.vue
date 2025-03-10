<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="game-top-box-bg">
			<view class="game-top-title-box">
				<view>Munite Game,</view>
				<view>There are no losers</view>
			</view>
			<image class="game-top-box-bg-icon" src="@/static/image/game/game-top-icon.png" />
			<view class="game-top-box-number-people-box">
				<view class="text">當前</view>
				<view class="number">{{homePageData.totalCount}}</view>
				<view class="text">人</view>
			</view>
		</view>
		<view class="game-box-list">
			<view class="game-box-item" @click="openGame(1)">
				<view class="game-now-people-text">{{homePageData.quadPickCount}}人</view>
				<image class="game-box-item-bg-icon icon-1" src="@/static/image/game/game-icon-1.png" />
				<view class="game-title">休閒四選一</view>
			</view>
			<view class="game-box-item" @click="openGame(2)">
				<view class="game-now-people-text">{{homePageData.tigerClashCount}}人</view>
				<image class="game-box-item-bg-icon icon-2" src="@/static/image/game/game-icon-2.png" />
				<view class="game-title">虎王爭雄</view>
			</view>
		</view>
		<mg-popup ref="noOpenPopup" width="700rpx" height="630rpx">
			<view class="no-open-box">
				<image class="no-open-big-image" src="@/static/image/game/game-icon-2.png"></image>
				<view class="no-open-text-list">
					<view>目前是MG試運營階段，</view>
					<view>虎王爭雄暫未開放，</view>
					<view>敬請期待！</view>
				</view>
			</view>
		</mg-popup>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"; //引入mapState
	import {
		getGamePage
	} from "../../request/api";
	export default {
		data() {
			return {
				homePageData: {}
			};
		},
		computed: {
			...mapState({
				language: (state) => state.language,
			}),
		},
		onLoad(e) {
			this.onInitData()
		},
		onShow() {},
		onHide() {},
		methods: {
			onInitData() {
				getGamePage().then(res => {
					console.log(res.data)
					this.homePageData = res.data
				}).catch(err => {
					console.log("獲取失敗 使用測試數據")
				})
			},
			openGame(type) {
				switch (type) {
					case 1:
						uni.reLaunch({
							url: "/pages/game/quadPick/index"
						})
						break;
					case 2:
						this.showNoOpenPopup()
						break;
				}
			},
			showNoOpenPopup() {
				this.$refs.noOpenPopup.open()
			}
		},
	};
</script>

<style scoped>
	page {
		background-color: #ffecb8;
	}

	.game-top-box-bg {
		background-color: #ffdb7b;
		height: 400rpx;
		background-image: url("@/static/image/com/logo_no_color.png");
		background-repeat: no-repeat;
		background-position: center center;
		background-size: auto 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 5rpx 5rpx rgba(0, 0, 0, 0.3);
	}

	.game-top-box-number-people-box {
		display: flex;
		align-items: center;
		position: absolute;
		top: 160rpx;
		left: 42rpx;
	}

	.game-top-box-bg-icon {
		position: absolute;
		width: 589rpx;
		height: 242rpx;
		bottom: 20rpx;
	}

	.game-top-title-box {
		font-family: AgencyFB, AgencyFB;
		font-weight: normal;
		font-size: 36rpx;
		position: absolute;
		top: 26rpx;
		text-align: center;
	}

	.game-top-box-number-people-box .text {
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.game-top-box-number-people-box .number {
		font-size: 42rpx;
		font-weight: 600;
		margin: 0 10rpx;
	}

	.game-box-list {
		display: flex;
		flex-wrap: wrap;
		padding: 35rpx 80rpx;
		gap: 55rpx;
	}

	.game-box-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 260rpx;
		width: 160rpx;
	}

	.game-now-people-text {
		font-size: 21rpx;
	}

	.game-title {
		margin-top: auto;
		font-size: 28rpx;
		font-weight: 600;
	}

	.game-box-item-bg-icon {
		margin-top: 20rpx;
	}

	.game-box-item-bg-icon.icon-1 {
		width: 146rpx;
		height: 146rpx;
	}

	.game-box-item-bg-icon.icon-2 {
		width: 186rpx;
		height: 143rpx;
	}



	.no-open-big-image {
		margin-top: 50rpx;
		width: 186rpx;
		height: 143rpx;
	}

	.no-open-text-list {
		margin-top: 60rpx;
		color: #fff;
		line-height: 46rpx;
		font-weight: 600;
		font-size: 32rpx;
		text-align: center;
	}

	.no-open-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
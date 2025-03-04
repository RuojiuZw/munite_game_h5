<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="game-top-box-bg">
			<view class="game-top-box-images">
				<image class="top-box-image-1" src="/static/image/game/quad-pick/game-icon.png" mode="aspectFit">
				</image>
				<image class="top-box-image-title" src="/static/image/game/quad-pick/game-title.png" mode="aspectFit">
				</image>
			</view>
			<view class="game-top-box-number-people-box">
				<view class="text">当前</view>
				<view class="number">{{homePageData.quadPickCount}}</view>
				<view class="text">人</view>
			</view>
			<view class="game-top-box-game-rule" @click="openPopup('gameRulePopup')">
				<image class="game-top-box-game-rule-image" src="/static/image/game/quad-pick/book.png" mode="aspectFit"></image>
				<view class="game-top-box-game-rule-text">游戏规则</view>
			</view>
		</view>

		<mg-popup ref="gameRulePopup" width="700rpx" height="630rpx">
			<view class="game-rule-popup-box">
				
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
		getGameQuadPickHome
	} from "../../../request/api";
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
				getGameQuadPickHome().then(res => {
					this.homePageData = res.data
				}).catch(err => {
					this.homePageData = {
						"roomList": [{
							"id": 1024,
							"displayUrl": "http://",
							"rubyCost": 1,
							"inactive": false,
							"memberCount": 255
						}],
						"quadPickCount": 255
					}
				})
			},
			openGame(type) {
				switch (type) {
					case 1:
						break;
					case 2:
						this.showNoOpenPopup()
						break;
				}
			},
			openPopup(name, closeName) {
				if (typeof closeName === "string") {
					this.$refs[closeName].close();
				}
				if (typeof closeName === "array") {
					for (let i = 0; i < closeName.length; i++) {
						this.$refs[closeName[i]].close();
					}
				}
				if (this.$refs[name]) {
					this.$refs[name].open();
				}
			},
			closePopup(name) {
				if (this.$refs[name]) {
					this.$refs[name].close();
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
		top: 49rpx;
		left: 28rpx;
	}

	.game-top-box-bg-icon {
		position: absolute;
		width: 589rpx;
		height: 242rpx;
		bottom: 20rpx;
	}

	.game-top-box-number-people-box .text {
		font-size: 28rpx;
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

	.game-top-box-images {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16rpx;
	}

	.top-box-image-1 {
		width: 227rpx;
		height: 227rpx;
	}

	.top-box-image-title {
		width: 207rpx;
		height: 39rpx;
	}
	.game-top-box-game-rule{
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		left: 56rpx;
		top: 154rpx;
		gap: 16rpx;
	}
	.game-top-box-game-rule-image{
		width: 130rpx;
		height: 97rpx;
	}
	.game-top-box-game-rule-text{
		font-size: 28rpx;
	}
</style>
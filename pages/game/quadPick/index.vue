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
				<view class="text">當前</view>
				<view class="number">{{homePageData.quadPickCount}}</view>
				<view class="text">人</view>
			</view>
			<view class="game-top-box-game-rule" @click="openPopup('gameRulePopup')">
				<image class="game-top-box-game-rule-image" src="/static/image/game/quad-pick/book.png"
					mode="aspectFit"></image>
				<view class="game-top-box-game-rule-text">遊戲規則</view>
			</view>
		</view>
		<view class="game-content-box">
			<view class="game-content-item" v-for="(item,index) in roomList" :key="index" @click="onClickItem(item)">
				<image class="game-content-item-image" :src="item.displayUrl" mode="aspectFit">
				</image>
				<view class="game-content-item-text">{{item.memberCount}}</view>
			</view>
		</view>

		<mg-popup ref="gameRulePopup" width="700rpx" height="600rpx">
			<view class="game-rule-popup-box">
				<image class="game-rule-popup-image" src="/static/image/game/quad-pick/game-icon.png" mode="aspectFit">
				</image>
				<view class="game-rule-popup-text-list">
					<view class="game-rule-popup-text-item">休閒四選一是一款</view>
					<view class="game-rule-popup-text-item">三贏一輸（勝率75%）的競猜小遊戲</view>
					<view class="game-rule-popup-text-item margin-top">會員進入一個自己喜歡的紅寶石場次，</view>
					<view class="game-rule-popup-text-item">然後在自己喜歡的數字（1~4）上</view>
					<view class="game-rule-popup-text-item">質押紅寶石（根據場級別決定），</view>
					<view class="game-rule-popup-text-item">當遊戲開出結果，</view>
					<view class="game-rule-popup-text-item">選擇了沒有中雷的數字的會員，</view>
					<view class="game-rule-popup-text-item">贏得比賽。</view>
				</view>
			</view>
		</mg-popup>

		<mg-popup ref="gameNotEnoughPopup" width="700rpx" height="600rpx">
			<view class="game-rule-popup-box">
				<view class="game-rule-popup-text-list">
					<view class="game-rule-popup-text-item">很抱歉，您的背包裡沒有足夠的紅寶石</view>
					<view class="game-rule-popup-text-item">來支撐這一次精彩遊戲。</view>
					<view class="game-rule-popup-text-item margin-top">紅寶石獲得方式：</view>
					<view class="game-rule-popup-text-item">1、在商城裡用MGT兌換；</view>
					<view class="game-rule-popup-text-item">2、世界樹裡圖騰產生；</view>
					<view class="game-rule-popup-text-item">3、網遊戲贏得競技比賽；</view>
					<view class="game-rule-popup-text-item">4、發展會員獲得；</view>
					<view class="game-rule-popup-text-item">5、世界樹領取空投；</view>
				</view>
			</view>
		</mg-popup>

		<mg-popup ref="gameNoOpenPopup" width="700rpx" height="500rpx">
			<view class="game-rule-popup-box">
				<image class="game-rule-popup-image" src="/static/image/game/quad-pick/game-icon.png" mode="aspectFit">
				</image>
				<view class="game-rule-popup-text-list">
					<view class="game-rule-popup-text-item">很抱歉，您所選擇的場次</view>
					<view class="game-rule-popup-text-item">暫時還未對外開放，</view>
					<view class="game-rule-popup-text-item">你可以去選擇其他場次進行遊戲。</view>
					<view class="game-rule-popup-text-item margin-top">MG友情提示：</view>
					<view class="game-rule-popup-text-item">小小博弈怡情，切勿上頭哦。</view>
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
		enterRoom,
		getGameQuadPickHome
	} from "../../../request/api";
	export default {
		data() {
			return {
				homePageData: {},
				roomList: [],
			};
		},
		computed: {
			...mapState({
				userInfo: (state) => state.web3.userInfo,
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
					this.roomList = res.data.roomList
				}).catch(err => {
					uni.showToast({
						title: "獲取首頁數據失敗!",
						icon: "none"
					})
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
			onClickItem(item) {
				if (item.inactive) {
					this.openPopup("gameNoOpenPopup")
					return
				}
				enterRoom({
					id: item.id
				}).then(res => {
					console.log(res)
					uni.reLaunch({
						url: "/pages/game/quadPick/game?id=" + item.id
					})
				}).catch(err => {
					if (err.data.code == 2001000004) {
						this.openPopup("gameNotEnoughPopup")
						return
					}
					uni.showToast({
						title: err.data.msg,
						icon: "none"
					})
				})
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

	.game-top-box-game-rule {
		position: absolute;
		display: flex;
		flex-direction: column;
		align-items: center;
		left: 56rpx;
		top: 154rpx;
		gap: 16rpx;
	}

	.game-top-box-game-rule-image {
		width: 130rpx;
		height: 97rpx;
	}

	.game-top-box-game-rule-text {
		font-size: 28rpx;
	}

	.game-content-box {
		margin-top: 52rpx;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		column-gap: 105rpx;
		row-gap: 38rpx;
	}

	.game-content-item {
		position: relative;
	}

	.game-content-item-text {
		position: absolute;
		text-align: center;
		width: 100%;
		color: #fff;
		font-size: 28rpx;
		bottom: 15rpx;
	}

	.game-content-item-image {
		width: 132rpx;
		height: 200rpx;
	}

	.game-rule-popup-box {
		margin-left: 55rpx;
		margin-top: 38rpx;
		display: flex;
		gap: 18rpx;
	}

	.game-rule-popup-image {
		width: 110rpx;
		height: 116rpx;
	}

	.game-rule-popup-text-list {
		font-size: 28rpx;
		line-height: 1.5;
	}

	.margin-top {
		margin-top: 40rpx;
	}
</style>
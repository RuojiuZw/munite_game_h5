<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="game-top-box-bg">
			<view class="game-top-box-images">
				<image class="top-box-banner-image" :src="roomInfo.banner" mode="aspectFit">
				</image>
			</view>
			<view class="exit-icon-box" @click="toBack()">
				<image class="exit-icon" src="@/static/image/game/quad-pick/exit-icon.png" mode=""></image>
			</view>
		</view>
		<view class="game-content-box">
			<view class="content-title">
				<view v-if="gameStatus == 1">請盡快選定您中意的數盤</view>
				<view v-if="gameStatus == 2">敬请等待选择结果......</view>
				<view v-if="gameStatus == 3">結果已經產生</view>
			</view>

			<view class="clock-box">
				<image class="clock-image" src="@/static/image/game/quad-pick/clock.png" mode="aspectFit"></image>
				<view class="clock-time-box" v-if="!isShowText">
					00:{{countdownTime < 10 ? "0" + countdownTime : countdownTime}}</view>
				<view class="clock-time-box select-text" v-if="isShowText">{{contentText}}</view>
			</view>
			<view class="game-number-box">
				<view class="game-number-item number-1" :class="{ active: numberActive === 1,bobm:bombCurIndex ===1}"
					@click="openSelectPopup(1)">
					<image class="game-number-item-yes" v-if="selectNumber === 1"
						src="@/static/image/game/quad-pick/yes.png">
					</image>
					<view v-if="isShowPeople" class="game-people-number">0</view>
				</view>
				<view class="game-number-item number-2" :class="{ active: numberActive === 2,bobm:bombCurIndex ===2 }"
					@click="openSelectPopup(2)">
					<image class="game-number-item-yes" v-if="selectNumber === 2"
						src="@/static/image/game/quad-pick/yes.png"></image>
					<view v-if="isShowPeople" class="game-people-number">0</view>
				</view>
				<view class="game-number-item number-3" :class="{ active: numberActive === 3,bobm:bombCurIndex ===3 }"
					@click="openSelectPopup(3)">
					<image class="game-number-item-yes" v-if="selectNumber === 3"
						src="@/static/image/game/quad-pick/yes.png"></image>
					<view v-if="isShowPeople" class="game-people-number">0</view>
				</view>
				<view class="game-number-item number-4" :class="{ active: numberActive === 4,bobm:bombCurIndex ===4 }"
					@click="openSelectPopup(4)">
					<image class="game-number-item-yes" v-if="selectNumber === 4"
						src="@/static/image/game/quad-pick/yes.png"></image>
					<view v-if="isShowPeople" class="game-people-number">0</view>
				</view>
			</view>
		</view>

		<view class="game-popup-box">
			<image class="game-popup-image" @click="onSowPeopleNumber" src="@/static/image/shoppingMall/dtzy.png" mode="aspectFit"></image>
			<image class="game-popup-image" src="@/static/image/shoppingMall/lsck.png" mode="aspectFit"></image>
		</view>

		<!-- 		<mg-popup ref="gameRulePopup" width="700rpx" height="600rpx">
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
		</mg-popup> -->

		<mg-popup ref="gameResultPopup" width="700rpx" height="530rpx">
			<view class="game-result-popup-box">
				<view class="game-result-popup-text-list">
					<view class="game-result-popup-text-item">{{ resultInfo.gameWon?'恭喜您！ 贏得了剛才的比賽！':'很遺憾，您這一次沒有選中'}}
					</view>
					<view class="retult-win-box" v-if="resultInfo.gameWon">

						<view class="retult-win-text">
							世界樹已經將您的獎勵；
						</view>
						<view class="retult-win-text">
							<text class="retult-win-text-bold">{{resultInfo.wonRuby}}</text>個紅寶石發放至您的背包，
						</view>
						<view class="retult-win-text">
							敬請查收！
						</view>
					</view>
					<view class="retult-fail-box" v-if="!resultInfo.gameWon">
						<view class="retult-fail-text">
							世界樹已經為您產生了一個紅寶石碎片，
						</view>
						<view class="retult-fail-text">
							您質押的紅寶石將在一百天內全部返還！
						</view>
						<view class="retult-fail-text">
							再來一次，勝利必將屬於您！
						</view>
					</view>
					<view class="retult-fail-box" v-if="!resultInfo.gameWon">
						<view class="retult-fail-text">
							溫馨提示：<text class="retult-win-text-bold">您的紅寶石數量已經不够，</text>
						</view>
						<view class="retult-fail-text">
							无法进行下一场竞技。
						</view>
					</view>
				</view>
				<view class="game-select-button-list">
					<view class="game-select-button-item" @click="toMyPage()">查看背包</view>
					<view class="game-select-button-item" v-if="resultInfo.nextReady" @click="nextPageGame()">繼續遊戲
					</view>
					<view class="game-select-button-item" v-if="!resultInfo.nextReady" @click="toBack()">返回大廳</view>
				</view>
			</view>
		</mg-popup>

		<mg-popup ref="gameSelectPopup" width="700rpx" height="580rpx">
			<view class="game-select-popup-box">
				<view class="game-select-popup-text-item">您选中的是{{ curIndexNumber }}号数盘，您是否确定？</view>
				<image class="game-select-popup-image" v-if="curIndexNumber == 1"
					src="@/static/image/game/quad-pick/1.png" mode="aspectFit">
				</image>
				<image class="game-select-popup-image" v-if="curIndexNumber == 2"
					src="@/static/image/game/quad-pick/2.png" mode="aspectFit">
				</image>
				<image class="game-select-popup-image" v-if="curIndexNumber == 3"
					src="@/static/image/game/quad-pick/3.png" mode="aspectFit">
				</image>
				<image class="game-select-popup-image" v-if="curIndexNumber == 4"
					src="@/static/image/game/quad-pick/4.png" mode="aspectFit">
				</image>
				<view class="game-select-button-list">
					<view class="game-select-button-item" @click="closePopup('gameSelectPopup')">我再想想</view>
					<view class="game-select-button-item" @click="confirmSelectPopup()">確 認</view>
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
		betNumber,
		exitRoom,
		gameResult,
		getGameQuadPickHome,
		roomInfo,
		breathe
	} from "../../../request/api";
	export default {
		data() {
			return {
				roomId: 0,
				gameId: 0,
				roomInfo: {},
				numberActive: 0,
				interval: null,
				curIndexNumber: 0,
				selectNumber: 0,
				isCanAvailable: false,
				countdownTime: 60,
				countdownInterval: null,
				isShowPeople: false,
				breatheInterval: null,
				initDataInterval: null,
				isShowText: false,
				bombCurIndex: 0,
				contentText: "游戏未开始",
				resultInfo: {},
				gameStatus: 1,
			};
		},
		computed: {
			...mapState({
				language: (state) => state.language,
			}),
		},
		onLoad(e) {
			if (e.hasOwnProperty('id')) {
				this.roomId = e.id
				this.onRestartGame();
			} else {
				uni.showToast({
					title: "不是正确的房间号！",
					icon: "none"
				})
			}
			this.onStartBreathe()
		},
		onShow() {},
		onUnload() {
			console.log("页面卸载")
			if (this.countdownInterval) {
				clearInterval(this.countdownInterval);
			}
			if (this.interval) {
				clearInterval(this.interval)
			}
			if (this.breatheInterval) {
				clearInterval(this.breatheInterval)
			}
			if (this.initDataInterval) {
				clearInterval(this.initDataInterval)
			}
			exitRoom().then(res => {
				console.log(res)
			})
		},
		onHide() {
			console.log("onHide")
			console.log(this.countdownInterval)
		},
		methods: {
			onRestartGame() {
				this.roomInfo = {}
				this.numberActive = 0
				this.curIndexNumber = 0
				this.selectNumber = 0
				this.isShowText = false
				this.bombCurIndex = 0
				this.contentText = '世界樹選擇數字'
				this.resultInfo = {}
				this.isShowPeople = false
				this.gameStatus = 1
				this.onInitData();
			},
			onStartBreathe() {
				if (this.breatheInterval) {
					clearInterval(this.breatheInterval);
					this.breatheInterval = null
				}
				if (this.initDataInterval) {
					clearInterval(this.initDataInterval);
					this.initDataInterval = null
				}
				this.initDataInterval = setInterval(() => {
					this.onInitData()
				}, 30 * 1000)

				this.breatheInterval = setInterval(() => {
					breathe().then(res => {})
				}, 90 * 1000)
			},
			onInitData() {
				roomInfo({
					id: this.roomId
				}).then(res => {
					this.roomInfo = res.data
					this.gameId = res.data.gameId
					this.gameStatus = res.data.status
					if (res.data.acceptsBet) {
						this.selectNumber = res.data.memberChoice
					}
					this.isCanAvailable = res.data.betAvailable
					let downTime = Math.floor(this.roomInfo.cooldown / 1000) + 1
					this.startCountdown(downTime);
				}).catch(err => {
					this.contentText = err.data.msg
					this.isShowText = true;
					uni.showToast({
						title: err.data.msg,
						icon: "none"
					})
				})
			},
			openNumberAnim() {
				if (this.interval != null) {
					clearInterval(this.interval);
					this.interval = null;
				}
				this.numberActive = 1;
				let index = 0;
				this.interval = setInterval(() => {
					this.numberActive++;
					if (this.numberActive == 5) {
						this.numberActive = 0;
					}
					if (index > 12) {
						this.gameStatus = 3;
						clearInterval(this.interval);
						this.interval = null
						this.onGameResult()
					}
					index++;
				}, 1000);
			},
			onGameResult() {
				gameResult({
					gameId: this.gameId
				}).then(res => {
					let data = res.data
					// 参与下注
					if (data.betting) {
						this.resultInfo = data;
					}
					this.onShowBobmAnim(data)
					console.log(res)
				}).catch(err => {
					console.error(err)
				})
			},
			openGame(type) {
				switch (type) {
					case 1:
						break;
					case 2:
						this.showNoOpenPopup();
						break;
				}
			},
			onShowBobmAnim(data) {
				this.bombCurIndex = data.systemChoice
				setTimeout(() => {
					this.openPopup("gameResultPopup")
				}, 1500)
			},
			openSelectPopup(index) {
				if (this.isShowText) {
					return
				}
				if (this.selectNumber == 0) {
					this.curIndexNumber = index;
					this.openPopup("gameSelectPopup");
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
				if (item >= 8) {
					this.openPopup("gameNotEnoughPopup");
					return;
				}
				if (item >= 6) {
					this.openPopup("gameNoOpenPopup");
				}
			},
			showNoOpenPopup() {
				this.$refs.noOpenPopup.open();
			},
			toMyPage() {
				uni.redirectTo({
					url: "/pages/myPage/index"
				})
			},
			nextPageGame() {
				this.closePopup("gameResultPopup")
				this.onRestartGame();
			},
			confirmSelectPopup() {
				betNumber({
					roomId: this.roomId,
					betNumber: this.curIndexNumber
				}).then(res => {
					this.selectNumber = this.curIndexNumber;
				}).catch(err => {
					uni.showToast({
						title: err.data.msg,
						icon: "none"
					})
				}).finally(() => {
					this.closePopup("gameSelectPopup");
				})
			},
			startCountdown(downTime) {
				this.isShowText = false;
				this.countdownTime = downTime;
				if (this.countdownInterval) {
					clearInterval(this.countdownInterval);
					this.countdownInterval = null
				}
				this.countdownInterval = setInterval(() => {
					if (this.countdownTime > 0) {
						this.countdownTime--;
					} else {
						clearInterval(this.countdownInterval);
						this.isShowText = true;
						this.contentText = '世界樹選擇數字'
						this.gameStatus = 2;
						this.openNumberAnim();
					}
				}, 1000);
			},
			toBack() {
				uni.redirectTo({
					url: "/pages/game/quadPick/index"
				})
			},
			onSowPeopleNumber() {
				this.isShowPeople = true
			}
		},
	};
</script>

<style scoped>
	page {
		background-color: #fef4d8;
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

	.exit-icon-box {
		position: absolute;
		top: 51rpx;
		left: 37rpx;
	}

	.game-top-box-images {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top-box-banner-image {
		width: 406rpx;
		height: 373rpx;
	}

	.margin-top {
		margin-top: 40rpx;
	}

	.exit-icon {
		width: 149rpx;
		height: 53rpx;
	}

	.game-content-box {
		height: 533rpx;
		background: #ffecb8;
		box-shadow: 0 0 5rpx 5rpx rgba(0, 0, 0, 0.3);
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content-title {
		margin-top: 40rpx;
		font-size: 28rpx;
	}

	.clock-box {
		margin-top: 25rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.clock-image {
		width: 167rpx;
		height: 160rpx;
	}

	.clock-time-box {
		position: absolute;
		font-size: 59rpx;
		color: #fff;
		width: 274rpx;
		height: 82rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.65);
		border-radius: 22rpx;
	}

	.clock-time-box.select-text {
		font-size: 35rpx;
	}

	.game-number-box {
		margin-top: 47rpx;
		display: flex;
		width: 80%;
	}

	.game-number-item {
		height: 155rpx;
		width: 200rpx;
		background-size: auto 100%;
		background-repeat: no-repeat;
		transition: all 0.5s ease-in-out;
		position: relative;
	}

	.game-number-item-yes {
		width: 72rpx;
		height: 72rpx;
		position: absolute;
		right: 40rpx;
		bottom: 0;
	}

	.game-people-number {
		position: absolute;
		bottom: -50rpx;
		left: 50rpx;
		transition: all 500ms; 
	}

	.game-bobm-image {
		width: 72rpx;
		height: 72rpx;
		position: absolute;
		right: 40rpx;
		bottom: 0;
	}

	.game-number-item.number-1 {
		background-image: url("@/static/image/game/quad-pick/1.png");
	}

	.game-number-item.number-2 {
		background-image: url("@/static/image/game/quad-pick/2.png");
	}

	.game-number-item.number-3 {
		background-image: url("@/static/image/game/quad-pick/3.png");
	}

	.game-number-item.number-4 {
		background-image: url("@/static/image/game/quad-pick/4.png");
	}

	.game-number-item.number-1.active {
		background-image: url("@/static/image/game/quad-pick/1_w.png");
	}

	.game-number-item.number-2.active {
		background-image: url("@/static/image/game/quad-pick/2_w.png");
	}

	.game-number-item.number-3.active {
		background-image: url("@/static/image/game/quad-pick/3_w.png");
	}

	.game-number-item.number-4.active {
		background-image: url("@/static/image/game/quad-pick/4_w.png");
	}

	.game-number-item.bobm {
		background-image: url("@/static/image/game/quad-pick/boom.png");
		animation: bobmBounceAndScale 2s infinite;
	}

	@keyframes bobmBounceAndScale {

		0%,
		100% {
			transform: translateY(0) scale(1);
		}

		25% {
			transform: translateY(-20rpx) scale(1.2);
		}

		50% {
			transform: translateY(0) scale(1);
		}

		75% {
			transform: translateY(-20rpx) scale(1.2);
		}
	}

	.game-popup-box {
		padding: 0 60rpx;
		display: flex;
		gap: 50rpx;
		margin-top: 78rpx;
	}

	.game-popup-image {
		width: 107rpx;
		height: 60rpx;
	}

	.game-select-popup-box {
		margin-top: 58rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.game-select-popup-image {
		margin-top: 34rpx;
		height: 103rpx;
		width: 200rpx;
	}

	.game-select-button-list {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 35rpx;
		margin-top: 66rpx;
	}

	.game-select-button-item {
		width: 224rpx;
		height: 84rpx;
		background: url("@/static/image/com/btn_bg_w.png") no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.game-result-popup-text-list {
		margin-top: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28rpx;
	}

	.retult-win-text-bold {
		margin-right: 10rpx;
		color: #00eaff;
	}

	.retult-win-box {
		margin-top: 30rpx;
	}
</style>
<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="shopping-content">
			<view class="shopping-list-item shop">
				<view class="shop-tab-bar-box"> MG商城 </view>
				<view class="shop-list">
					<view class="shop-item-box">
						<image class="shop-icon-cart" src="@/static/image/shoppingMall/shopping_cart.png"></image>
					</view>
					<view class="shop-item-box">
						<view class="shop-item-title">MG Token</view>
						<image class="shop-icon-mg" src="@/static/image/shoppingMall/mg.png"></image>
						<view class="shop-item-number">X1</view>
					</view>
					<view class="shop-item-box">
						<view class="shop-item-title-big">=</view>
					</view>
					<view class="shop-item-box" @click="openPopup('buyRubyPopup')">
						<view class="shop-item-title">紅寶石</view>
						<image class="shop-icon-ruby" src="@/static/image/shoppingMall/ruby.png"></image>
						<view class="shop-item-number">X10</view>
					</view>
				</view>
				<image class="buy-now-tips" @click="openPopup('buyRubyPopup')"
					src="@/static/image/shoppingMall/now_buy.png"></image>
			</view>
			<view class="shopping-list-item tuteng">
				<view class="shop-tab-bar-box">MG圖騰</view>
				<view class="shop-tuteng-list">
					<view class="shop-tuteng-item" v-for="(item, index) in totemList" :key="index"
						@click="openPopup('buyTutengPopup',item)">
						<view class="tuteng-title">{{ item.name }}</view>
						<image class="tuteng-icon" :src="item.displayUrl" mode="aspectFit"></image>
						<view class="tuteng-text">{{ item.price }}x</view>
					</view>
				</view>
			</view>
			<view class="shopping-list-item jjdj">
				<view class="shop-tab-bar-box">競技道具</view>
				<view class="shop-tuteng-list">
					<view class="shop-tuteng-item" v-for="(item, index) in propList" :key="index"
						@click="openPopup('jjdjPopup')">
						<view class="tuteng-title">{{ item.name }}</view>
						<image class="jjdj-icon" :src="item.displayUrl" mode="aspectFit"></image>
						<view class="jjdj-text">{{ item.price }}{{ item.currency }}</view>
					</view>
				</view>
			</view>
		</view>
		<mg-popup ref="jjdjPopup" width="700rpx" height="630rpx">
			<view class="jjdj-popup-box">
				<view class="jjdj-image-list-box">
					<image class="jjdj-icon dtzy" src="@/static/image/shoppingMall/dtzy.png"></image>
					<image class="jjdj-icon lsck" src="@/static/image/shoppingMall/lsck.png"></image>
					<image class="jjdj-icon jcxd" src="@/static/image/shoppingMall/jcxd.png"></image>
				</view>
				<view class="jjdj-popup-text-box">
					<view class="jjdj-popup-text">
						<view class="jjdj-popup-text-item">競技道具的自由購買暫未開放，</view>
						<view class="jjdj-popup-text-item">在測試期，會員進行遊戲時，</view>
						<view class="jjdj-popup-text-item color-blue">可以免費使用道具。</view>
						<view class="jjdj-popup-text-item">敬請期待！</view>
					</view>
				</view>
			</view>
		</mg-popup>
		<mg-popup ref="buyRubyPopup" width="700rpx" height="660rpx">
			<view class="buy-ruby-popup-box">
				<image class="buy-ruby-popup-icon" src="@/static/image/shoppingMall/ruby.png"></image>
				<view class="popup-text-list">
					<view class="popup-text-item color-blue ruby-title">1 MGT 購買 10 紅寶石</view>
					<view class="popup-text-item">紅寶石的自由購買暫未開放， </view>
					<view class="popup-text-item">會員可以通過以下方式獲得：</view>
					<view class="popup-text-item">1、成為節點；</view>
					<view class="popup-text-item">2、向節點申請測試期試玩包；</view>
					<view class="popup-text-item">3、每日到世界樹打卡；</view>
					<view class="popup-text-item ruby-jqqd">敬請期待！</view>
				</view>
			</view>
		</mg-popup>
		<mg-popup ref="buyTutengPopup" width="700rpx" height="660rpx">
			<view class="buy-tuteng-popup-box">
				<image class="tuteng-icon" mode="aspectFit" :src="curTuTengInfo.displayUrl"></image>
				<view class="popup-text-list">
					<view class="popup-text-item  tuteng-popup-title first-tuteng-popup-text">圖騰購買價格為：</view>
					<view class="popup-text-item  tuteng-popup-title">價格係數 x 實時MGT價格</view>

					<view class="popup-text-item first-tuteng-popup-text">圖騰的自由購買暫未開放，</view>
					<view class="popup-text-item">會員可以通過以下方式獲得：</view>
					<view class="popup-text-item">成為節點得到特殊圖騰；</view>
					<view class="popup-text-item ruby-jqqd">敬請期待！</view>
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
		getShopPropList,
		getShopTotemList
	} from "../../request/api";
	export default {
		data() {
			return {
				propList: [],
				totemList: [],
				curTuTengInfo: {}
			};
		},
		computed: {
			...mapState({
				language: (state) => state.language,
			}),
		},
		onLoad(e) {
			this.onInitData();
		},
		onShow() {},
		onHide() {},
		methods: {
			onInitData() {
				getShopPropList().then((res) => {
					console.log(res);
					this.propList = res.data;
				});
				getShopTotemList().then((res) => {
					console.log(res);
					this.totemList = res.data;
				});
			},
			openPopup(popup, data) {
				if (this.$refs[popup]) {
					this.$refs[popup].open();
				}
				if (popup == 'buyTutengPopup') {
					this.curTuTengInfo = data
				}
			},
		},
	};
</script>

<style scoped>
	.shopping-list-item {
		position: relative;
	}

	.shopping-content {
		display: flex;
		flex-direction: column;
	}

	.shopping-list-item.shop {
		height: 300rpx;
		background: #ffdb7b;
		background-image: url("/static/image/com/logo_no_color.png");
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.5);
		z-index: 9;
	}

	.shopping-list-item.tuteng {
		height: 400rpx;
		background: #ffecb8;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.5);
		z-index: 8;
	}

	.shop-tab-bar-box {
		color: #fff;
		font-size: 35rpx;
		display: flex;
		align-items: center;
		padding-left: 22rpx;
		box-sizing: border-box;
		position: absolute;
		width: 205rpx;
		height: 60rpx;
		background: url("@/static/image/shoppingMall/tab_bg.png") no-repeat;
		background-size: 100% 100%;
		top: 31rpx;
	}

	.buy-now-tips {
		position: absolute;
		right: 30rpx;
		top: 35rpx;
		width: 127rpx;
		height: 100rpx;
	}

	.shop-icon-cart {
		margin-top: 30rpx;
		width: 124rpx;
		height: 118rpx;
	}

	.shop-icon-mg {
		width: 100rpx;
		height: 100rpx;
	}

	.shop-icon-ruby {
		width: 69rpx;
		height: 83rpx;
	}

	.shop-list {
		margin-left: -100rpx;
		margin-top: 70rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 50rpx;
	}

	.shop-item-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16rpx;
		position: relative;
	}

	.shop-item-title {
		width: 120rpx;
		text-align: center;
		top: -50rpx;
		position: absolute;
		font-size: 21rpx;
		font-weight: 500;
	}

	.shop-item-title-big {
		font-size: 120rpx;
		font-weight: 800;
		margin-bottom: 35rpx;
	}

	.shop-item-number {
		bottom: -60rpx;
		position: absolute;
		font-size: 42rpx;
		font-weight: bolder;
		color: #000000;
	}

	.shop-tuteng-list {
		margin-top: 120rpx;
		display: flex;
		align-items: center;
		overflow-x: auto;
		overflow-y: hidden;
		white-space: nowrap;
		padding: 0 40rpx;
		scrollbar-width: none;
		-ms-overflow-style: none;
		position: relative;
	}

	.shop-tuteng-list::-webkit-scrollbar {
		display: none;
	}

	.shop-tuteng-item {
		min-width: 120rpx;
		margin-right: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
	}

	.shop-tuteng-item:last-child {
		margin-right: 0;
	}

	.tuteng-icon {
		margin-top: 10rpx;
		width: 79rpx;
		height: 120rpx;
	}

	.tuteng-text,
	.jjdj-text {
		margin-top: 20rpx;
		width: 120rpx;
		height: 35rpx;
		background: #000000;
		border-radius: 18rpx;
		padding: 0 21rpx;
		box-sizing: border-box;
		color: #fff;
		font-size: 22rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.shop-jjdj-list {
		margin-top: 186rpx;
		display: flex;
		align-items: center;
		gap: 76rpx;
		padding: 0 40rpx;
	}

	.shop-jjdj-item {
		position: relative;
		width: 140rpx;
		height: 140rpx;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.jjdj-title {
		width: 160rpx;
		position: absolute;
		top: -30rpx;
		text-align: center;
	}

	.jjdj-icon {
		margin-top: 30rpx;
		width: 107rpx;
		height: 60rpx;
	}

	.jjdj-image-list-box {
		margin-top: 66rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 80rpx;
	}

	.jjdj-popup-text {
		margin-top: 76rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28rpx;
		color: #fff;
	}

	.jjdj-popup-text-item {
		width: 400rpx;
	}

	.color-blue {
		color: #00eaff;
		margin-bottom: 32rpx;
	}

	.buy-ruby-popup-box,
	.buy-tuteng-popup-box {
		margin-top: 48rpx;
		display: flex;
		align-items: center;
		/* justify-content: center; */
		flex-direction: column;
	}

	.buy-ruby-popup-icon {
		width: 71rpx;
		height: 85rpx;
	}

	.popup-text-list {
		font-size: 28rpx;
		font-weight: 600;
		color: #fff;
	}

	.ruby-title {
		font-size: 35rpx;
		margin-top: 30rpx;
	}

	.ruby-jqqd {
		margin-top: 32rpx;
	}

	.first-tuteng-popup-text {
		margin-top: 32rpx;
	}

	.tuteng-popup-title {
		font-size: 35rpx;
		color: #00eaff;
		text-align: center;
	}
</style>
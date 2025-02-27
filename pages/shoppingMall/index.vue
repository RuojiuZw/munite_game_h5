<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="shopping-content">
			<view class="shopping-list-item shop">
				<view class="shop-tab-bar-box">
					MG商城
				</view>
				<view class="shop-list">
					<view class="shop-item-box">
						<image class="shop-icon-cart" src="/static/image/shoppingMall/shopping_cart.png"></image>
					</view>
					<view class="shop-item-box">
						<view class="shop-item-title">MG Token</view>
						<image class="shop-icon-mg" src="/static/image/shoppingMall/mg.png"></image>
						<view class="shop-item-number">X1</view>
					</view>
					<view class="shop-item-box">
						<view class="shop-item-title-big">=</view>
					</view>
					<view class="shop-item-box">
						<view class="shop-item-title">红宝石</view>
						<image class="shop-icon-ruby" src="/static/image/shoppingMall/ruby.png"></image>
						<view class="shop-item-number">X10</view>
					</view>
				</view>
				<image class="buy-now-tips" src="/static/image/shoppingMall/now_buy.png"></image>
			</view>
			<view class="shopping-list-item tuteng">
				<view class="shop-tab-bar-box">
					MG图腾
				</view>
				<view class="shop-tuteng-list">
					<view class="shop-tuteng-item">
						<view class="tuteng-title">阿鲁呼呼</view>
						<image class="tuteng-icon alhh" src="/static/image/shoppingMall/alhh.png"></image>
						<view class="tuteng-text">60x</view>
					</view>
					<view class="shop-tuteng-item">
						<view class="tuteng-title">哒嗉哩哩</view>
						<image class="tuteng-icon dsll" src="/static/image/shoppingMall/dsll.png"></image>
						<view class="tuteng-text">100x</view>
					</view>
					<view class="shop-tuteng-item">
						<view class="tuteng-title">咇折斯里</view>
						<image class="tuteng-icon szsl" src="/static/image/shoppingMall/szsl.png"></image>
						<view class="tuteng-text">200x</view>
					</view>
					<view class="shop-tuteng-item">
						<view class="tuteng-title">蒙呐多哈</view>
						<image class="tuteng-icon mndh" src="/static/image/shoppingMall/mndh.png"></image>
						<view class="tuteng-text">400x</view>
					</view>
				</view>
			</view>
			<view class="shopping-list-item jjdj">
				<view class="shop-tab-bar-box">
					竞技道具
				</view>
				<view class="shop-jjdj-list">
					<view class="shop-jjdj-item">
						<view class="jjdj-title">灯塔之眼</view>
						<image class="jjdj-icon dtzy" src="/static/image/shoppingMall/dtzy.png"></image>
						<view class="jjdj-text">30Usdt</view>
					</view>
					<view class="shop-jjdj-item">
						<view class="jjdj-title">历史查看</view>
						<image class="jjdj-icon lsck" src="/static/image/shoppingMall/lsck.png"></image>
						<view class="jjdj-text">30Usdt</view>
					</view>
					<view class="shop-jjdj-item">
						<view class="jjdj-title">解除限定</view>
						<image class="jjdj-icon jcxd" src="/static/image/shoppingMall/jcxd.png"></image>
						<view class="jjdj-text">30Usdt</view>
					</view>
				</view>
			</view>
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
	.shopping-list-item {
		position: relative;
	}

	.shopping-content {
		display: flex;
		flex-direction: column;
	}

	.shopping-list-item.shop {
		height: 300rpx;
		background: #FFDB7B;
		background-image: url("/static/image/com/logo_no_color.png");
		background-size: auto 100%;
		background-repeat: no-repeat;
		background-position: 50% 50%;
		box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.5);
		z-index: 9;
	}

	.shopping-list-item.tuteng {
		height: 400rpx;
		background: #FFECB8;
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
		margin-top: 180rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 97rpx;
		position: relative;
	}

	.shop-tuteng-item {
		display: flex;
		flex-direction: column;
		align-items: center;

	}

	.tuteng-icon.alhh {
		width: 79rpx;
		height: 118rpx;
	}

	.tuteng-icon.dsll {
		width: 93rpx;
		height: 119rpx;
	}

	.tuteng-icon.szsl {
		width: 83rpx;
		height: 118rpx;
	}

	.tuteng-icon.mndh {
		width: 79rpx;
		height: 108rpx;
	}

	.tuteng-title {
		position: absolute;
		top: -50rpx;
	}

	.tuteng-text,
	.jjdj-text {
		width: 120rpx;
		height: 35rpx;
		background: #000000;
		border-radius: 18rpx;
		padding: 0 21rpx;
		box-sizing: border-box;
		color: #fff;
		position: absolute;
		bottom: -70rpx;
		font-size: 22rpx;
		display: flex;
		align-items: center;
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
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.jjdj-title {
		width: 160rpx;
		position: absolute;
		top: -30rpx;
		text-align: center;
	}

	.jjdj-icon.dtzy {
		width: 107rpx;
		height: 60rpx;
	}

	.jjdj-icon.lsck {
		width: 106rpx;
		height: 54rpx;
	}

	.jjdj-icon.jcxd {
		width: 78rpx;
		height: 81rpx;
	}

	.jjdj-text {
		bottom: -30rpx;
	}
</style>
<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="my-page-tab">
			<view class="my-page-tab-list">
				<view class="my-page-tab-item" @click="onClickTab(0)">
					<image class="my-page-icon icon-bb" src="/static/image/myPage/bb.png"></image>
					<view class="my-page-title">
						背包
					</view>
				</view>
				<view class="my-page-tab-item" @click="onClickTab(1)">
					<image class="my-page-icon icon-td" src="/static/image/myPage/td.png"></image>
					<view class="my-page-title">
						团队
					</view>
				</view>
				<view class="my-page-tab-item" @click="onClickTab(2)">
					<image class="my-page-icon icon-dh" src="/static/image/myPage/dh.png"></image>
					<view class="my-page-title">
						兑换
					</view>
				</view>
				<view class="my-page-tab-item" @click="onClickTab(3)">
					<image class="my-page-icon icon-zh" src="/static/image/myPage/zh.png"></image>
					<view class="my-page-title">
						账户
					</view>
				</view>
			</view>
		</view>
		<view class="my-backpack" v-if="curIndex == 0">
			<view class="backpack-item">
				<image class="backpack-add-icon" src="@/static/image/myPage/add-icon.png"></image>
				<view class="backpack-text"></view>
			</view>
			<view class="backpack-item">
				<image class="backpack-add-icon ruby" src="@/static/image/shoppingMall/ruby.png"></image>
				<view class="backpack-text">5285287</view>
			</view>
			<view class="backpack-item">
				<image class="backpack-add-icon alhh" src="@/static/image/shoppingMall/alhh.png"></image>
				<view class="backpack-text">123</view>
			</view>
			<view class="backpack-item">
				<image class="backpack-add-icon lsck" src="@/static/image/shoppingMall/lsck.png"></image>
				<view class="backpack-text">123</view>
			</view>
			<view class="backpack-item">
				<image class="backpack-add-icon dtzy" src="@/static/image/shoppingMall/dtzy.png"></image>
				<view class="backpack-text">231</view>
			</view>
			<view class="backpack-item">
				<image class="backpack-add-icon jcxd" src="@/static/image/shoppingMall/jcxd.png"></image>
				<view class="backpack-text">213</view>
			</view>
			<view class="backpack-item">
			</view>
			<view class="backpack-item">
			</view>
			<view class="backpack-item">
			</view>
			<view class="backpack-item">
			</view>
			<view class="backpack-item">
			</view>
			<view class="backpack-item">
			</view>


		</view>

		<view class="my-team" v-if="curIndex == 1">
			<view class="my-team-top-box">
				<view class="my-team-top-list">
					<view class="my-team-top-item">
						<view class="my-team-top-label">伞下会员</view>
						<view class="my-team-top-text">12313123132</view>
					</view>
					<view class="my-team-top-item">
						<view class="my-team-top-label">昨日活跃</view>
						<view class="my-team-top-text">135489</view>
					</view>
				</view>
				<view class="my-team-top-list">
					<view class="my-team-top-item">
						<view class="my-team-top-label">管理分数</view>
						<view class="my-team-top-text">12313123132</view>
					</view>
					<view class="my-team-top-item">
						<view class="my-team-top-label">账号级别</view>
						<view class="my-team-top-text">135489</view>
					</view>
				</view>
				<view class="my-team-top-list">
					<view class="my-team-top-item">
						<view class="my-team-top-label">管理激励</view>
						<view class="my-team-top-text">12313123132</view>
					</view>
					<view class="my-team-top-item">
						<view class="my-team-top-label">昨日激励</view>
						<view class="my-team-top-text">135489</view>
					</view>
				</view>
			</view>
			<view class="my-team-bottom-box">
				<view class="team-table">
					<view class="team-table-title">
						<view class="team-table-list-item item-1"></view>
						<view class="team-table-list-item item-2">级别</view>
						<view class="team-table-list-item item-3">会员总数</view>
						<view class="team-table-list-item item-4">昨日活跃</view>
					</view>
					<view class="team-table-list" v-for="(item,index) in 5" :key="index"
						:class="index%2==0?'':'color-bg'">
						<view class="team-table-list-item item-1">爱吃鱼的{{index}}火爱吃鱼的火爱吃鱼的火…</view>
						<view class="team-table-list-item item-2">L2</view>
						<view class="team-table-list-item item-3">12321321312312321</view>
						<view class="team-table-list-item item-4">312</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-exchange" v-if="curIndex == 2">
			<view class="my-exchange-title">请输入您的兑换码</view>
			<input class="my-exchange-input" type="text" value="qwe" />
			<view class="my-exchange-button">兑换</view>
		</view>
		<view class="my-userinfo" v-if="curIndex == 4">
			账户
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
			return {
				curIndex: 0
			}
		},
		computed: {
			...mapState({
				language: state => state.language
			}),
		},
		onLoad(e) {},
		onShow() {},
		onHide() {},
		methods: {
			onClickTab(type) {
				this.curIndex = type
			}
		}
	}
</script>

<style scoped>
	.my-page-tab {
		padding: 45rpx 0;
		background: #FFDB7B;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.5);
		position: relative;
		z-index: 9;
	}

	.my-page-tab-list {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 58rpx;
	}

	.my-page-icon.icon-bb {
		width: 92rpx;
		height: 108rpx;
	}

	.my-page-icon.icon-td {
		width: 122rpx;
		height: 102rpx;
	}

	.my-page-icon.icon-dh {
		width: 121rpx;
		height: 102rpx;
	}

	.my-page-icon.icon-zh {
		width: 102rpx;
		height: 101rpx;
	}

	.my-page-tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.my-page-title {
		margin-top: 18rpx;
		font-size: 28rpx;
		color: #000000;
		text-align: center;
	}

	.my-backpack {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 70rpx 27rpx;
	}

	.backpack-item {
		margin-bottom: 50rpx;
		width: 168rpx;
		height: 185rpx;
		background: url("/static/image/myPage/backpack-bg.png") no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.backpack-text {
		position: absolute;
		bottom: 5rpx;
		font-size: 28rpx;
		color: #000000;
	}

	.backpack-add-icon {
		width: 70rpx;
		height: 70rpx;
		margin-bottom: 20rpx;
	}

	.backpack-add-icon.ruby {
		width: 69rpx;
		height: 83rpx;
	}

	.backpack-add-icon.alhh {
		width: 63rpx;
		height: 95rpx;
	}

	.backpack-add-icon.lsck {
		width: 106rpx;
		height: 54rpx;
	}

	.backpack-add-icon.dtzy {
		width: 107rpx;
		height: 60rpx;
	}

	.backpack-add-icon.jcxd {
		width: 78rpx;
		height: 81rpx;
	}

	.my-team-top-box {
		padding: 50rpx 0;
		background: #FFECB8;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		gap: 42rpx;
	}

	.my-team-top-list {
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.my-team-top-item {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: 31rpx;
	}

	.my-team-top-label {
		font-size: 35rpx;
		color: #000000;
	}

	.my-team-top-text {
		font-size: 21rpx;
		color: #000000;
	}

	.my-team-bottom-box {
		margin: 45rpx 41rpx;
		border-radius: 20rpx 20rpx 0 0;
		background: #fff;
	}

	.team-table-title {
		display: flex;
		height: 51rpx;
		gap: 30rpx;
		background: #FF9C00;
		border-radius: 20rpx 20rpx 0 0;
		color: #fff;
		align-items: center;
	}

	.team-table-list {
		display: flex;
		align-items: center;
		height: 80rpx;
		gap: 30rpx;
	}

	.team-table-list.color-bg {
		background: #FFECB8;
	}

	.team-table-list-item {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		-o-text-overflow: ellipsis;
	}

	.team-table-list .team-table-list-item {
		font-weight: 600;
		font-size: 21rpx;
	}

	.team-table-list .team-table-list-item.item-1 {
		font-size: 28rpx;
	}

	.team-table-list-item.item-1 {
		width: 180rpx;
		padding: 0 26rpx;
	}

	.team-table-list-item.item-2 {
		text-align: center;
		width: 60rpx;
	}

	.team-table-list-item.item-3 {
		width: 120rpx;
	}

	.team-table-list-item.item-4 {
		text-align: center;
		width: 120rpx;
	}

	.my-exchange {
		display: flex;
		flex-direction: column;
		margin-top: 95rpx;
		align-items: center;
	}

	.my-exchange-title {
		font-size: 35rpx;
		font-weight: 600;
		text-align: center;
	}

	.my-exchange-input {
		padding: 10rpx 35rpx;
		font-size: 35rpx;
		margin-top: 160rpx;
		width: 400rpx;
		border-bottom: 1rpx solid #000;
	}

	.my-exchange-button {
		margin-top: 100rpx;
		width: 223rpx;
		height: 83rpx;
		background: url("/static/image/com/btn_bg.png") no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 35rpx;
		color: #000000;
	}
</style>
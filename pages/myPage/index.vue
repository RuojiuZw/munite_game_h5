<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="my-page-tab">
			<view class="my-page-tab-list">
				<view class="my-page-tab-item" @click="onClickTab(0)">
					<image class="my-page-icon icon-bb" src="@/static/image/myPage/bb.png"></image>
					<view class="my-page-title"> 背包 </view>
				</view>
				<view class="my-page-tab-item" @click="onClickTab(1)">
					<image class="my-page-icon icon-td" src="@/static/image/myPage/td.png"></image>
					<view class="my-page-title"> 團隊 </view>
				</view>
				<view class="my-page-tab-item" @click="onClickTab(2)">
					<image class="my-page-icon icon-dh" src="@/static/image/myPage/dh.png"></image>
					<view class="my-page-title"> 兌換 </view>
				</view>
				<view class="my-page-tab-item" @click="onClickTab(3)">
					<image class="my-page-icon icon-zh" src="@/static/image/myPage/zh.png"></image>
					<view class="my-page-title"> 賬戶 </view>
				</view>
			</view>
		</view>
		<view class="my-backpack" v-if="curIndex == 0">
			<view class="backpack-list-box">
				<view class="backpack-item">
					<image class="backpack-add-icon" src="@/static/image/myPage/add-icon.png"></image>
					<view class="backpack-text"></view>
				</view>
				<view class="backpack-item" v-for="(item, index) in bagList" :key="index" @click="onBagItem(item)">
					<image class="backpack-add-icon" mode="aspectFit" :src="item.displayUrl"></image>
					<view class="backpack-text">{{item.stackCount}}</view>
				</view>
				<view class="backpack-item" v-for="item in nullBoxNum" :key="item">
				</view>
			</view>
		</view>

		<view class="my-team" v-if="curIndex == 1">
			<view class="my-team-top-box">
				<view class="my-team-top-list">
					<view class="my-team-top-item">
						<view class="my-team-top-label">伞下会员</view>
						<view class="my-team-top-text">{{
              teamInfo.subMemberCount || 0
            }}</view>
					</view>
					<view class="my-team-top-item">
						<view class="my-team-top-label">昨日活跃</view>
						<view class="my-team-top-text">{{
              teamInfo.yesterdayActiveCount || 0
            }}</view>
					</view>
				</view>
				<view class="my-team-top-list">
					<view class="my-team-top-item">
						<view class="my-team-top-label">管理分数</view>
						<view class="my-team-top-text">{{ teamInfo.experience || 0 }}</view>
					</view>
					<view class="my-team-top-item">
						<view class="my-team-top-label">账号级别</view>
						<view class="my-team-top-text">{{ teamInfo.levelName || 0 }}</view>
					</view>
				</view>
				<view class="my-team-top-list">
					<view class="my-team-top-item">
						<view class="my-team-top-label">管理激励</view>
						<view class="my-team-top-text">{{
              teamInfo.totalMotivateAmount || 0
            }}</view>
					</view>
					<view class="my-team-top-item">
						<view class="my-team-top-label">昨日激励</view>
						<view class="my-team-top-text">{{
              teamInfo.yesterdayMotivateAmount || 0
            }}</view>
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
					<view class="team-table-list no-data-text" v-if="teamInfo.directlyMemberList.length ==0">
						暂无数据
					</view>
					<view class="team-table-list" v-for="(item, index) in teamInfo.directlyMemberList" :key="index"
						:class="index % 2 == 0 ? '' : 'color-bg'">
						<view class="team-table-list-item item-1">{{ item.nickname }}</view>
						<view class="team-table-list-item item-2">{{
              item.levelName
            }}</view>
						<view class="team-table-list-item item-3">{{
              item.subMemberCount
            }}</view>
						<view class="team-table-list-item item-4">{{ item.yesterdayActiveCount }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="my-exchange" v-if="curIndex == 2">
			<view class="my-exchange-title">请输入您的兑换码</view>
			<input class="my-exchange-input" type="text" v-model="exchangeCode" />
			<view class="my-exchange-button" @click="onExchangeCode">兑换</view>
		</view>
		<view class="my-userinfo" v-if="curIndex == 3">
			<view class="my-userinfo-top-box">
				<view class="user-data-list-box">
					<view class="user-data-item-box">
						<view class="user-data-item-label">遊戲局數</view>
						<view class="user-data-item-text">{{userInfo.totalGames}}</view>
					</view>
					<view class="user-data-item-box">
						<view class="user-data-item-label">勝利局數</view>
						<view class="user-data-item-text">{{userInfo.wins}}</view>
					</view>
				</view>
				<view class="user-data-list-box">
					<view class="user-data-item-box">
						<view class="user-data-item-label">失敗局數</view>
						<view class="user-data-item-text">{{userInfo.losses}}</view>
					</view>
					<view class="user-data-item-box">
						<view class="user-data-item-label">賬號級別</view>
						<view class="user-data-item-text">{{userInfo.level && userInfo.level.name}}</view>
					</view>
				</view>
			</view>
			<view class="my-userinfo-copy-box">
				<view class="my-userinfo-copy-item">
					<view class="my-userinfo-copy-item-text">
						<view> 我的邀請碼: </view>
						<image @click="copyText(userInfo.inviteCode)" class="my-userinfo-copy-image"
							src="/static/image/com/copy-icon.png"></image>
					</view>
					<view class="my-userinfo-copy-text">{{ userInfo.inviteCode }}</view>
				</view>
				<view class="my-userinfo-copy-item">
					<view class="my-userinfo-copy-item-text">
						<view> 我的邀請鏈接: </view>
						<image @click="copyText(userInfo.inviteUrl)" class="my-userinfo-copy-image"
							src="/static/image/com/copy-icon.png"></image>
					</view>
					<view class="my-userinfo-copy-text">{{ userInfo.inviteUrl }}</view>
				</view>
			</view>
			<view class="button-box">
				<view class="logout-button" @click="onLogout">退出登錄</view>
			</view>
		</view>
		<view class="popup-list">
			<mg-popup ref="bagRubyPopup" class="bag-ruby-popup" width="700rpx" height="630rpx">
				<view class="bag-ruby-box">
					<view class="bag-top-title">您當前擁有</view>
					<image class="bag-ruby-image" mode="aspectFit" :src="openItem.displayUrl"></image>
					<view class="bag-ruby-number-text">{{openItem.stackCount}}</view>
					<view class="bag-ruby-bili-text">兌換比例：12.5籌碼=1 MG Token</view>
					<view class="bag-ruby-text-list">
						<view>MGT發行後，即刻開放紅寶石兌換，</view>
						<view>敬請期待！</view>
					</view>
				</view>
			</mg-popup>
			<mg-popup ref="bagTotemPopup" class="bag-totem-popup" width="700rpx" height="720rpx">
				<view class="bag-totem-box">
					<div class="bag-totem-top-box">
						<image class="bag-totem-top-image" mode="aspectFit" :src="openItem.displayUrl"></image>
						<view class="bag-totem-top-text-list">
							<view class="bag-totem-top-text-item big">利古里古</view>
							<view class="bag-totem-top-text-item">每日生產：{{0}}</view>
							<view class="bag-totem-top-text-item">生產週期：{{openItem.maxUsageCount}}天</view>
							<view class="bag-totem-top-text-item">總生產量：{{openItem.maxRubyReserve}}</view>
							<view class="bag-totem-top-text-item">已用天數：{{openItem.usedCount}}天</view>
							<view class="bag-totem-top-text-item">剩餘天數：{{openItem.leftUsageCount}}天</view>
							<view class="bag-totem-top-text-item">剩餘產量：{{openItem.leftRubyReserve}}</view>
							<view class="bag-totem-top-text-item">購買價格：{{openItem.buyPrice}}U</view>
						</view>
					</div>
					<view class="button-box totem-popup">
						<view class="popup-button" @click="onEquipTotem()">安装</view>
					</view>
				</view>
			</mg-popup>
			<mg-popup ref="bagTotemErrorPopup" class="bag-totem-error-popup" width="700rpx" height="630rpx">
				<view class="bag-totem-box">
					<div class="bag-totem-top-box bag-totem-error-top-box">
						<image class="bag-totem-top-image" mode="aspectFit" :src="openItem.displayUrl"></image>
						<view class="bag-totem-top-text-list">
							<view class="bag-totem-top-text-item">您的世界樹裡已經有其他圖騰存在，</view>
							<view class="bag-totem-top-text-item">請先去世界樹卸載圖騰再行安裝。</view>
						</view>
					</div>
					<view class="button-box totem-popup">
						<view class="popup-button" @click="closePopup('bagTotemErrorPopup')">確認</view>
					</view>
				</view>
			</mg-popup>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from "vuex"; //引入mapState
	import {
		equipTotem,
		getMyBagData,
		getTeamInfo,
		redeemItem
	} from "../../request/api";
	export default {
		data() {
			return {
				curIndex: 0,
				bagData: {},
				bagList: [],
				nullBoxNum: 3,
				openItem: {},
				teamInfo: {
					directlyMemberList: [],
				},
				exchangeCode: "",
			};
		},
		computed: {
			...mapState({
				userInfo: (state) => state.web3.userInfo,
				tokenInfo: (state) => state.web3.tokenInfo,
			}),

		},
		onLoad(e) {
			this.onInitData();
		},
		onShow() {},
		onHide() {},
		methods: {
			...mapActions("web3", ["onLogout"]),
			httpGetTeamInfo() {
				getTeamInfo().then((res) => {
					console.log(res.data);
					this.teamInfo = res.data;
				});
			},
			onBagItem(item) {
				this.openItem = item;
				console.log(item)
				switch (item.itemClass) {
					// 图腾
					case 1:
						this.openPopup('bagTotemPopup')
						break;
						// 货币
					case 2:
						this.openPopup("bagRubyPopup")
						break;
						// 道具
					case 3:
						break;
						// 碎片
					case 4:
						break;
				}
			},
			onEquipTotem() {
				console.log(this.openItem)
				equipTotem({
					id: this.openItem.id
				}).then(res => {
					uni.showToast({
						title: "安裝成功!",
						icon: "none"
					})
					this.closePopup("bagTotemPopup")
				}).catch(err => {
					if (err.data.code == 2001001001) {
						this.openPopup("bagTotemErrorPopup", "bagTotemPopup")
					}
				})
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
			onInitData() {
				this.httpGetMyBagData();
			},
			httpGetMyBagData() {
				getMyBagData().then((res) => {
					if (res.data) {
						this.bagData = res.data;
						this.bagList = res.data.itemList;
						let len = this.bagList.length
						this.nullBoxNum = parseInt(this.bagData.maxSlotCount - len)
					}
				});
			},
			copyText(e) {
				uni.setClipboardData({
					data: e,
					success: () => {
						uni.showToast({
							title: "複製成功",
							icon: "none",
						});
					},
					fail: (res) => {
						console.log(res);
						uni.showToast({
							title: "複製失敗",
							icon: "none",
						});
					},
				});
			},
			onExchangeCode() {
				if (
					!this.exchangeCode ||
					this.exchangeCode == "" ||
					this.exchangeCode.trim() == ""
				) {
					uni.showToast({
						title: "請先輸入兌換碼!",
						icon: "none",
					});
					return;
				}
				redeemItem({
						redeemCode: this.exchangeCode,
					})
					.then((res) => {
						uni.showToast({
							title: "兌換成功",
							icon: "none",
						});
					})
					.catch((err) => {
						uni.showToast({
							title: err.data.msg,
							icon: "none",
						});
					});
			},
			onClickTab(type) {
				this.curIndex = type;
				switch (type) {
					case 0:
						this.httpGetMyBagData();
						break;
					case 1:
						this.httpGetTeamInfo();
						break;
					default:
						break;
				}
			},
		},
	};
</script>

<style scoped>
	page {
		background-color: #ffecb8;
	}

	.my-page-tab {
		padding: 45rpx 0;
		background: #ffdb7b;
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

	.backpack-list-box {
		display: flex;
		flex-wrap: wrap;
		gap: 6rpx;
	}

	.my-backpack {
		padding: 70rpx 27rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
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
		width: 100rpx;
		height: 80rpx;
		margin-bottom: 20rpx;
	}

	.my-team-top-box {
		padding: 50rpx 0;
		background: #ffecb8;
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
		background: #ff9c00;
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
	.no-data-text{
		text-align: center;
		justify-content: center;
	}

	.team-table-list.color-bg {
		background: #fbe29d;
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

	.my-userinfo-top-box {
		padding: 40rpx 0;
		display: flex;
		flex-direction: column;
	}

	.user-data-list-box {
		padding: 20rpx 0;
		display: flex;
		color: #000000;
	}

	.user-data-item-box {
		flex: 1;
		display: flex;
		align-items: flex-end;
		justify-content: center;
	}

	.user-data-item-label,
	.user-data-item-text {
		font-weight: 600;
		flex: 1;
	}

	.user-data-item-label {
		font-size: 35rpx;
		text-align: right;
	}

	.user-data-item-text {
		line-height: 30rpx;
		margin-left: 30rpx;
		font-size: 21rpx;
		text-align: left;
	}

	.my-userinfo-copy-box {
		margin-top: 100rpx;
		padding: 0 50rpx;
		font-size: 35rpx;
		font-weight: 600;
		color: #000000;
	}

	.my-userinfo-copy-item {
		margin-bottom: 30rpx;
	}

	.my-userinfo-copy-item-text {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.my-userinfo-copy-image {
		width: 30rpx;
		height: 31rpx;
	}

	.my-userinfo-copy-text {
		margin-top: 30rpx;
		word-wrap: break-word;
		font-size: 21rpx;
	}

	.button-box {
		margin-top: 130rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logout-button {
		width: 223rpx;
		height: 83rpx;
		background: url("/static/image/com/btn_bg.png") no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 35rpx;
	}

	.popup-button {
		width: 223rpx;
		height: 83rpx;
		background: url("/static/image/com/btn_bg_w.png") no-repeat;
		background-size: 100% 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 35rpx;
	}

	.bag-ruby-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.bag-ruby-image {
		width: 100rpx;
		height: 80rpx;
	}

	.bag-top-title {
		margin-top: 35rpx;
		font-size: 28rpx;
		font-weight: 600;
		margin-bottom: 30rpx;
	}

	.bag-ruby-number-text {
		margin-top: 33rpx;
		font-size: 70rpx;
		font-weight: 600;
		margin-bottom: 42rpx;
	}

	.bag-ruby-bili-text {
		color: #00eaff;
		font-size: 28rpx;
		margin-bottom: 44rpx;
	}

	.bag-ruby-text-list {
		font-size: 28rpx;
		text-align: center;
	}

	.bag-totem-top-box {
		margin-top: 66rpx;
		display: flex;
		justify-content: center;
		gap: 74rpx;
	}

	.bag-totem-error-top-box {
		flex-direction: column;
		align-items: center;
	}

	.bag-totem-top-image {
		width: 80rpx;
		height: 120rpx;
	}

	.bag-totem-top-text-item {
		font-weight: 600;
		font-size: 28rpx;
	}

	.bag-totem-top-text-item.big {
		font-size: 42rpx;
		margin-bottom: 30rpx;
	}

	.totem-popup {
		margin-top: 60rpx;
	}
</style>
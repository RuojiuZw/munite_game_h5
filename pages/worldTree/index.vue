<template>
	<view class="index-page">
		<top-login-bar></top-login-bar>
		<view class="world-tree-top-box">
			<view class="left-tree-box">
				<view class="top-tree-number-box">{{
          treeInfo.rubyDailyAmountByDebris || 0
        }}</view>
				<view class="top-tree-image-box" @click="onClickFragmentInfo()">
					<image class="top-tree-image" src="@/static/image/worldTree/gemstone-icon.png" />
				</view>
			</view>
			<view class="content-tree-box" v-if="totemInfo.name" @click="openPopup('contentTotemPopup')">
				<image class="content-tree-ruby-image" src="/static/image/shoppingMall/ruby.png"></image>
				<view class="content-tree-totem-title">
					{{totemInfo.dailyRubyAmount}}/D
				</view>
				<image class="content-tree-image-totem" mode="aspectFit" :src="totemInfo.displayUrl" />
				<view class="content-tree-totem-title right">
					{{totemInfo.leftUsageCount}}/{{totemInfo.maxUsageCount}}
				</view>
			</view>
			<view class="content-tree-box" v-else  @click="openPopup('airdropGiftPopup')">
				<image class="content-tree-image" mode="aspectFit" src="@/static/image/worldTree/world-tree-add.png" />
			</view>

			<view class="right-tree-box">
				<view class="top-tree-number-box">{{
          treeInfo.claimedRubyAmount || 0
        }}</view>
				<view class="top-tree-image-box" @click="openPopup('rubyInfoPopup')">
					<image class="top-tree-image" src="@/static/image/worldTree/gemstone-icon-active.png" />
				</view>
			</view>
		</view>
		<view class="world-tree-bottom-box">
			<image class="bottom-tree-image" src="@/static/image/worldTree/world-tree-icon.png" />
			<view class="bottom-tree-text-box">
				<view class="bottom-tree-text">
					世界樹是一組丟棄權限的智能合約，在將來
					MGT的遊戲世界中，世界樹通過智能算法，
					自動的實現對MGT的市值管理和遊戲世界的數值均衡。
				</view>
				<view class="bottom-tree-text">目前世界樹暫未開放，敬請期待。 </view>
			</view>
		</view>
		<view class="popup-list">
			<mg-popup ref="rubyInfoPopup" class="ruby-info-popup" width="720rpx" height="680rpx">
				<view class="ruby-info-box">
					<view class="ruby-image-box">
						<image class="ruby-image" src="@/static/image/shoppingMall/ruby.png"></image>
						<view class="ruby-info-text">{{
              treeInfo.claimedRubyAmount || 0
            }}</view>
					</view>
					<view class="popup-info-text-list-box">
						<view class="ruby-info-text-list-item">
							<view class="ruby-info-text-list-item-text">總產量:</view>
							<view class="ruby-info-text-list-item-number">{{
                treeInfo.rubyDailyAmountByTotem +
                  treeInfo.rubyDailyAmountByDebris || 0
              }}</view>
						</view>
						<view class="ruby-info-text-list-item">
							<view class="ruby-info-text-list-item-text">圖騰日產:</view>
							<view class="ruby-info-text-list-item-number">{{
                treeInfo.rubyDailyAmountByTotem || 0
              }}</view>
						</view>
						<view class="ruby-info-text-list-item">
							<view class="ruby-info-text-list-item-text">碎片釋放:</view>
							<view class="ruby-info-text-list-item-number">{{
                treeInfo.rubyDailyAmountByDebris || 0
              }}</view>
						</view>
					</view>
					<view class="popup-button-box" @click="openPopup('rubyConfirmPopup', 'rubyInfoPopup')">
						領取紅寶石
					</view>
				</view>
			</mg-popup>
			<mg-popup ref="rubyConfirmPopup" class="ruby-confirm-popup" width="720rpx" height="600rpx">
				<view class="popup-tips-box">
					<view class="popup-tips-title">您是否領取採集區的全部紅寶石？</view>
					<view class="popup-tips-text">
						注：領取後紅寶石將發放至您的背包請注意查收
					</view>
				</view>
				<view class="ruby-info-box">
					<view class="popup-button-box" @click="httpReceiveCollectionRuby()">
						確認
					</view>
				</view>
			</mg-popup>
			<mg-popup ref="fragmentInfoPopup" class="fragment-info-popup" width="720rpx" height="560rpx">
				<view class="fragment-info-box">
					<view class="fragment-info-text-list-box">
						<image class="fragment-info-image" src="@/static/image/worldTree/gemstone-icon.png"></image>
						<view class="fragment-info-text-list-item">
							<view class="fragment-info-text-list-item-text">共計碎片:</view>
							<view class="fragment-info-text-list-item-number">{{
                debrisData.total || 0
              }}</view>
							<view class="fragment-info-text-list-item-text right-text">個</view>
						</view>
						<view class="fragment-info-text-list-item">
							<view class="fragment-info-text-list-item-text">每日釋放:</view>
							<view class="fragment-info-text-list-item-number">{{
                debrisData.dailyAmount || 0
              }}</view>
							<view class="fragment-info-text-list-item-text right-text">紅寶石</view>
						</view>
						<view class="fragment-info-text-list-item">
							<view class="fragment-info-text-list-item-text">剩餘釋放:</view>
							<view class="fragment-info-text-list-item-number">{{
                debrisData.leftRubyReserve || 0
              }}</view>
							<view class="fragment-info-text-list-item-text right-text">紅寶石</view>
						</view>
					</view>
					<view class="popup-button-box" @click="openPopup('debrisListPopup', 'fragmentInfoPopup')">
						查看列表
					</view>
				</view>
			</mg-popup>
			<mg-popup ref="debrisListPopup" class="debris-list-popup" width="720rpx" height="630rpx">
				<view class="fragment-info-box">
					<view class="debris-list-box">
						<view class="debris-list-item" v-for="(item, index) in showList" :key="index">
							<image class="debris-list-item-image" :src="item.displayUrl"></image>
							<view class="debris-list-item-text-list">
								<view class="debris-list-item-text">每日釋放：{{ item.dailyAmount }}</view>
								<view class="debris-list-item-text">剩餘釋放：{{ item.leftRubyReserve }}</view>
								<view class="debris-list-item-text">{{
                  formatDate(item.createTime, "MM/DD HH:mm:ss")
                }}</view>
							</view>
						</view>
					</view>
					<view class="debris-list-popup-page-box">
						<image @click="onChangePageUp()" class="debris-list-popup-page-image"
							src="@/static/image/com/arrow_left.png"></image>
						<view class="debris-list-popup-page-size">{{ page }}/{{maxPage}}</view>
						<image @click="onChangePageDown()" class="debris-list-popup-page-image"
							src="@/static/image/com/arrow_right.png"></image>
					</view>
				</view>
			</mg-popup>

			<mg-popup ref="contentTotemPopup" class="content-totem-popup" width="720rpx" height="630rpx">
				<view class="totem-popup-box">
					<view class="content-totem-box">
						<image class="content-totem-popup-image" :src="totemInfo.displayUrl" mode="aspectFit"></image>
						<view class="content-totem-popup-text-list">
							<view class="content-totem-popup-text-item">每日產量：243.23</view>
							<view class="content-totem-popup-text-item">總產量：22653</view>
							<view class="content-totem-popup-text-item">已產出：2332.23</view>
							<view class="content-totem-popup-text-item">剩餘產量：23121.27</view>
							<view class="content-totem-popup-text-item">剩餘天數：24</view>
						</view>
					</view>
					<view class="popup-button-box" @click="openPopup('totemRemovePopup','contentTotemPopup')">
						卸載圖騰
					</view>
				</view>
			</mg-popup>
			<mg-popup ref="totemRemovePopup" class="totem-remove-popup" width="720rpx" height="600rpx">
				<view class="totem-popup-box">
					<view class="remove-totem-box">
						<view class="content-totem-popup-text-list">
							<view class="content-totem-popup-text-item">卸載後，圖騰將放置您的背包，</view>
							<view class="content-totem-popup-text-item">且不再每天產出紅寶石，</view>
							<view class="content-totem-popup-text-item">您是否確認？</view>
						</view>
					</view>
					<view class="popup-button-box" @click="onRemoveTotem()">
						確認
					</view>
				</view>
			</mg-popup>
			<mg-popup ref="airdropGiftPopup" class="airdrop-gift-popup" width="720rpx" height="600rpx">
				<view class="totem-popup-box airdrop-popup-box">
					<image class="airdrop-gift-image" src="/static/image/worldTree/kongtou-icon.png" mode="aspectFit"></image>
					<view class="airdrop-gift-box">
						<view class="content-totem-popup-text-list">
							<view class="content-totem-popup-text-item">測試期，世界樹為您準備了小禮物</view>
							<view class="content-totem-popup-text-item">點擊領取按鈕，獲得10個紅寶石！</view>
						</view>
					</view>
					<view class="popup-button-box" @click="onReceiveAirdropGift">
						領取
					</view>
				</view>
			</mg-popup>
		</view>
		<tab-bar></tab-bar>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"; //引入mapState
	import {
		getDebrisList,
		getYggdrasilInfo,
		receiveCollectionRuby,
		unequipTotem,
		receiveAirdropGift
	} from "../../request/api";
	import {
		formatDate
	} from "@/utils/utils";
	export default {
		data() {
			return {
				treeInfo: {},
				totemInfo: {},
				debrisData: {},
				showList: [],
				page: 1,
				pageSize: 6,
				maxPage: 0,
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
			onReceiveAirdropGift(){
				receiveAirdropGift().then(res=>{
					uni.showToast({
						title:"領取成功",
						icon:"none"
					})
				}).catch(err=>{
					console.log(err)
					uni.showToast({
						title:err.data.msg,
						icon:"none"
					})
				}).finally(()=>{
					this.closePopup("airdropGiftPopup")
				})
			},
			onClickFragmentInfo() {
				getDebrisList().then((res) => {
					this.debrisData = res.data;
					this.maxPage = Math.ceil(this.debrisData.total / this.pageSize);
					this.showList = this.debrisData.list.slice(0, this.pageSize);
					this.openPopup("fragmentInfoPopup");
				});
			},
			onPageChange() {
				this.showList = this.debrisData.list.slice(
					(this.page - 1) * this.pageSize,
					this.page * this.pageSize
				);
			},
			onChangePageUp() {
				this.page--;
				if (this.page <= 0) {
					this.page = 1;
				}
				this.onPageChange();
			},
			onChangePageDown() {
				this.page++;
				if (this.page > this.maxPage) {
					this.page = this.maxPage;
				}
				this.onPageChange();
			},
			onInitData() {
				getYggdrasilInfo().then((res) => {
					this.treeInfo = res.data;
					this.totemInfo = res.data.totem || {}
				});
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
			onRemoveTotem() {
				unequipTotem().then(res => {
					uni.showToast({
						title: "卸載成功!",
						icon: "none",
					});
				}).catch(err => {
					uni.showToast({
						title: err.data.msg,
						icon: "none",
					});
				}).finally(()=>{
					this.closePopup("totemRemovePopup")
					this.onInitData()
				})
			},
			httpReceiveCollectionRuby() {
				//領取紅寶石
				receiveCollectionRuby()
					.then((res) => {
						uni.showToast({
							title: "領取成功!",
							icon: "none",
						});
					})
					.catch((err) => {
						console.log(err);
						uni.showToast({
							title: err.data.msg,
							icon: "none",
						});
					})
					.finally((res) => {
						this.closePopup("rubyConfirmPopup");
						this.onInitData()
					});
			},
			formatDate(date, format) {
				return formatDate(date, format);
			},
		},
	};
</script>

<style scoped>
	page {
		background-color: #ffecb8;
	}

	.world-tree-top-box {
		margin-top: -20rpx;
		background-image: url("../../static/image/worldTree/world-tree-bg.png");
		background-size: 100% 100%;
		background-repeat: no-repeat;
		height: 422rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 35rpx;
	}

	.world-tree-top-box {
		display: flex;
	}

	.left-tree-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top-tree-image {
		width: 73rpx;
		height: 83rpx;
	}

	.content-tree-image {
		width: 101rpx;
		height: 101rpx;
	}

	.content-tree-image-totem {
		width: 136rpx;
		height: 204rpx;
	}

	.content-tree-box {
		width: 315rpx;
		height: 315rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.45);
		background-image: url("../../static/image/com/logo_no_color.png");
		background-size: 280rpx 186rpx;
		background-repeat: no-repeat;
		background-position: center;
		border: 5rpx solid #000;
		border-radius: 30rpx;
		font-size: 28rpx;
		position: relative;
	}

	.content-tree-ruby-image {
		position: absolute;
		width: 36rpx;
		height: 42rpx;
		left: 23rpx;
		top: 18rpx;
	}

	.left-tree-box,
	.right-tree-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 12rpx;
		margin-top: 100rpx;
	}

	.top-tree-number-box,
	.top-tree-image-box {
		background-color: rgba(0, 0, 0, 0.45);
		border: 3rpx solid #000;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.top-tree-number-box {
		width: 132rpx;
		height: 59rpx;
		color: #fff;
		font-size: 22rpx;
	}

	.top-tree-image-box {
		width: 132rpx;
		height: 132rpx;
	}

	.world-tree-bottom-box {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.bottom-tree-image {
		margin-top: 70rpx;
		width: 389rpx;
		height: 349rpx;
	}

	.bottom-tree-text-box {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}

	.bottom-tree-text {
		width: 550rpx;
		color: #000;
		font-size: 28rpx;
		line-height: 40rpx;
		margin-bottom: 40rpx;
		font-weight: 600;
	}

	.ruby-info-box {
		margin-top: 60rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
		font-weight: 600;
	}

	.ruby-image-box {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 47rpx;
	}

	.ruby-info-text {
		font-size: 70rpx;
	}

	.popup-info-text-list-box {
		margin-top: 53rpx;
		font-size: 35rpx;
		color: #fff;
	}

	.ruby-image {
		width: 69rpx;
		height: 83rpx;
	}

	.ruby-info-text-list-item {
		margin-left: 60rpx;
		display: flex;
		align-items: center;
		gap: 30rpx;
	}

	.ruby-info-text-list-item-text {
		width: 160rpx;
		text-align: justify;
	}

	.ruby-info-text-list-item-text.right-text {
		margin-bottom: 40rpx;
		/* text-align: right; */
	}

	.ruby-info-text-list-item-number {
		margin-bottom: 40rpx;
		font-size: 30rpx;
		width: 180rpx;
	}

	.ruby-info-text-list-item-text:after {
		content: "";
		display: inline-block;
		width: 100%;
	}

	.popup-button-box {
		width: 223rpx;
		height: 83rpx;
		background: url("@/static/image/com/btn_bg_w.png") no-repeat;
		background-size: 100% 100%;
		color: #fff;
		font-size: 30rpx;
		font-weight: 600;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.popup-tips-box {
		margin-top: 150rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #fff;
	}

	.popup-tips-box .popup-tips-title {
		font-size: 35rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
	}

	.popup-tips-box .popup-tips-text {
		margin-top: 30rpx;
		font-size: 21rpx;
	}

	.fragment-info-text-list-box {
		width: 100%;
		padding-top: 50rpx;
		position: relative;
		color: #fff;
		margin-bottom: 50rpx;
	}

	.fragment-info-box {
		height: 450rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.fragment-info-text-list-item {
		margin-left: 220rpx;
		display: flex;
		align-items: center;
		gap: 10rpx;
		margin-bottom: 30rpx;
	}

	.fragment-info-image {
		position: absolute;
		left: 100rpx;
		top: 50rpx;
		width: 74rpx;
		height: 84rpx;
	}

	.debris-list-box {
		display: flex;
		flex-wrap: wrap;
		/* align-items: center; */
		/* justify-content: center; */
	}

	.debris-list-item {
		margin-top: 40rpx;
		width: 50%;
		display: flex;
		justify-content: center;
		gap: 13rpx;
	}

	.debris-list-item-image {
		width: 74rpx;
		height: 84rpx;
	}

	.debris-list-item-text-list {
		color: #fff;
		font-size: 20rpx;
		display: flex;
		line-height: 28rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.debris-list-popup-page-box {
		margin-top: auto;
		display: flex;
	}

	.debris-list-popup-page-image {
		width: 17rpx;
		height: 35rpx;
	}

	.debris-list-popup-page-size {
		text-align: center;
		width: 200rpx;
		font-size: 42rpx;
		color: #fff;
	}

	.content-tree-totem-title {
		font-weight: 600;
		margin-bottom: 10rpx;
	}

	.content-tree-totem-title.right {
		margin-left: auto;
		margin-right: 18rpx;
	}

	.totem-popup-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 80rpx;
	}
	.airdrop-popup-box{
		gap: 50rpx;
	}

	.content-totem-box,
	.remove-totem-box {
		margin-top: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 45rpx;
	}

	.remove-totem-box {
		margin-top: 110rpx;
	}

	.content-totem-popup-image {
		width: 137rpx;
		height: 204rpx;
		margin-bottom: 50rpx;
	}

	.content-totem-popup-text-list {
		color: #fff;
		font-weight: 600;
		font-size: 35rpx;
	}

	.content-totem-popup-text-item {
		line-height: 1.6;
	}
	.airdrop-gift-image{
		margin-top: 30rpx;
		width: 240rpx;
		height: 205rpx;
	}
	.airdrop-gift-box{
		margin-top: -90rpx;
	}
</style>
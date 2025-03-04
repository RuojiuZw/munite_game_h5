<template>
	<uni-popup ref="popup" type="center" v-show="true">
		<view class="mg-popup-box" :style="getBoxSize()">
			<view class="mg-popup-close-box" @click="close">
				<image class="mg-popup-close-btn" src="@/static/image/com/close_btn.png"></image>
			</view>
			<view class="my-popup-title-box" v-if="isShowLogo">
				<image class="my-popup-top-image" src="@/static/image/com/logo_w.png"></image>
				<view class="no-open-top-text">
					munite game
				</view>
			</view>
			<slot></slot>
		</view>
	</uni-popup>
</template>

<script>
	import props from './props'
	export default {
		name: "mg-popup",
		props,
		emits: ['onTabBar'],
		data() {
			return {
				oldVideo: null,
				oldVideoIndex: -1,
				isMutedList: {}
			};
		},
		mounted() {},
		methods: {
			getBoxSize() {
				if (this.width.indexOf("px") > -1 && this.height.indexOf("px") > -1) {
					return 'width:' + this.width + ';height:' + this.height + ';'
				} else {
					return 'width:' + this.width + 'rpx;height:' + this.height + 'rpx;'
				}
			},
			open() {
				this.$refs.popup.open()
			},
			close() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style scoped>
	.mg-popup-box {
		color: #fff;
		background: rgba(0, 0, 0, 0.9);
		border-radius: 20rpx;
		position: relative;
	}

	.mg-popup-close-box {
		position: absolute;
		right: 25rpx;
		top: 25rpx;
	}

	.mg-popup-close-btn {
		width: 72rpx;
		height: 72rpx;
	}


	.my-popup-title-box {
		width: 100%;
		padding-top: 43rpx;
		display: flex;
		color: #fff;
		font-size: 18rpx;
		align-items: flex-end;
		justify-content: center;
	}

	.my-popup-top-image {
		width: 111rpx;
		height: 74rpx;
	}
</style>
<template>
	<view class="index-page">
		商城
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
			}
		},
		computed: {
			...mapState({
				language: state => state.language
			}),
		},
		onLoad(e) {
		},
		onShow() {},
		onHide() {},
		methods: {
		}
	}
</script>

<style>
</style>
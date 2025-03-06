<template>
  <view class="login-page">
    <top-bar-box></top-bar-box>
    <view class="login-index-box" v-if="pageType === 'index'">
      <view class="login-register-content-box">
        <view class="login-register-title">About MG</view>
        <view class="login-msg-list">
          <view class="login-msg-item">
            MG是一款基於區塊鏈技術的公平博弈小遊戲平台。
          </view>
          <br />
          <view class="login-msg-item">
            會員通過簡單的競技小遊戲，來與其他所有會員一起公平公正的博弈，
            並在獲勝後，贏得回報。
          </view>
        </view>
      </view>
      <view class="button-list">
        <view class="button-item" @click="handleUserAuth()">錢包登陸</view>
        <view class="button-item" @click="toRegister()">賬號註冊</view>
      </view>
    </view>
    <view class="login-register-box" v-if="pageType === 'register'">
      <view class="login-register-content-box">
        <view class="login-register-title">賬號註冊</view>
        <view class="login-register-form-box user-name">
          <view class="login-register-form-item-label">用戶名：</view>
          <input
            type="text"
            v-model="userName"
            class="login-register-form-item-input"
          />
        </view>
        <view class="login-register-form-box">
          <view class="login-register-form-item-label">邀請碼：</view>
          <input
            type="text"
            v-model="inviteCode"
            class="login-register-form-item-input"
          />
        </view>
      </view>
      <view class="button-list">
        <view class="button-item" @click="toBind()">下一步</view>
      </view>
    </view>
    <view class="login-register-box" v-if="pageType === 'bind'">
      <view class="login-register-content-box">
        <view class="login-register-title">賬號註冊</view>

        <view class="login-msg-list">
          <view class="login-msg-item">
            為確保您的賬戶在未來能夠安全流暢的
            使用，我們要為您的賬戶綁定一個唯一的指定錢包。
          </view>
          <br />
          <view class="login-msg-item">
            錢包綁定之後，數字錢包將成為您登錄系統的唯一方式。
          </view>
        </view>
      </view>
      <view class="button-list">
        <view class="button-item" @click="handleBindWallet()">綁定錢包</view>
      </view>
    </view>
    <tab-bar></tab-bar>
  </view>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      pageType: "index",
      userName: "",
      inviteCode: "",
    };
  },
  computed: {
    ...mapState({
      language: (state) => state.language,
      userAccount: (state) => state.web3.userAccount,
      isConnecting: (state) => state.web3.isConnecting,
    }),
  },
  onLoad(options) {
    if (options.hasOwnProperty("inviteCode")) {
      this.inviteCode = options.inviteCode;
    }
  },
  mounted() {},
  onShow() {},
  onHide() {},
  methods: {
    ...mapActions("web3", ["connectWallet", "bindWallet", "authWalletLogin"]),
    ...mapMutations("web3", ["SET_REGISTER_INFO"]),

    // 处理用户授权
    async handleUserAuth() {
      try {
        if (!this.userAccount) {
          await this.connectWallet();
        }
        await this.authWalletLogin();
      } catch (error) {
        console.error("登陸失敗:", error);
        uni.showToast({
          title: "登陸失敗",
          icon: "none",
        });
      }
    },

    async handleBindWallet() {
      // 先设置注册信息
      this.SET_REGISTER_INFO({
        userName: this.userName,
        inviteCode: this.inviteCode,
      });

      try {
        // 如果还没有连接钱包，先连接钱包
        if (!this.userAccount) {
          await this.connectWallet();
        }
        // 调用绑定方法
        await this.bindWallet();
      } catch (error) {
        console.error("綁定錢包失敗:", error);
        uni.showToast({
          title: error.message || "綁定錢包失敗",
          icon: "none",
        });
      }
    },

    toRegister() {
      this.pageType = "register";
    },

    toBind() {
      if (this.userName == "" || this.userName.trim() == "") {
        uni.showToast({
          icon: "none",
          title: "請輸入用戶名!",
        });
        return;
      }
      this.pageType = "bind";
    },
  },
};
</script>

<style scoped>
page {
  background: #ffecb8;
}

.login-title {
  margin-top: 55rpx;
  font-size: 35rpx;
  color: #000000;
  font-weight: 600;
}

.login-msg-list {
  width: 100%;
  margin-top: 39rpx;
  padding: 0 120rpx;
}

.login-msg-item {
  white-space: pre-line;
}

.button-list {
  margin-top: 120rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60rpx;
}

.button-item {
  width: 223rpx;
  height: 83rpx;
  background: url("@/static/image/com/btn_bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  font-size: 35rpx;
  justify-content: center;
}
.login-register-content-box {
  padding: 36rpx 128rpx;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.login-register-title {
  font-size: 35rpx;
  color: #000000;
  font-weight: 600;
}
.login-register-form-box {
  margin-top: 50rpx;
  display: flex;
  align-items: flex-end;
  gap: 20rpx;
}
.login-register-form-box.user-name {
  margin-top: 100rpx;
}
.login-register-form-item-label {
  font-size: 28rpx;
  color: #000000;
  font-weight: 600;
  text-align: left;
}
.login-register-form-item-input {
  padding: 0 30rpx;
  width: 240rpx;
  height: 60rpx;
  border-bottom: 1rpx solid #000000;
}
</style>

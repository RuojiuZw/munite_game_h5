<template>
  <view class="login-page">
    <top-bar-box></top-bar-box>
    <view class="login-index-box" v-if="pageType === 'index'">
      <view class="login-register-content-box">
        <view class="login-register-title">About MG</view>
        <view class="login-msg-list">
          <view class="login-msg-item">
            MG是一款基于区块链技术的公平博弈小游戏平台。
          </view>
          <br />
          <view class="login-msg-item">
            会员通过简单的竞技小游戏，来与其他 所有会员一起公平公正的博弈，
            并在获胜后，赢得回报。
          </view>
        </view>
      </view>
      <view class="button-list">
        <view class="button-item" @click="handleUserAuth()">钱包登陆</view>
        <view class="button-item" @click="toRegister()">账号注册</view>
      </view>
    </view>
    <view class="login-register-box" v-if="pageType === 'register'">
      <view class="login-register-content-box">
        <view class="login-register-title">账号注册</view>
        <view class="login-register-form-box user-name">
          <view class="login-register-form-item-label">用户名：</view>
          <input
            type="text"
            v-model="userName"
            class="login-register-form-item-input"
          />
        </view>
        <view class="login-register-form-box">
          <view class="login-register-form-item-label">邀请码：</view>
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
        <view class="login-register-title">账号注册</view>

        <view class="login-msg-list">
          <view class="login-msg-item">
            为确保您的账户在未来能够安全流畅的
            使用，我们要为您的账户绑定一个唯一 的指定钱包。
          </view>
          <br />
          <view class="login-msg-item">
            钱包绑定之后，数字钱包将成为您登录 系统的唯一方式。
          </view>
        </view>
      </view>
      <view class="button-list">
        <view class="button-item" @click="handleBindWallet()">绑定钱包</view>
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
        console.error("登陆失败:", error);
        uni.showToast({
          title: "登陆失败",
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
        console.error("绑定钱包失败:", error);
        uni.showToast({
          title: error.message || "绑定钱包失败",
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
          title: "请输入用户名!",
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

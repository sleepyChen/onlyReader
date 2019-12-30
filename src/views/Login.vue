<template>
  <div class="login">
    <div class="avator-box">
      <div class="avator">
        <img class="auto-img" :src="avatar" alt />
      </div>
    </div>

    <van-cell-group v-if="isLosePassword">
      <van-field label="手机号" placeholder="手机号码" key="loginphone" error-message autofocus clearable />

      <van-field center clearable label="短信验证码" placeholder="请输入短信验证码" key="loginmsgCode">
        <van-button slot="button" size="small" type="info" disabled>发送验证码</van-button>
      </van-field>
      <van-field
        label="密码"
        placeholder="密码"
        error-message
        right-icon="closed-eye"
        clearable
        key="loginnewpwd"
      />
      <van-field
        label="确认密码"
        placeholder="确认密码"
        error-message
        right-icon="closed-eye"
        clearable
        key="loginequalpwd"
      />
    </van-cell-group>

    <van-cell-group v-else>
      <van-field
        v-model="inputs.username.value"
        label="用户名"
        placeholder="用户名"
        key="loginusername"
        :error-message="inputs.username.msgTip"
        @input="userTest('username')"
        autofocus
        clearable
      />
      <van-field
        v-model="inputs.pwd.value"
        :type="inputs.pwd.type"
        label="密码"
        placeholder="密码"
        :error-message="inputs.pwd.msgTip"
        :right-icon="inputs.pwd.eyeIcon"
        @click-right-icon="checkPassword"
        @input="regTest('pwd')"
        clearable
        key="loginpwd"
      />
    </van-cell-group>

    <van-button
      class="register-btn"
      type="info"
      block
      :loading="isLoading"
      :disabled="isDisable"
      loading-text="登录中···"
      text="登录"
      @click="login"
    />

    <div class="other-operate">
      <van-checkbox
        icon-size="12px"
        :value="checked"
        @click="isCheck"
        shape="square"
        checked-color="#07C160"
      >记住密码?</van-checkbox>

      <span @click="register">没有账号? 立即注册</span>

      <span>忘记密码?</span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";

const { mapState, mapMutations, mapGetters } = createNamespacedHelpers(
  "loginModule"
);

export default {
  name: "login",

  created() {},

  computed: {
    ...mapState(["inputs", "isLoading", "checked", "isLosePassword", "avatar"]),
    ...mapGetters(["isDisable"])
  },

  methods: {
    ...mapMutations(["checkPassword", "regTest", "isCheck", "register"]),

    login() {
      let self = this;

      this.$store.commit("loginModule/login", true);

      let randomTime = Math.random() * 5 * 1000;

      setTimeout(() => {
        let usersMessage = JSON.parse(localStorage.getItem("usersMessage"));

        usersMessage = usersMessage == null ? [] : usersMessage;

        for (let i = 0; i < usersMessage.length; i++) {
          if (usersMessage[i].username == self.inputs.username.value) {
            // 存在该用户且用户名密码正确
            if (usersMessage[i].password == self.inputs.pwd.value) {
              // 弹框提示
              self.$toast({
                duration: 1500,
                message: "登录成功"
              });

              // 修改登录状态
              self.$store.commit("loginModule/login", false);
              // 修改当前输入框输入信息的验证状态
              self.$store.commit("loginModule/register");

              // 保存当前登录用户名
              localStorage.setItem(
                "currentUser",
                JSON.stringify(usersMessage[i].username)
              );

              // 页面跳转到首页
              self.$router.push({ name: "home" });

              return;
            }

            // 存在该用户, 密码输入错误
            self.$toast({
              duration: 2000,
              message: "密码错误"
            });
            self.$store.commit("loginModule/login", false);
            return;
          }
        }

        self.$toast({
          duration: 2000,
          message: "用户名输入错误 / 该用户不存在"
        });
        self.$store.commit("loginModule/login", false);
      }, randomTime);
    },

    register() {
      this.$store.commit("loginModule/register");

      this.$router.push({ name: "register" });
    },

    userTest(name) {
      this.$store.commit("loginModule/regTest", name);

      if (this.inputs.username.isVerifyPass) {
        let local = JSON.parse(localStorage.getItem("usersMessage"));
        local = local == null ? [] : local;
        for (let i = 0; i < local.length; i++) {
          if (local[i].username == this.inputs.username.value) {
            this.$store.commit("loginModule/setAvatar", local[i].avatarImg);
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  height: 100%;

  .avator-box {
    height: 200px;
    background: url(../assets/bg2.jpg) no-repeat;
    background-size: cover;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    .avator {
      width: 120px;
      height: 120px;
      overflow: hidden;
      border-radius: 50%;
      background-color: #eee;
      box-shadow: 0 0 0 5px rgba(255, 255, 255, 0.4);
    }
  }

  .register-btn {
    width: calc(100% - 10px);
    margin: 40px 5px 0;
  }

  .other-operate {
    margin-top: 10px;
    display: flex;
    padding: 0 5px;
    justify-content: space-between;
  }
}
</style>
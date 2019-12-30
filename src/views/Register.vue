<template>
  <div class="register">
    <div class="avator-box">
      <div class="avator">
        <input ref="upload" type="file" id="upload" @change="fileUpload" />
        <label for="upload">
          <div class="layer" v-if="!userMsg.avatarImg">
            <span>上传头像</span>
          </div>
          <img class="auto-img" :src="userMsg.avatarImg ? userMsg.avatarImg : avatar" alt />
        </label>
      </div>
    </div>

    <van-cell-group>
      <van-field
        v-model="inputs.username.value"
        label="用户名"
        placeholder="请输入用户名"
        :error-message="inputs.username.msgTip"
        autofocus
        @input="regTest('username')"
        clearable
        key="username"
      />
      <van-field
        v-model="inputs.pwd1.value"
        :type="inputs.pwd1.type"
        label="密码"
        placeholder="请输入密码"
        :error-message="inputs.pwd1.msgTip"
        :right-icon="inputs.pwd1.eyeIcon"
        @click-right-icon="checkPassword('pwd1')"
        @input="regTest('pwd1')"
        clearable
        key="pwd1"
      />
      <van-field
        v-model="inputs.pwd2.value"
        :type="inputs.pwd2.type"
        label="确认密码"
        placeholder="再次输入确认密码"
        :error-message="inputs.pwd2.msgTip"
        :right-icon="inputs.pwd2.eyeIcon"
        @click-right-icon="checkPassword('pwd2')"
        @input="regTest('pwd2')"
        clearable
        key="pwd2"
      />

      <!-- <van-field
        v-model="inputs.phone.value"
        label="手机号码"
        placeholder="输入手机号码"
        :error-message="inputs.phone.msgTip"
        clearable
        key="phone"
      />

      <van-field center clearable label="短信验证码" placeholder="请输入短信验证码" key="msgCode">
        <van-button slot="button" size="small" type="info" disabled>发送验证码</van-button>
      </van-field>-->
    </van-cell-group>

    <van-button
      class="register-btn"
      type="info"
      block
      :loading="isLoading"
      :disabled="isDisable"
      @click="register"
      loading-text="注册中···"
      text="注册"
    />

    <div class="other-operate">
      <span @click="login">已有账号? 直接登录</span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
import { dateFormat } from "../tools/dateFormat";

// 命名空间辅助函数创建
const {
  mapState,
  mapGetters,
  mapMutations,
  mapActions
} = createNamespacedHelpers("registerModule");

export default {
  name: "register",

  data() {
    return {
      avatar: require('../assets/avatar_default.png')
    }
  },

  computed: {
    ...mapState(["inputs", "isLoading", "userMsg"]),
    ...mapGetters({
      isDisable: "registerBtnDisable"
    })
  },

  methods: {
    ...mapMutations(["checkPassword", "regTest", "login", "setUserMsg", 'setAvatarImg']),

    register() {

      let avatarImg = this.userMsg.avatarImg;
      if(avatarImg == '') {
        this.$toast({
          duration: 1500,
          message: '请上传头像'
        })
        return;
      }

      let self = this;
      let inputs = this.inputs;

      this.$store.commit("registerModule/register", true);

      // 模拟注册延迟时间
      let randomTime = Math.random() * 5 * 1000;

      setTimeout(() => {
        // 获取本地存储(模拟数据库存储用户信息)的用户注册信息数据
        let usersMessage = JSON.parse(localStorage.getItem("usersMessage"));

        usersMessage = usersMessage == null ? [] : usersMessage;

        self.$store.commit("registerModule/register", false);

        for (let i = 0; i < usersMessage.length; i++) {
          if (usersMessage[i].username == inputs.username.value) {
            self.$toast({
              duration: 1500,
              message: "注册失败, 该用户名已存在"
            });
            return;
          }
        }

        let userMsg = {
          // 用户名
          username: inputs.username.value,
          // 密码
          password: inputs.pwd1.value,
          // 注册时间
          registerTime: dateFormat(new Date())
        };

        self.$store.commit('registerModule/setUserMsg', userMsg);

        usersMessage.push(self.userMsg);

        localStorage.setItem("usersMessage", JSON.stringify(usersMessage));

        self.$toast({
          duration: 1500,
          message: "注册成功"
        });

        self.login();
      }, randomTime);
    },

    login() {
      this.$store.commit("registerModule/login");

      this.$router.push({ name: "login" });
    },

    fileUpload(file) {

      let self = this;
      console.log('this user ==> ', this.userMsg);

      let imgFile = this.$refs.upload.files[0];

      let reader = new FileReader();

      reader.onload = function(evt) {
        console.log('img base64 ==> ', this.result);
        self.$store.commit('registerModule/setAvatarImg', this.result);
      };

      if (imgFile) {
        reader.readAsDataURL(imgFile);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.register {
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
      position: relative;
      #upload {
        position: absolute;
        display: none;
      }
      .layer {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(198, 190, 190, 0.1);
        color: #fff;
        font-size: 17px;
      }
    }
  }

  .register-btn {
    width: calc(100% - 10px);
    margin: 40px 5px 0;
  }

  .other-operate {
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
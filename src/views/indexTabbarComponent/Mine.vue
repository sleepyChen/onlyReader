<template>
  <div class="mine">
    <div class="nav">
      <span class="exit" v-if="status" @click="exit">退出登录</span>
      <div class="avatar">
        <div class="layer" :style="'z-index:'+ layerZindex" @click="changeAvatar"></div>
        <input id="upload" class="upload" type="file" ref="upload" @change="fileUpload">
        <label for="upload">
          <img :src="status ? currentUserDatas[0].avatarImg : avatar" alt class="auto-img" />
        </label>
      </div>
      <span class="text" :status="status" @click="login">{{status ? currentUserDatas[0].username : '立即登录'}}</span>
      <!-- <span class="go"></span> -->
    </div>

    <div class="content">
      <div class="myorder">
        <van-cell class="info" title="我的订单" is-link value="全部" />
        <div class="info-items">
          <div class="unconsumed item">
            <span class="icon"></span>
            <span class="text">未消费</span>
          </div>
          <div class="unpay item">
            <span class="icon"></span>
            <span class="text">待付款</span>
          </div>
          <div class="uncomment item">
            <span class="icon"></span>
            <span class="text">待评价</span>
          </div>
          <div class="money-back item">
            <span class="icon"></span>
            <span class="text">退款</span>
          </div>
        </div>
      </div>

      <div class="items">
        <van-cell class="item" title="我的消息" is-link />
        <van-cell class="item" title="我的收藏" is-link to="my_collect"/>
        <van-cell class="item" title="会员中心" is-link />
        <van-cell class="item" title="我的评论" is-link />
      </div>

      <div class="items">
        <van-cell class="item" title="我的钱包" is-link />
        <van-cell class="item" title="余额" is-link />
        <van-cell class="item" title="影院会员卡" is-link />
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery'
import { createNamespacedHelpers } from 'vuex'
const {mapState, mapMutations} = createNamespacedHelpers('mineModule')
export default {
  name: 'mine',
  data() {
    return {
      // 当前用户状态：0 未登录, 1 已登录
      status: 0,
      currentUserDatas: [],
      layerZindex: 2,
      avatar: require('../../assets/avatar_default.png')
    }
  },
  created() {

    // 获取当前登录用户名
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    currentUser = currentUser ? currentUser : '';
      
    // 获取当前注册用户信息
    let userMassage = JSON.parse(localStorage.getItem('usersMessage'));
    userMassage = userMassage ? userMassage : [];

    // 遍历查找当前注册用户的注册信息
    for (let i =0; i< userMassage.length; i++) {

      if (userMassage[i].username == currentUser) {
        this.status = 1;
        this.currentUserDatas.splice(0, 0, userMassage[i]);
        //console.log('currentId ==> ', this.currentUserDatas)
        return;
      }

    }
    this.currentUserDatas.splice(0, 0, {});

  },
  computed: {},
  methods: {

    // 前往登录页面登录
    login() {

      // 当前用户已登录, 拦截操作
      if (this.status) {
        return;
      }

      this.$router.push({name: 'login'});
    },

    // 退出当前登录账号
    exit() {

      this.$dialog.confirm({
        // title: '标题',
        message: '确认退出登录?'
      }).then(() => {
        // on confirm
        this.status = 0;
        this.currentUserDatas = [];
        localStorage.removeItem('currentUser');

      }).catch(() => {
        // on cancel
      });

      
    },

    fileUpload(file) {
      // //console.log('fileUpload ==> ', file);

      let self = this;

      let imgFile = this.$refs.upload.files[0];

      let reader = new FileReader();

      reader.onload = function(evt) {
        // //console.log(evt)
        // //console.log('img base64 ==> ', this.result);
        self.currentUserDatas[0].avatarImg = this.result;

        // 将数据更新到存储数据库中
        let local = JSON.parse(localStorage.getItem('usersMessage'));
        for (let i=0;i< local.length; i++) {
          if (local[i].username == self.currentUserDatas[0].username) {
            local[i].avatarImg = this.result;
            localStorage.setItem('usersMessage', JSON.stringify(local));
            self.layerZindex = 2;
            break;
          }
        }
      };

      if (imgFile) {
        reader.readAsDataURL(imgFile);
      }

    },

    changeAvatar() {

      let self = this;

      this.$dialog.confirm({
        // title: '标题',
        message: '更换头像?'
      }).then(() => {
        // on confirm
        this.layerZindex = 0;

        // dispatchEvent自动触发自定义事件
        self.$refs.upload.dispatchEvent(new MouseEvent('click')) 
      }).catch(() => {
        // on cancel
      });
    }

  }
};
</script>

<style lang="less" scoped>
.mine {
  height: 100%;
  background-color: #f5f5f5;
  .nav {
    background-color: #c82425;
    padding: 30px 20px;
    display: flex;
    align-items: center;
    position: relative;
    .exit{
      position: absolute;
      top: 10px;
      right: 15px;
      color: #fff;
      padding: 2px 5px;
    }
    .avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      box-shadow: 0 0 6px 2px rgba(255,255,255,.4);
      .layer{
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2;
      }
      .upload{
        position: absolute;
        display: none;
        z-index: 1;
      }
    }
    .text {
      color: #fff;
      margin-left: 20px;
      letter-spacing: 2px;
      font-size: 15px;
    }

    .go {
      width: 0.2rem;
      height: 0.2rem;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
      border: 2px solid transparent;
      border-top-color: #fff;
      border-right-color: #fff;
      margin-left: auto;
    }
  }

  .content {
    height: calc(~"100% - 140px");
    overflow-y: auto;
  }

  .myorder {
    background-color: #fff;
    .info {
      font-size: 16px;
    }

    .info-items {
      display: flex;
      justify-content: space-between;
      padding: 15px 10px 15px 20px;
      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .icon {
          width: 40px;
          height: 40px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 40px 40px;
        }
        .text {
          font-size: 14px;
          text-align: center;
          padding-top: 5px;
        }
      }

      .unconsumed {
        .icon {
          background-image: url(../../assets/wallet.png);
        }
      }
      .unpay {
        .icon {
          background-image: url(../../assets/countdown.png);
        }
      }
      .uncomment {
        .icon {
          background-image: url(../../assets/comment.png);
        }
      }
      .money-back {
        .icon {
          background-image: url(../../assets/money-back.png);
        }
      }
    }
  }

  .items {
    background-color: #fff;
    margin-top: 15px;
    .item {
      font-size: 16px;
    }
  }
}
</style>
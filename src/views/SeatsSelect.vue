<template>
  <div class="seatsSelect">
    <van-nav-bar @click-left="back" title="电影汇" left-arrow />

    <div class="content">
      <div class="msg">
        <p class="name">{{movieDetailDatas.title}}</p>
        <p class="address" @click="getLocation(address)">
          <i class="icon"></i>
          <span>{{address}}</span>
        </p>
      </div>

      <div class="seats-about">
        <p class="screen">{{room}}厅银幕</p>
        <p class="subtitle">银幕中央</p>
        <div class="seats">
          <div class="line" v-for="(item, index) in seats" :key="index">
            <span
              :class="['auto-img', seat == 0 ? 'selling' : seat == 1 ? 'sold' : 'selected']"
              v-for="(seat, idx) in item"
              :key="idx"
              @click="select({line: index, num: idx, type: seat})"
            ></span>
          </div>
        </div>
        <div class="seats-type">
          <div class="type-item">
            <span class="icon"></span>
            <span class="text">可选</span>
          </div>
          <div class="type-item center">
            <span class="icon"></span>
            <span class="text">不可选</span>
          </div>
          <div class="type-item">
            <span class="icon"></span>
            <span class="text">已选</span>
          </div>
        </div>
      </div>

      <!-- 显示已选座位 -->
      <div class="select" v-show="seatSelected.length">
        <span class="info">已选座位：</span>
        <div class="selected">
          <span
            class="num"
            v-for="(item, index) in seatSelected"
            :key="index"
          >{{item[0] + 1}}排{{item[1] + 1}}号位</span>
        </div>
      </div>

      <van-submit-bar
        :loading="loading"
        text-align="left"
        :price="movieDetailDatas.price * seatSelected.length * 100"
        button-text="确认购买"
        @submit="buy"
      />
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../tools/dateFormat";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("seatsSelectModule");

export default {
  name: "seats-select",

  data() {
    return {
      address: "广东广州越秀区沿江西路65号"
    };
  },

  created() {
    let self = this;

    // 弹框提示, 影片信息加载中
    this.$toast.loading({
      duration: 0, // 持续显示中
      message: "加载中···"
    });

    // 获取经过路由传参的影片id
    const movieId = this.$route.query;
    let id = "";
    if (Object.prototype.toString.call(movieId) === "[object Object]") {
      for (let k in movieId) {
        id += movieId[k];
      }
    } else {
      id = movieId;
    }

    // ajax通过查询影片id请求影片信息
    this.axios({
      method: "GET",
      url: "https://douban.uieee.com/v2/movie/subject/" + id
    }).then(result => {
      self.$toast.clear();
      this.$store.commit("seatsSelectModule/movieDetail", result.data);
      // //console.log("result ==> ", this.movieDetailDatas);
    });

    // 获取当前用户登录信息
    let username = JSON.parse(localStorage.getItem("currentUser"));
    // 本地保存当前登录用户信息
    if (username) {
      this.$store.commit("seatsSelectModule/username", username);
    }
  },

  computed: {
    ...mapState([
      "movieDetailDatas",
      "room",
      "seats",
      "seatSelected",
      "username",
      "loading"
    ])
  },

  methods: {
    // 回退一级
    back() {
      this.$router.go(-1);
    },

    // 购票作为选择
    select(obj) {
      // 当前所选座位已售，拦截操作
      if (obj.type == 1) {
        //console.log("当前座位不可选, 已售！");
        return;
      }

      this.$store.commit("seatsSelectModule/seatSelected", obj);
    },

    // 确认购买按钮绑定事件
    buy() {
      // 未登录操作拦截
      if (!this.username) {
        this.$toast({
          duration: 1500,
          message: "请登录后购票"
        });
        return;
      }

      // 未选座操作拦截
      if (this.seatSelected.length == 0) {
        this.$toast({
          duration: 1500,
          message: "请先选座"
        });
        return;
      }

      // 付款期间重复购票操作拦截
      if (this.loading) {
        return;
      }

      // 修改按钮状态
      this.$store.commit("seatsSelectModule/isLoading", true);

      // 保存当前购买影片信息
      let ticketMsg = {
        // 播映影片id
        id: this.movieDetailDatas.id,
        // 影片名称
        name: this.movieDetailDatas.title,
        // 播映影厅号
        room: this.room,
        // 影片票价
        price: "￥" + this.movieDetailDatas.price,
        // 购买影片票数总价
        totalPrice: this.movieDetailDatas.price * this.seatSelected.length,
        // 影片选座
        tickets: this.seatSelected,
        // 购票时间
        date: dateFormat(new Date())
      };

      let self = this;
      let userMessage = JSON.parse(localStorage.getItem("usersMessage"));

      let duration = Math.random() * 5000;
      let time = setTimeout(() => {
        for (let i = 0; i < userMessage.length; i++) {
          if (userMessage[i].username == this.username) {
            userMessage[i].ticketMsg.push(ticketMsg);
            localStorage.setItem("usersMessage", JSON.stringify(userMessage));
            self.$toast({
              duration: 1500,
              message: "购票成功"
            });

            // 修改按钮状态
            this.$store.commit("seatsSelectModule/isLoading", false);

            // 释放定时器序列号及空间
            clearTimeout(time);
            time = null;

            return;
          }
        }
        self.$toast({
          duration: 1500,
          message: "购票失败, 稍后重试"
        });

        // 修改按钮状态
        this.$store.commit("seatsSelectModule/isLoading", false);

        // 释放定时器序列号及空间
        clearTimeout(time);
        time = null;
      }, duration);
    },

    getLocation(addr) {
      this.$router.push({ name: "cinema_location", query: addr });
    }
  }
};
</script>

<style lang="less" scoped>
.seatsSelect {
  height: 100%;
  .van-nav-bar {
    background-color: #c82425;
    .van-icon,
    .van-nav-bar__title {
      color: #fff;
    }
  }

  .content {
    .msg {
      background-color: #f9f7f8;
      padding: 15px 20px;
      .name {
        font-size: 16px;
        color: #000;
        margin-bottom: 10px;
      }
      .address {
        color: #898989;
        display: flex;
        align-items: center;
        .icon {
          width: 16px;
          height: 16px;
          background: url(../assets/location.png) no-repeat center center;
          background-size: 16px;
          margin-right: 5px;
        }
      }
    }

    .seats-about {
      background-color: #f0f0f0;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px 0 15px 0;
      > p {
        width: fit-content;
      }
      .screen {
        font-size: 14px;
        color: #292929;
        margin-bottom: 10px;
      }
      .subtitle {
        color: #a5a5a5;
        padding: 1px 8px;
        border: 1px solid #a9a9a9;
        border-radius: 10px;
        font-size: 10px;
      }

      .seats {
        padding-top: 30px;
        .line {
          display: flex;
          justify-content: center;
          > span {
            width: 18px;
            height: 18px;
            margin: 4px 2px 0;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 18px;

            &.sold {
              cursor: not-allowed;
              background-image: url(../assets/seat-sold.png);
            }
            &.selling {
              background-image: url(../assets/seat-selling.png);
            }
            &.selected {
              background-image: url(../assets/seat-selected.png);
            }
          }
        }
      }

      .seats-type {
        display: flex;
        width: fit-content;
        margin-top: 50px;
        .type-item {
          display: flex;
          align-items: center;
          .icon {
            width: 16px;
            height: 16px;
            background-position: center center;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            margin-right: 5px;
          }
          &:nth-child(1) .icon {
            background-image: url(../assets/seat-selling.png);
          }
          &:nth-child(2) .icon {
            background-image: url(../assets/seat-sold.png);
          }
          &:nth-child(3) .icon {
            background-image: url(../assets/seat-selected.png);
          }
        }

        .center {
          margin: 0 20px;
        }
      }
    }

    .van-submit-bar {
      box-shadow: 0 0 5px 1px #eee;
      .van-button--danger {
        background-color: #c82425;
      }

      .van-submit-bar__text {
        padding-left: 20px;
        text-align: left;
      }
    }

    .select {
      margin-top: 20px;
      display: flex;
      span {
        margin: 4px 5px;
      }
      .info {
        width: fit-content;
        min-width: 70px;
        color: #000;
        font-weight: bold;
        font-size: 14px;
      }

      .selected {
        height: fit-content;
        max-height: 112px;
        overflow-y: auto;
        display: flex;
        flex-wrap: wrap;
        .num {
          border: 1px solid #c82425;
          border-radius: 8px;
          padding: 2px 10px;
        }
      }
    }
  }
}
</style>
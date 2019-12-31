
<template>
  <div class="found">
    <van-tabs v-model="active" title-active-color="#c82425" :sticky="true" :lazy-render="true">
      <van-tab title="热门" name="hot">
        <van-pull-refresh v-model="isHotLoading" @refresh="onRefresh(foundTabs[0].apiUrl, 0)">
          <!-- banner -->
          <div class="banner">
            <van-swipe :autoplay="3000" indicator-color="white" :show-indicators="false">
              <van-swipe-item v-for="(img, idx) in foundTabs[0].datas.banners" :key="idx">
                <img class="auto-img" :src="img.data.image" />
              </van-swipe-item>
            </van-swipe>
          </div>

          <!-- hot content -->
          <div class="hot-content">
            <div class="item" v-for="(item, index) in foundTabs[0].datas.videos" :key="index">
              <div class="box">
                <div class="avatar">
                  <img :src="item.author.icon" alt />
                </div>
                <div class="msg">
                  <p class="name">
                    <span class="text ellipse">{{item.author.name}}</span>
                    <span class="date">{{getDate(new Date(item.date))}}</span>
                  </p>
                  <p class="title">
                    <span class="text ellipse">{{item.title}}</span>
                  </p>
                  <p class="desc">{{item.description}}</p>
                  <p class="type">
                    <span>{{item.category}}</span>
                  </p>
                </div>
              </div>
              <div class="video">
                <video controls class="auto-img">
                  <source :src="item.playUrl" />视频格式不支持
                </video>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>

      <van-tab title="分类" name="categeory">
        <van-pull-refresh v-model="isCateLoading" @refresh="onRefresh(foundTabs[1].apiUrl, 1)">
          <div class="categeory-content">
            <div class="items" v-for="(item, index) in foundTabs[1].datas" :key="index">
              <p class="item-type">{{item.header.title}}</p>
              <div class="box">
                <div class="item" v-for="(itm, idx) in item.itemList" :key="idx">
                  <div class="item-box">
                    <div class="img">
                      <img :src="itm.data.author.icon" alt class="auto-img" />
                    </div>
                    <div class="info">
                      <p class="name ellipse">{{itm.data.author.name}}</p>
                      <p class="title ellipse">
                        <span>标题:</span>
                        {{itm.data.title}}
                      </p>
                      <p class="desc lineClamp">{{itm.data.description}}</p>
                    </div>
                  </div>
                  <div class="video">
                    <video class="auto-img" :src="itm.data.playUrl"></video>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>


<script>
import $ from "jquery";

import { dateFormat } from "../../tools/dateFormat";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("foundModule");

export default {
  name: "found",
  data() {
    return {
      active: "hot",
      keyword: "",
      isHotLoading: false,
      isCateLoading: false
    };
  },

  created() {
    // 获取所在城市位置
    let city = JSON.parse(localStorage.getItem("myGeo"));
    this.center = city.point;

    // 弹框提示
    this.$toast.loading({
      duration: 0,
      message: "加载中···"
    });

    // 判断初始化是否加载结束, 隐藏提示弹框标识
    let flag = 0;

    // 获取热门以及分类数据
    for (let i = 0; i < this.foundTabs.length; i++) {
      this.axios.defaults.baseURL = "/foundApi";
      this.axios({
        method: "GET",
        url: this.foundTabs[i].apiUrl
      })
        .then(result => {
          // //console.log("result ==> ", result.data.itemList);
          this.$store.commit("foundModule/setFound", {
            index: i,
            datas: result.data.itemList
          });

          ++flag == 2 ? this.$toast.clear() : "";
        })
        .catch(err => {
          console.log("加载失败 ==> ", err);
          this.$toast.clear();
          this.$toast({
            duration: 1000,
            message: "很抱歉,数据加载失败, 请稍后重试"
          });
        });
    }
  },

  computed: {
    ...mapState(["foundTabs"])
  },

  methods: {
    getDate(date) {
      return dateFormat(new Date(date));
    },

    // 下拉刷新
    onRefresh(url, index) {
      //console.log("refresh···");
      // 弹框提示
      this.$toast.loading({
        duration: 0,
        message: "加载中···"
      });

      this.axios.defaults.baseURL = "/foundApi";
      this.axios({
        method: "GET",
        url
      }).then(result => {
        // //console.log("result ==> ", result.data.itemList);
        this.$store.commit("foundModule/setFound", {
          datas: result.data.itemList,
          index
        });

        index == 0 ? (this.isHotLoading = false) : (this.isCateLoading = false);

        this.$toast.clear();

        //console.log("result ==> ", result.itemList[0].data);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.found {
  width: 100%;
  height: 100%;

  .map {
    height: 400px;
  }

  .banner {
    width: calc(~"100% - 30px");
    padding: 10px 15px;
    border-radius: 20px;
  }

  .hot-content {
    padding: 10px 15px 50px;
    .item {
      box-shadow: 0 0 10px 2px rgba(197, 195, 195, 0.5);
      border-radius: 12px;
      padding: 10px;
      margin-bottom: 20px;
      .box {
        display: flex;
        .avatar {
          width: 50px;
          height: 50px;
          overflow: hidden;
          border-radius: 50%;
          margin-right: 10px;
          box-shadow: 0 0 4px 1px #eee;
        }
      }
      .msg {
        width: calc(~"100% - 50px");
        p.name {
          display: flex;
          justify-content: space-between;
          span.text {
            font-size: 14px;
            color: #587f9d;
            width: calc(~"100% - 119px");
          }
          span.date {
            font-size: 12px;
            color: #9b9b9b;
            margin-top: auto;
          }
        }
        p.title {
          display: flex;
          margin: 5px 0;
        }
        span.text {
          font-size: 16px;
          color: #000;
          font-weight: bold;
        }
        p.desc {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        p.type {
          margin: 15px 10px 10px 0;
          > span {
            width: fit-content;
            color: #587f9d;
            padding: 4px 10px;
            border-radius: 6px;
            background-color: #eef1fa;
          }
        }
      }

      .video {
        width: 100%;
        border-radius: 12px;
        overflow: hidden;
        margin-bottom: 2px;
        margin-top: 5px;
      }
    }
  }

  .categeory-content {
    padding: 20px 15px 55px;
    .items {
      overflow-x: auto;
      .item-type {
        font-size: 20px;
        margin: 5px 0;
        padding-left: 10px;
        border-left: 2px solid #c82425;
      }
      .box {
        width: fit-content;
        padding: 10px;
        display: flex;
        align-items: center;
        .item {
          width: 300px;
          border-radius: 20px;
          box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
          margin-right: 15px;
          padding: 10px;
          &::last-child {
            margin-right: 0;
          }

          .item-box {
            display: flex;
            .img {
              width: 60px;
              height: 60px;
              border-radius: 50%;
              margin-right: 10px;
              overflow: hidden;
            }

            .info {
              width: calc(~"100% - 70px");
              > p {
                width: 100%;
              }
            }

            .name {
              font-size: 16px;
              color: #587f9d;
            }

            .title {
              font-size: 18px;
              font-weight: bold;
              margin: 10px 0;
              > span {
                font-weight: bold;
              }
            }

            .desc {
              -webkit-line-clamp: 4;
              text-align: justify;
              font-size: 14px;
            }
          }

          .video {
            margin-top: 10px;
            height: 170px;
            display: flex;
            margin: auto;
          }
        }
      }
    }
  }
}
</style>
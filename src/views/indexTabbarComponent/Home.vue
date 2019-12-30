<template>
  <div class="home">
    <!-- 定位 + 搜索 -->
    <div class="navBar">
      <baidu-map class="map" @ready="locationHandler" v-show="0"></baidu-map>
      <div class="location">{{city == '' ? '定位中' : city}}</div>
      <div class="search-box">
        <van-search
          class="search"
          ref="value"
          background="#fff"
          shape="round"
          placeholder="搜索: 半个喜剧/周申 喜剧"
          @search="search"
        />
      </div>
    </div>

    <!-- 轮播推荐影片展示 -->
    <van-swipe class="advertise" :autoplay="3000" indicator-color="#F40000">
      <van-swipe-item v-for="(image, index) in swipeImages" :key="index">
        <img class="auto-img" :src="image" alt />
      </van-swipe-item>
    </van-swipe>

    <!-- 榜单影片展示 -->
    <div class="tab" v-for="(itm, idx) in api" :key="idx">
      <div class="tabNav" v-show="itm.loaded">
        <span class="heating">{{itm.name}}</span>
      </div>
      <div class="content" v-show="itm.loaded">
        <div class="con-content">
          <div class="item" v-for="(item, index) in movies[itm.type]" :key="index">
            <div
              class="img"
              :id="itm.type == 'new_movies' ? item.id : item.subject.id"
              @click="jump(itm.type == 'new_movies' ? item.id : item.subject.id)"
            >
              <img
                class="auto-img"
                :src="itm.type == 'new_movies' ? item.images.medium : item.subject.images.medium"
              />
            </div>
            <p
              class="movie-name ellipse"
            >{{itm.type == 'new_movies' ? item.title : item.subject.title}}</p>
            <span
              class="btn-buy"
              @click="buy(itm.type == 'new_movies' ? item.id : item.subject.id)"
            >购票</span>
          </div>
        </div>
      </div>
    </div>
    <div id="allmap"></div>
  </div>
</template>

<script>
import $ from "jquery";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("homeModule");
export default {
  name: "home",
  data() {
    return {
      swipeImages: [
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576647704206&di=42394f91a10b1314a3d2cfe27b734737&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fb99bc7d770b8cb0a25dd305695e580560a57c8db1316d-aS60Vz_fw658",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576647704202&di=ec0dc52236a5257dfb9f8b3ae48c1206&imgtype=0&src=http%3A%2F%2Fimage1.wulinsoso.com%2Fpsd%2F16sucai%2F2014%2F01%2F11%2F0153266138.jpg",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576647704205&di=457f3dca021410a6a27f54cbae8b45b4&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe21204e6a5460b4b8428e334bd8712ce11027c1faac6-wDFiPd_fw658",
        "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576647704198&di=d3292160b849b26054da705e7c44a4bd&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F47082f4ac3e9c0319c9125b8da7e4fd5116e547132191-KEnzHi_fw658"
      ],
      value: ""
    };
  },
  created() {
    let flag = 0;

    // 各类型榜单api数组
    let api = this.api;

    this.$toast.loading({
      duration: 0,
      message: "加载中···"
    });

    // 获取榜单影片数据
    for (let i = 0; i < api.length; i++) {
      this.axios({
        method: "GET",
        url: "https://douban.uieee.com/v2/movie/" + api[i].type
      })
        .then(result => {
          this.$store.commit("homeModule/movies", {
            datas: result.data.subjects,
            type: api[i].type
          });
          this.$store.commit("homeModule/setApi", { index: i, isLoad: true });
          // console.log("口碑推荐 ==> ", result);
          flag++;
          flag == 2 ? this.$toast.clear() : "";
        })
        .catch(err => {
          this.$store.commit("homeModule/setApi", { index: i, isLoad: false });
        });
    }
  },
  computed: {
    ...mapState(["movies", "api", "city"])
  },
  methods: {
    ...mapMutations(["setCity"]),

    // 影片搜索
    search() {
      this.$toast({
        duration: 2000,
        message: "接口问题, 无法搜索"
      });
    },

    // 跳转到影片详情页
    jump(id) {
      this.$router.push({ name: "movie_detail", query: id });
    },

    // 购票按钮绑定事件, 跳转到选座页
    buy(id) {
      this.$router.push({ name: "seats_select", query: id });
    },

    locationHandler({ BMap, map }) {
      let self = this;

      // 获取当前所在城市位置及名称
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(
        function(r) {
          // 保存当前所在城市位置信息
          self.$store.commit("homeModule/setCity", r.address.city);

          // 获取我的当前位置
          let myGeo = new BMap.Geocoder();
          // 将经纬度解析成位置地址信息
          myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(res) {
            console.log("myGeo res ==> ", res);
            // 保存当前位置信息
            localStorage.setItem("myGeo", JSON.stringify(res));
          });
        },
        { enableHighAccuracy: true }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  height: calc(~"100% - 10px");
  padding-bottom: 10px;
  overflow-y: auto;

  .navBar {
    display: flex;
    align-items: center;
    padding: 0 5px;
    background-color: #c82425;
    position: sticky;
    top: 0;
    left: 0;
    zoom: 1;
    z-index: 99999;
    .location {
      padding-right: 0.32rem;
      margin-left: 0.32rem;
      position: relative;
      font-size: 0.37333rem;
      cursor: pointer;
      color: #fff;
      &::after {
        content: "";
        width: 0.1rem;
        height: 0.1rem;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        transform: rotate(135deg);
        border: 1px solid transparent;
        border-top-color: #fff;
        border-right-color: #fff;
      }
    }

    .search-box {
      margin-left: auto;
      .search {
        &.van-search {
          background-color: transparent !important;
        }
      }
    }
  }

  .advertise {
    height: 5rem;
  }

  .tab {
    padding: 1px 10px;

    .tabNav {
      margin: 18px 0 10px;
      > span {
        font-size: 16px;
        padding-left: 5px;
        border-left: 3px solid #c82425;
      }
    }

    .content {
      width: 100%;
      overflow-x: auto;
    }
    .con-content {
      width: fit-content;
      display: flex;
      position: relative;
      .item {
        width: 120px;
        margin: 2px;
        .img {
          width: 100%;
          height: 160px;
          overflow: hidden;
        }
        .movie-name {
          max-width: 100%;
          font-size: 16px;
          margin: 3px 0 10px;
        }
        .btn-buy {
          width: fit-content;
          padding: 3px 10px;
          letter-spacing: 1px;
          background-color: #f40000;
          border-radius: 12px;
          cursor: pointer;
          color: #fff;
          display: block;
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
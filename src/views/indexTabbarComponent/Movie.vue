<template>
  <div class="movie">
    <!-- 导航头部 -->
    <div class="nav">
      <div class="location" @click="locateSelect">{{currentSelectedCity ? currentSelectedCity : city}}</div>
      <div class="search">
        <input class="ipt" type="text" />
        <span class="search-btn" @click="search"></span>
      </div>
    </div>

    <!-- 三级联动  位置选择定位弹出层 -->
    <div class="linkage">
      <!-- 省 -->
      <van-cell ref="showProvince" @click="showProvince" :style="{display: 'none'}">展示弹出层</van-cell>
      <van-popup
        v-model="isShowProvince"
        :round="true"
        position="left"
        :style="{ width: 'fit-content', height: '100%' }"
      >
        <div class="cities-cantain">
          <ul class="provinces">
            <li
              v-for="(province, index) in citiesData.province"
              :key="index"
              :ref="province.name"
              @click="provinceSlect(province.name)"
            >{{province.title}}</li>
          </ul>
        </div>
      </van-popup>

      <!-- 市 -->
      <van-cell ref="showCities" @click="showCities" :style="{display: 'none'}">展示弹出层</van-cell>
      <van-popup
        v-model="isShowCity"
        :round="true"
        position="left"
        :style="{ width: 'fit-content', height: '100%' }"
      >
        <div class="cities-cantain">
          <ul class="cities">
            <li v-for="(city, index) in citiesData.city[currentSelectedProvince]" :key="index" @click="citySelect(city.title)">{{city.title}}</li>
          </ul>
        </div>
      </van-popup>
    </div>

    <!-- 主体内容： 影片信息展示 -->
    <div class="content">
      <div class="tabbar">
        <span @click="tabChange(0)">正在热映</span>
        <span @click="tabChange(1)">即将上映</span>
        <span @click="tabChange(2)">Top250</span>

        <i class="decoration" :style="'left:' + tabbar.lefts[tabbar.active] + 'px'"></i>
      </div>
      <div
        :ref="typeItem"
        class="con-box"
        v-show="tabbar.active == idx"
        v-for="(typeItem, idx) in type"
        :key="idx"
        @scroll="lazyLoad(typeItem)"
      >
        <div class="item" v-for="(item, index) in movies[typeItem].data" :key="index">
          <div class="img" @click="movie_detail(item.id)">
            <img class="auto-img" :src="item.images.medium" alt />
          </div>

          <div class="info">
            <p class="name ellipse">{{item.title}}</p>
            <div class="star-comments">
              <div class="stars">
                <img class="auto-img unLight" src="../../assets/unLightStar.png" alt />
                <img class="auto-img light" src="../../assets/lightStar.png" alt />
              </div>
              <div class="nums">{{item.rating.average}}分</div>
            </div>
            <p class="director ellipse">导演：{{item.directors.length ? item.directors[0].name : '未知'}}</p>
            <p class="performer ellipse">主演：{{item.main_performers}}</p>
          </div>

          <div class="btn-buy" @click="seatSelect(item.id)">购票</div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { citiesDatas } from "../../tools/cities";

import $ from "jquery";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("movieModule");

export default {
  name: "movie",

  data() {
    return {
      isShowProvince: false,
      isShowCity: false
    }
  },

  created() {
    
    // 初始化城市省份数据
    this.$store.commit('movieModule/selected', {type: 'citiesData', name: citiesDatas});

    // 获取当前查询影片所在城市(当前所在城市 / 想要查询的城市)
    let myGeo = JSON.parse(localStorage.getItem('myGeo'));
    this.$store.commit('movieModule/setCity', myGeo.addressComponents.city);

    // 清空之前保存数据条数
    this.$store.commit("movieModule/movies", { type: 0 });
    for (let i = 0; i < this.type.length; i++) {
      this.getMovies(this.type[i]);
    }
  },

  computed: {
    ...mapState(["tabbar", "movies", "type", "timers", 'city', 'citiesData', 'currentSelectedProvince', 'currentSelectedCity'])
  },

  methods: {

    // 触发城市位置定位选择函数showPopup
    locateSelect() {
      this.$refs.showProvince.dispatchEvent(new MouseEvent("click"));
    },

    // 显示省份数组
    showProvince() {
      this.isShowProvince = true;
    },

    // 选择省份
    provinceSlect(name) {
      this.isShowProvince = false;
      this.$store.commit('movieModule/selected', {type: 'currentSelectedProvince', name});
      this.$refs.showCities.dispatchEvent(new MouseEvent("click"));
    },

    // 显示城市数组
    showCities() {
      this.isShowCity = true;
    },

    // 选择城市
    citySelect(name) {
      this.$store.commit('movieModule/selected', {type: 'currentSelectedCity', name});
      this.isShowCity = false;
      this.getMovies('hotMovies');
    },

    // 获取对应类别影片指定数量数据信息
    getMovies(type) {
      // 数据加载中弹框提示
      this.$toast.loading({
        duration: 0,
        message: "加载中···"
      });

      let city = this.currentSelectedCity ? this.currentSelectedCity : this.city;

      let self = this;

      // 设置请求查询参数
      let params = {
        // 获取当前开始请求位置
        start: this.movies[type].data.length,
        // 获取影片请求数量
        count: 10
      };

      // 加载类型为热映影片时添加查询参数city
      if (type == "hotMovies") {
        params.city = city;
      }

      let api =
        type == "hotMovies"
          ? "in_theaters"
          : type == "coming"
          ? "coming_soon"
          : "top250";

      // 请求数据
      this.axios({
        method: "GET",
        url: "https://douban.uieee.com/v2/movie/" + api,
        params
      }).then(result => {
        // 保存影片数据
        self.$store.commit("movieModule/movies", {
          datas: result.data.subjects,
          type
        });
        // 移除加载中弹框提示
        self.$toast.clear();
      });
    },

    // 懒加载影片信息
    lazyLoad(type) {
      // 判断当前类别的影片是否已全部加载,
      // 已全部加载, 拦截操作
      if (!this.movies[type].isHas) {
        //console.log(type + "全部加载完成！");
        return;
      }

      // 设置定时器实现数据加载以及函数防抖
      let timer = setTimeout(() => {
        for (let i = 1; i < this.timers.length; i++) {
          clearTimeout(this.timers[i]);
        }

        // 获取影片外围盒元素
        let content_box = this.$refs[type];
        // //console.log("box ==> ", $(content_box).height());
        // 获取盒元素高度
        let height = $(content_box).height();
        // 获取最后一个影片item距离顶部的高度
        let lastTop = $(content_box)
          .children()
          .last()
          .position().top;
        // //console.log("last ==> ", lastTop);
        // 设置容差
        let range = 10;

        // 满足条件，加载更多影片数据
        if (lastTop < height + range) {
          //console.log("触底加载……");
          this.getMovies(type);
        }

        // 释放timer空间
        timer = null;
        this.$store.commit("movieModule/timers", "clear");
      }, 300);

      // 保存定时器序列号
      this.$store.commit("movieModule/timers", timer);
    },

    // tab切换
    tabChange(n) {
      this.$store.commit("movieModule/tabChange", n);
    },

    // 购票按钮绑定事件
    seatSelect(id) {
      this.$router.push({ name: "seats_select", query: id });
    },

    // 跳转到影片详情页
    movie_detail(id) {
      this.$router.push({ name: "movie_detail", query: id });
    },

    // 搜索
    search() {
      this.$toast({
        duration: 2000,
        message: '接口问题, 无法搜索'
      })
    }
  }
};

</script>

<style lang="less" scoped>
.movie {
  width: 100%;
  height: 100%;

  .nav {
    padding: 0.42rem 0.4rem;
    width: calc(~"100% - 30px");
    height: 0.6rem;
    background-color: #c82425;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 99999;

    .location {
      color: #fff;
      font-size: 15px;
      position: relative;
      padding-right: 12px;

      &::after {
        content: "";
        width: 0.1rem;
        height: 0.1rem;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto 0;
        -webkit-transform: rotate(135deg);
        transform: rotate(135deg);
        border: 0.02667rem solid transparent;
        border-top-color: #fff;
        border-right-color: #fff;
      }
    }

    .search {
      display: flex;
      align-items: center;

      .search-btn {
        width: 18px;
        height: 18px;
        // background-color: #eee;
        background: url(../../assets/search.png) no-repeat center center;
        background-size: 18px 18px;
      }
    }
  }

  .linkage{

    .cities-cantain {
      display: flex;
      height: calc(~"100% - 2.1rem");
      padding: 1.6rem 0 .5rem;
      overflow: hidden;
      ul {
        height: 100%;
        overflow-y: auto;

        li {
          text-align: center;
          font-size: 16px;
          color: #9a9a9a;
          padding: 0.3rem 0.2rem;
          letter-spacing: 1px;

          &:active {
            color: #c82425;
            background-color: #f3eded;
          }
        }
      }
    }

  }
  

  .content {
    height: calc(~"100% - 1.45rem");

    .tabbar {
      height: 40px;
      font-size: 14px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid #e6e6e6;
      margin-bottom: 2px;
      box-shadow: 0 0 3px 1px #ddd;
      position: relative;
      .decoration {
        width: 40px;
        position: absolute;
        bottom: -0.5px;
        left: 42px;
        transition: left 0.2s linear;
        border-bottom: 2px solid #c82425;
      }
    }

    .con-box {
      width: calc(~"100% - .8rem");
      padding: 0 0.4rem 0;
      height: calc(~"100% - 1.45rem");
      overflow-y: auto;
    }

    .item {
      display: flex;
      padding-top: 10px;
      .img {
        width: 90px;
        max-height: 125px;
        overflow: hidden;
        background-color: #c82425;
      }

      .info {
        margin-left: 10px;
      }
      .btn-buy {
        width: fit-content;
        height: fit-content;
        color: #fcf4f2;
        margin-left: auto;
        margin-top: 30px;
        letter-spacing: 1px;
        padding: 4px 10px;
        background-color: #f40000;
        border-radius: 10px;
      }
    }
    .info {
      p {
        max-width: 190px;
        overflow: hidden;
        font-size: 0.32rem;
        margin-bottom: 0.1rem;
        color: #a9a9a9;
      }

      .name {
        font-size: 18px;
        color: #000;
      }

      .star-comments {
        display: flex;
        align-items: center;
        margin: 5px 0 10px;
        .stars {
          width: 100px;
          height: 20px;
          position: relative;
          .unLight {
            position: absolute;
            top: 0;
            left: 0;
          }
          .light {
            position: absolute;
            left: 0;
            top: 0;
          }
        }
        .nums {
          height: fit-content;
          font-weight: bolder;
          color: #cd0506;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
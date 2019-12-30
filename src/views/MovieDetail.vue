<template>
  <div class="movie-detail">
    <van-nav-bar class="top" title="电影详情" left-arrow @click-left="back">
      <van-icon name="share" size="18px" slot="right" />
    </van-nav-bar>

    <div class="detail-msg-box">
      <div class="msg">
        <p class="name">{{currentMoviedetails.title}}</p>
        <div class="msg-box">
          <div class="img" @click="isPhotoLarge(currentMoviedetails.images.medium)">
            <img class="auto-img" :src="currentMoviedetails.images.medium" />
          </div>
          <div class="info">
            <p class="type">{{currentMoviedetails.genres.join(' / ')}}</p>
            <p
              class="country"
            >{{currentMoviedetails.countries[0]}}/{{currentMoviedetails.durations[0]}}</p>

            <p class="time">{{currentMoviedetails.date}}{{currentMoviedetails.countries[0]}}上映</p>

            <p class="score">{{currentMoviedetails.rating.average}}分</p>
          </div>
        </div>
      </div>

      <div class="desc">
        <div class="infoIcon">
          <div class="love icon-box" @click="loveOrCollect('love')">
            <span class="icon">
              <img
                class="auto-img"
                :src="currentMovie.love.islove ? currentMovie.love.loveIcon : currentMovie.love.unloveIcon"
                alt
              />
            </span>
            <span class="text">想看</span>
          </div>
          <div class="collect icon-box" @click="loveOrCollect('collect')">
            <span class="icon">
              <img
                class="auto-img"
                :src="currentMovie.collect.iscollect ? currentMovie.collect.collectIcon : currentMovie.collect.uncollectIcon"
                alt
              />
            </span>
            <span class="text">收藏</span>
          </div>
        </div>

        <div class="desc-info">
          <div :class="['text', all ? 'all' : '']">{{currentMoviedetails.summary}}</div>
          <div class="next" v-show="!all" @click="allDesc"></div>
        </div>

        <div class="movie-about-msg">
          <van-tabs v-model="active" :offset-top="0" :lazy-render="true">
            <van-tab title-style="fontSize: 15px;" title="影片相关">
              <div class="content">
                <div class="movie-part" v-for="(part, idx) in movies_part.movies" :key="idx">
                  <div v-if="currentMoviedetails[part].length">
                    <p class="part-title">{{movies_part.type[idx]}}</p>
                    <div class="main-content">
                      <div>
                        <div
                          class="video-box"
                          v-for="(item, index) in currentMoviedetails[part]"
                          :key="index"
                        >
                          <video :poster="item.medium" controls>
                            <source :src="item.resource_url" />视频格式不被支持
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title-style="fontSize: 15px;" title="影人信息">
              <div class="content">
                <p class="title">导演</p>
                <div class="person">
                  <div
                    class="box"
                    v-for="(item, index) in currentMoviedetails.directors"
                    :key="index"
                  >
                    <div class="img" :url="item.alt" @click="isPhotoLarge(item.avatars.medium)">
                      <img :src="item.avatars.medium" alt class="auto-img" />
                    </div>
                    <p class="name">{{item.name}}</p>
                  </div>
                  <p class="none" v-if="!currentMoviedetails.directors.length">未知</p>
                </div>
                <p class="title">主演</p>
                <div class="person">
                  <div class="box" v-for="(item, index) in currentMoviedetails.casts" :key="index">
                    <div class="img" :url="item.alt" @click="isPhotoLarge(item.avatars.medium)">
                      <img :src="item.avatars.medium" alt class="auto-img" />
                    </div>
                    <p class="name">{{item.name}}</p>
                  </div>
                  <p class="none" v-if="!currentMoviedetails.casts.length">未知</p>
                </div>
              </div>
            </van-tab>
            <van-tab title-style="fontSize: 15px;" title="电影剧照">
              <div class="content movie-photo">
                <div class="movie-photo-box">
                  <div
                    class="item"
                    v-for="(item, index) in currentMoviedetails.photos"
                    :key="index"
                    @click="isPhotoLarge(item.image)"
                  >
                    <img :src="item.image" alt class="auto-img" />
                  </div>
                </div>
              </div>
            </van-tab>
            <van-tab title-style="fontSize: 15px;" title="热门评论">
              <div class="content">
                <!-- 短评 -->
                <div class="comment comments" v-if="currentMoviedetails.comments_count">
                  <p class="title">短评</p>
                  <div class="items">
                    <div
                      class="item"
                      v-for="(item, index) in currentMoviedetails.popular_comments"
                      :key="index"
                    >
                      <div class="img">
                        <img class="auto-img" :src="item.author.avatar" alt />
                      </div>
                      <div class="main-content">
                        <p class="nickname">{{item.author.name}}</p>
                        <p class="create-time">{{item.created_at}}</p>
                        <p class="content-text">{{item.content}}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 影评 -->
                <div class="comment reviews" v-if="currentMoviedetails.reviews_count">
                  <p class="title">影评</p>
                  <div class="items">
                    <div
                      class="item"
                      v-for="(item, index) in currentMoviedetails.popular_reviews"
                      :key="index"
                    >
                      <div class="img">
                        <img class="auto-img" :src="item.author.avatar" alt />
                      </div>
                      <div class="main-content">
                        <p class="nickname">{{item.author.name}}</p>
                        <p class="article-title">{{item.title}}</p>
                        <p class="content-text summary">{{item.summary}}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>

    <!-- overlay遮罩层 -->
    <van-overlay class="overlay" :show="imgLarge.show">
      <div class="wrapper" @click.stop="isPhotoLarge">
        <div class="block">
          <img class="auto-img" :src="imgLarge.showImg" alt />
        </div>
      </div>
    </van-overlay>

    <van-button class="btn-buy" color="#CC3C3C" type="danger" @click="seatSelect" block>购票</van-button>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("movieDetailModule");

export default {
  name: "movie-detail",

  data() {
    return {
      active: 0,
      currentMovie: {
        id: '',
        love: {},
        collect: {},
      }
    };
  },

  created() {
    this.$toast.loading({
      duration: 0,
      message: "加载中···"
    });

    const id = this.$route.query;
    let cId = "";

    if (Object.prototype.toString.call(id) === "[object Object]") {
      for (let k in id) {
        cId += id[k];
      }
    } else {
      cId = id;
    }

    this.$store.commit("movieDetailModule/saveId", cId);

    this.axios({
      method: "GET",
      url: "https://douban.uieee.com/v2/movie/subject/" + cId
    }).then(result => {
      console.log("result ==> ", result);
      let date = result.data.mainland_pubdate.split("-");

      result.data["date"] =
        date != "" ? date[0] + "年" + date[1] + "月" + date[2] + "日" : "";

      // 保存数据
      this.$store.commit("movieDetailModule/movieDetail", result.data);
      // console.log('result ==> ', this.currentMoviedetails);

      let curentMovie = {
        id: cId,
        love: {
          islove: false,
          loveIcon: require("../assets/love.png"),
          unloveIcon: require("../assets/unlove.png")
        },
        collect: {
          iscollect: false,
          collectIcon: require("../assets/collect.png"),
          uncollectIcon: require("../assets/uncollect.png")
        }
      };

      // 获取当前登录用户名称
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));

      // 获取本地存储的电影的信息(love or collect)
      let usersMessage = JSON.parse(localStorage.getItem("usersMessage")); //loveOrCollect
      usersMessage = usersMessage ? usersMessage : [];

      let isFind = false;
      let isUserLoad = false;

      for (let i = 0; i < usersMessage.length; i++) {
        if (usersMessage[i].username == currentUser) {
          isUserLoad = true;

          for (let j = 0; j < usersMessage[i].loveOrCollect.length; j++) {
            if (usersMessage[i].loveOrCollect[j].id == cId) {
              this.currentMovie = usersMessage[i].loveOrCollect[j];
              isFind = true;
              break;
            }
          }

          break;
        }
      }

      // 用户未登录或未保存任何想看的或者收藏的影片的信息时, 赋值icon信息
      if (!isFind || !isUserLoad) {
        this.currentMovie = curentMovie;
      }

      // 清除加载中弹框提示
      this.$toast.clear();
    });
  },

  computed: {
    ...mapState(["currentMoviedetails", "all", "imgLarge", "movies_part"])
  },

  methods: {
    ...mapMutations(["allDesc", "isPhotoLarge", "id"]),

    back() {
      this.$router.go(-1);
    },

    seatSelect() {
      this.$router.push({
        name: "seats_select",
        query: this.currentMoviedetails.id
      });
    },

    loveOrCollect(type) {
      // 获取当前登录用户信息
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        this.$toast({
          duration: 1500,
          message: "请先登录"
        });
        return;
      }

      this.currentMovie[type]["is" + type] = !this.currentMovie[type][
        "is" + type
      ];

      // 获取注册用户信息
      let usersMessage = JSON.parse(localStorage.getItem("usersMessage"));

      for (let i = 0; i < usersMessage.length; i++) {
        if (usersMessage[i].username == currentUser) {

          let movie = usersMessage[i].loveOrCollect;
          for (let j = 0; j < movie.length; j++) {
            if (movie[j].id == this.currentMovie.id) {
              // 改变用户对该影片的状态
              movie[j][type]["is" + type] = !movie[j][type]["is" + type];

              // 判断该用户对该影片的状态, 是否想看该影片或者收藏该影片, 若皆无, 清空该影片loveOrCollect数组信息
              let item = movie[j];
              if (item.love.islove == false && item.collect.iscollect == false) {
                movie.splice(j, 1);
              }

              localStorage.setItem("usersMessage", JSON.stringify(usersMessage));
              return;
            }
          }

          movie.push(this.currentMovie);
          localStorage.setItem("usersMessage", JSON.stringify(usersMessage));

          break;
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.movie-detail {
  height: calc(~"100% - 50px");
  padding-bottom: 50px;
  background-color: #f5f5f5;
  position: relative;

  .van-nav-bar {
    background-color: #aa3430;
    align-items: center;
    display: flex;

    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text {
      color: #fff;
    }
    .van-nav-bar__text {
      font-size: 15px;
    }
  }

  .detail-msg-box {
    height: calc(~"100% - 1.22667rem");
    overflow-y: auto;
  }

  .msg {
    background-color: #aa3430;
    padding: 0 20px;
    color: #fff;
    padding-top: 10px;
    .name {
      font-size: 17px;
      margin-bottom: 10px;
    }

    .msg-box {
      display: flex;
      position: relative;

      .img {
        width: 120px;
        max-height: 170px;
        background-color: #eee;
        position: absolute;
        overflow: hidden;
      }

      .info {
        margin-left: 135px;
        padding-bottom: 30px;

        > p {
          font-size: 13px;
          margin-bottom: 5px;
          letter-spacing: 1px;
        }

        .type {
          width: fit-content;
          background-color: #c0484a;
          padding: 4px 10px;
        }

        .score {
          color: #fbf702;
        }

        .time {
          width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .desc {
    padding: 15px 0;
    .infoIcon {
      display: flex;
      justify-content: flex-end;
      .icon-box {
        margin-bottom: 10px;
        padding: 5px 10px;
        background-color: #d93637;
        width: fit-content;
        display: flex;
        align-items: center;
        margin-right: 20px;
        .icon {
          width: 16px;
          height: 16px;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: 16px 16px;
        }

        .text {
          color: #fff;
          font-size: 14px;
          margin-left: 5px;
        }
      }
    }

    .desc-info {
      height: calc(~"100% - 296px");
      line-height: 24px;
      font-size: 14px;
      text-align: justify;
      margin-bottom: 10px;
      position: relative;

      .text {
        text-indent: 2em;
        display: -webkit-box;
        -webkit-line-clamp: 4;
        overflow: hidden;
        -webkit-box-orient: vertical;
        padding: 0 20px 0;
        position: relative;

        &.all {
          -webkit-line-clamp: initial;
        }
      }

      .next {
        position: absolute;
        bottom: 2px;
        right: 10px;
        width: 18px;
        height: 18px;
        background: url(../assets/arrow-next.png) no-repeat center center;
        background-size: 18px;
      }
    }
  }

  .movie-about-msg {
    margin: 40px 20px 0;
    box-shadow: 0 0 10px 1px rgba(170, 52, 48, 0.1);
    background-color: #fff;
    .van-tabs--line .van-tabs__wrap {
      height: 1rem;
      .van-tab {
        line-height: 1rem;
      }
    }

    .content {
      width: calc(~"100% - 20px");
      margin: 10px 10px 0;
      // padding-bottom: 20px;
      overflow: hidden;
      > p.title {
        font-size: 16px;
        margin: 5px 0 10px;
        padding-left: 10px;
        border-left: 2px solid #aa3430;
      }
      .person {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        .box {
          width: 100px;
          margin-right: 7.5px;
          padding-bottom: 10px;
          margin-bottom: 10px;
          &:nth-child(3n) {
            margin-right: 0;
          }
          .img {
            border-radius: 10px;
            overflow: hidden;
            margin-bottom: 8px;
            height: 140px;
          }
          .name {
            text-align: center;
          }
        }

        .none {
          padding-left: 15px;
          margin: 5px 0 10px;
          color: #bfbfc0;
        }
      }

      &.movie-photo {
        display: flex;
        overflow-x: auto;

        .movie-photo-box {
          width: fit-content;
          display: flex;
          padding: 10px 0;
          .item {
            height: fit-content;
            float: left;
            width: 300px;
            margin: 0px 10px 5px 0;
            border-radius: 10px;
            overflow: hidden;
          }
        }
      }

      .comment {
        .title {
          font-size: 13px;
          padding-left: 10px;
          border-left: 2px solid #aa3430;
        }
        .item {
          display: flex;
          margin: 20px 0;

          .img {
            width: 40px;
            max-height: 40px;
            overflow: hidden;
            border-radius: 50%;
            background-color: #aa3430;
            margin-right: 10px;
          }

          .main-content {
            width: calc(~"100% - 50px");

            .nickname {
              font-size: 14px;
              color: #3377aa;
            }
            .create-time {
              font-size: 11px;
              color: #bfbfc0;
              margin-bottom: 10px;
            }
            .content-text {
              line-height: 16px;
              display: -webkit-box;
              -webkit-line-clamp: 12;
              -webkit-box-orient: vertical;
              overflow: hidden;

              &.summary {
                -webkit-line-clamp: 2;
                margin-top: 10px;
              }
            }

            .article-title {
              font-size: 16px;
              color: #3377aa;
              margin-top: 10px;
              text-overflow: ellipsis;
              white-space: nowrap;
              overflow: hidden;
            }
          }
        }
      }

      .movie-part {
        margin-top: 12px;
        .part-title {
          font-size: 15px;
          padding-left: 10px;
          border-left: 2px solid #cc3c3c;
          margin-bottom: 10px;
        }

        .main-content {
          width: 100%;
          overflow-x: auto;
          > div {
            width: fit-content;
            display: flex;
          }
          .video-box {
            width: 7.5rem;
            margin: 10px;
            video {
              width: 100%;
            }
          }
        }
      }
    }
  }

  .btn-buy {
    letter-spacing: 2px;
    font-size: 16px;
    position: absolute;
    bottom: 0;
  }

  .overlay {
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 350px;
      max-height: 600px;
      overflow-y: auto;
      border-radius: 15px;
    }
  }
}
</style>
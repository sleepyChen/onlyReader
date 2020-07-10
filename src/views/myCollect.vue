<template>
  <div class="my-collect">
    <van-nav-bar title="我的收藏" left-arrow @click-left="back" />

    <div class="collect-content">
      <div class="nothing" v-if="!collects.length">
        <span class="null">nothing!</span>
        <span class="go">快去<span>{{!currentUser ? ' 登录 ' : ''}}</span>添加收藏吧^_^</span>
      </div>
      <div class="item" v-for="(item, index) in collects" :key="index">
        <div class="img" @click="movie_detail(item.id)">
          <img :src="item.images.medium" class="auto-img" />
        </div>
        <div class="content">
          <p class="name ellipse">{{item.title}}</p>
          <p class="director ellipse">
            <span>主演:</span>
            {{item.main_performers}}
          </p>
          <p class="desc lineClamp">
            <span>简介:</span>
            {{item.summary}}
          </p>
        </div>
        <span class="cancle" @click="cancle(item.id)">取消收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("myCollectModule");
export default {
  name: "my-collect",

  data() {
    return {
      currentUser: "",
      collects: [],
      nothing: 1
    };
  },

  created() {
    // 获取当前登录用户
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!this.currentUser) {
      return;
    }

    this.collects = [];

    this.$toast.loading({
      duration: 0,
      message: "加载中···"
    });

    let timer = setTimeout(() => {
      // 获取所有注册用户信息
      let usersMessage = JSON.parse(localStorage.getItem("usersMessage"));

      for (let i = 0; i < usersMessage.length; i++) {
        if (usersMessage[i].username == this.currentUser) {
          let movie = usersMessage[i].loveOrCollect;
          for (let j = 0; j < movie.length; j++) {
            if (movie[j].collect.iscollect) {
              this.axios({
                method: "GET",
                url: "/doubanApi/subject/" + movie[j].id
              }).then(result => {
                // //console.log(result);
                // if (result.casts.length == 0) {
                // }
                // //console.log(result.data)
                result.data.main_performers = "";

                for (let i = 0; i < result.data.casts.length; i++) {
                  result.data.main_performers +=
                    result.data.casts[i].name + "/";
                }

                result.data.main_performers = result.data.main_performers.substr(
                  0,
                  result.data.main_performers.length - 1
                );

                this.collects.push(result.data);
                j == movie.length - 1 ? this.$toast.clear() : "";
              });
            }
          }
          break;
        }
      }

      this.collects.length ? "" : this.$toast.clear();
      //console.log(this.collects);
    }, Math.random() * 2000);
  },

  computed: {},

  methods: {
    back() {
      this.$router.go(-1);
    },

    movie_detail(id) {
      this.$router.push({ name: "movie_detail", query: id });
    },

    cancle(id) {
      this.$dialog
        .confirm({
          message: "确认取消收藏?"
        })
        .then(result => {
          // confirm

          // 移除当前取消收藏影片
          for (let i = 0; i < this.collects.length; i++) {
            if (this.collects[i].id == id) {
              this.collects.splice(i, 1);
              break;
            }
          }

          // 修改本地存储中的该收藏影片的信息状态
          let usersMessage = JSON.parse(localStorage.getItem("usersMessage"));

          for (let i = 0; i < usersMessage.length; i++) {
            if ((usersMessage[i].username = this.currentUser)) {
              let movie = usersMessage[i].loveOrCollect;
              for (let j = 0; j < movie.length; j++) {
                if (movie[j].id == id) {
                  //console.log(movie);
                  movie[j].collect.iscollect = false;

                  if (
                    movie[j].collect.iscollect == false &&
                    movie[j].love.islove == false
                  ) {
                    movie.splice(j, 1);
                  }

                  localStorage.setItem(
                    "usersMessage",
                    JSON.stringify(usersMessage)
                  );
                  break;
                }
              }

              break;
            }
          }
        })
        .catch(err => {
          // cancel
        });
    }
  }
};
</script>

<style lang="less" scoped>
.my-collect {
  .van-nav-bar {
    background-color: #c82425;
    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text {
      color: #fff;
    }
  }

  .collect-content {
    padding-top: 15px;

    .nothing {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        margin: 10px 0;
        font-size: 22px;
        color: #eee;
      }
      .go{
        span{
          font-size: 30px;
        }
      }
    }
    .item {
      width: calc(~"100% - 30px");
      height: fit-content;
      display: flex;
      align-items: center;
      padding: 0 15px;
      margin-bottom: 15px;
      position: relative;
      .img {
        width: 90px;
        height: 120px;
        overflow: hidden;
        background-color: #ddd;
        margin-right: 10px;
      }
      .content {
        height: 120px;
        > p > span {
          color: #000;
        }
        .name {
          padding: 5px 0;
          font-size: 16px;
          width: 5rem;
        }
        .director {
          width: 5.5rem;
          padding: 5px 0;
          font-size: 14px;
          color: #9a9a9a;
        }
        .desc {
          width: 6rem;
          font-size: 14px;
          -webkit-line-clamp: 3;
          line-height: 20px;
          color: #9a9a9a;
          text-align: justify;
        }
      }

      .cancle {
        position: absolute;
        top: 5px;
        right: 20px;
        letter-spacing: 1px;
        font-size: 10px;
        border-radius: 8px;
        color: #fff;
        background-color: #c82425;
        padding: 4px 5px;
      }
    }
  }
}
</style>
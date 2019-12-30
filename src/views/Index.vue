<template>
  <div class="index">

    <div class="content">
      <router-view/>
    </div>

    <van-tabbar class="tabbar" v-model="active" active-color="#F2191A">
      <van-tabbar-item :name="item.name" :icon="item.icon" v-for="(item, index) in tabbarDatas" :key="index" @click="tabBarTurn(item.name)">{{item.title}}</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("indexModule");
export default {
  name: "index",

  data() {
    return {
      active: 'home'
    }
  },

  created() {
    this.active = this.$route.name
  },

  computed: {
    ...mapState(["tabbarDatas"])
  },
 
  methods: {

    tabBarTurn(name) {
      this.$store.commit('indexModule/tabTurn', name);
      this.$router.push({name});
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;

  .content{
    width: 100%;
    height: calc(~"100% - 1.3334rem");
  }
  .tabbar {
    box-shadow: 0 0 4px 1px #eee;
  }

}
</style>
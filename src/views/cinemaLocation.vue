<template>
  <div class="cinema-location">
    <van-nav-bar title="影院地图" left-arrow @click-left="back" />
    <baidu-map class="map" id="allmap" :center="center" @ready="getLocate"></baidu-map>
  </div>
</template>

<script>
export default {
  name: "cinema-location",
  data() {
    return {
      center: {
        lng: 0,
        lat: 0
      },
      address: ""
    };
  },

  created() {
    this.address = this.$route.query;
    //console.log(this.address);
  },

  methods: {
    getLocate({ BMap, map }) {
      let currentCity = localStorage.getItem("currentCity");

      this.axios({
        method: "GET",
        url: "/geocodingApi/v3",
        params: {
          address: this.address,
          ak: "Ggx0L2L36Mf9Qft5wpzWABwkFokwSVCM"
        }
      }).then(result => {
        //console.log("geocodingApi result ==> ", result);

        let lngTest = /<lng>(.*)<\/lng>/g.test(result.data);
        let lng = RegExp.$1;
        let latTest = /<lat>(.*)<\/lat>/g.test(result.data);
        let lat = RegExp.$1;

        if (lngTest && latTest) {
          // //console.log("lng, lat ==> ", lng, lat);
          this.center = { lng, lat }; // 保存位置坐标
          map = new BMap.Map("allmap"); // 创建Map实例

          let point = new BMap.Point(lng, lat);
          map.centerAndZoom(point, 20); // 初始化声明地图中心坐标, 设置中心点

          //添加地图类型控件
          map.addControl(
            new BMap.MapTypeControl({
              // 按钮呈下拉列表形式呈现, 默认呈现为水平排列BMAP_MAPTYPE_CONTROL_HORIZONTAL
              type: BMAP_MAPTYPE_CONTROL_DROPDOWN,  
              // 控件展示地图类型, BMAP_NORMAL_MAP 普通点图, BMAP_HYBRID_MAP 卫星和路网混合视图, BMAP_SATELLITE_MAP 卫星视图
              mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP, BMAP_SATELLITE_MAP] 
            })
          );
          map.setCurrentCity(currentCity); // 设置地图显示的城市 此项是必须设置的

          map.enableScrollWheelZoom(true); // 启动滚轮地图缩放

          let marker = new BMap.Marker(point); // 创建标注

          map.addOverlay(marker); // 在地图上设置中心点图标标注

          marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画

          //给位置标记添加点击事件以及显示窗口信息
          var infoWindow = new BMap.InfoWindow(
            `<p style='font-size:14px;'>广州电影院 <br/> 地址: ${this.address}</p>`
          );

          marker.addEventListener("click", function() {
            this.openInfoWindow(infoWindow);
          });
        }
      });
    },

    // 返回上一页
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.cinema-location {
  height: 100%;
  .map {
    height: calc(~"100% - 1.22667rem");
  }

  .van-nav-bar {
    background-color: #c82425;
    .van-icon,
    .van-nav-bar__title,
    .van-nav-bar__text {
      color: #fff;
    }
  }
}
</style>
export const mutations = {
  // 修改当前激活tab下标
  tabChange(state, n) {
    state.tabbar.active = n;
  },

  // 热映影片信息
  movies(state, obj) {

    if (obj.type == 0) {
      for (let k in state.movies) {
        if (state.movies[k].data.length) {
          state.movies[k].data.splice(0);
        }
      }
      return;
    }

    let datas = obj.datas;

    if (datas.length < 10) {
      state.movies[obj.type].isHas = false;
      state.movies[obj.type].n = 1;
    }

    let casts = [];

    // 合并主演
    for (let j = 0; j < datas.length; j++) {

      for (let i = 0; i < datas[j].casts.length; i++) {
        casts.push(datas[j].casts[i].name);
      }
      
      datas[j].main_performers = casts.length == 0 ? '未知' : casts.join(' / ');
      casts = [];
    }

    // 保存数据到对应类别影片数组中
    state.movies[obj.type].data.splice(state.movies[obj.type].length, 0, ...datas);

  },


  // 修改保存定时器序列号
  timers(state, timer) {

    if (timer == 'clear') {
      state.timers.splice(0);
    }

    state.timers.splice(state.timers.length, 0, timer);

  },

  setCity(state, city) {
    state.city = city;
  }

}

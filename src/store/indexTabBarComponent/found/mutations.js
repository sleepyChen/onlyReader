export const mutations = {

  setFound(state, obj) {
    // index: 下标
    // datas： 数据

    // 处理热门类别数据
    if (state.foundTabs[obj.index].name == 'hot') {

      state.foundTabs[obj.index].datas.banners.splice(0);
      state.foundTabs[obj.index].datas.videos.splice(0);

      for (let i = 0; i < obj.datas.length; i++) {

        if (obj.datas[i].type == 'horizontalScrollCard') {
          state.foundTabs[obj.index].datas.banners.push(...obj.datas[i].data.itemList);
        }

        if (obj.datas[i].type == 'video') {
          state.foundTabs[obj.index].datas.videos.push(obj.datas[i].data);
        }

        i == obj.datas.length - 1 ? state.foundTabs[obj.index].isLoad = true : false;

      }

    }

    if (state.foundTabs[obj.index].name == 'category') {
      state.foundTabs[obj.index].datas.splice(0);

      for (let i=0;i<obj.datas.length; i++) {
        state.foundTabs[obj.index].datas.push(obj.datas[i].data);
        i == obj.datas.length - 1 ? state.foundTabs[obj.index].isLoad = true : '';
      }

    }

    //console.log('foundTabs ==> ', state.foundTabs);

  }

}

export const mutations = {

  // 修改 当前用户登录状态信息
  username(state, username) {
    state.username = username;
  },

  // 修改保存影片详情
  movieDetail(state, datas) {

    let ticketPrice = (Math.random() * 60).toFixed(1)

    for (let i = 0; i < 1; i++) {
      if (ticketPrice < 18) {
        i--;
        ticketPrice = (Math.random() * 60).toFixed(1);
      }
    }

    datas.price = ticketPrice;

    state.movieDetailDatas = datas;
  },

  // 修改保存当前已选座位号
  seatSelected(state, obj) {
    // obj = {line: '' // 排, num: '' // 号, type: '' // 当前座位类型}

    // 保存显示当前已选座位
    if (obj.type == 0) {
      state.seatSelected.splice(state.seatSelected.length, 0, [obj.line, obj.num]);
    } else {
      // type=2
      for (let i = 0; i < state.seatSelected.length; i++) {
        if (state.seatSelected[i][0] == obj.line && state.seatSelected[i][1] == obj.num) {
          state.seatSelected.splice(i, 1);
        }
      }
    }

    // 修改当前所选座位状态类型
    let seats = state.seats;
    state.seats[obj.line].splice(obj.num, 1, obj.type == 0 ? 2 : 0);

  },

  // 修改保存当前购票按钮状态
  isLoading(state, loading) {
    state.loading = loading;
  }

}

export const state = {
  city: '',
  tabbar: {
    active: 0,
    lefts: [42, 170, 294]
  },

  type: ['hotMovies', 'coming', 'top250'],

  movies: {

    //  热映电影
    hotMovies: {
      isHas: true,
      data: []
    },

    //  即将上映电影
    coming: {
      isHas: true,
      data: []
    },

    // Top250榜单
    top250: {
      isHas: true,
      data: []
    }
    
  },

  // 保存定时器序号
  timers: []
}

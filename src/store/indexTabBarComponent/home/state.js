export const state = {
  city: '',
  api: [{
      type: 'weekly',
      name: '口碑榜',
      loaded: true
    },
    {
      type: 'new_movies',
      name: '新片榜',
      loaded: true
    },
    {
      type: 'us_box',
      name: '北美票房榜',
      loaded: true
    }
  ],

  movies: {
    // 口碑推荐电影
    weekly: '',

    // 北美票房榜
    us_box: '',

    // 新片榜
    new_movies: ''
  }
}

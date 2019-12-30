export const state = {
  // 保存movieid
  id: '',

  // 保存数据结构, 防止初始化时无法及时获取数据导致出错
  currentMoviedetails: {
    images: {},
    genres: [],
    durations: [],
    rating: {},
    countries: [],
    casts: [{
      avatars: {}
    }],
    directors: [],
    trailers: [],
    bloopers: [],
    clips: [],
    photos: []
  },
  all: false,

  imgLarge: {
    show: false,
    showImg: ''
  },

  // 影片相关
  movies_part: {
    movies: ['trailers', 'bloopers', 'clips'],
    type: ['预告片', '花絮', '影片片段']
  }
}

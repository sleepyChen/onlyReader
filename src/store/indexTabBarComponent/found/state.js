export const state ={
  
  foundTabs: [
    {
      name: 'hot',
      title: '热门',
      apiUrl: '/v4/discovery/hot',
      datas: {
        banners: [],
        videos: [
          {
            author: {}
          }
        ]
      }
    },
    {
      name: 'category',
      title: '分类',
      apiUrl: '/v4/discovery/category',
      datas: []
    }
  ]

}
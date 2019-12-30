import {
  routesComponents
} from './routesComponent'

export const routes = [

  // 注册
  {
    path: '/register',
    name: 'register',
    component: routesComponents.registerComponent,
    meta: {
      keepAlive: false
    }
  },

  // 登录
  {
    path: '/login',
    name: 'login',
    component: routesComponents.loginComponent,
    meta: {
      keepAlive: false
    }
  },

  // 首页
  {
    path: '/index',
    name: 'index',
    component: routesComponents.indexComponent,
    children: [

      // home
      {
        path: '/home',
        name: 'home',
        component: routesComponents.homeComponent,
        meta: {
          keepAlive: true
        }
      },
      
      {
        path: '/found',
        name: 'found',
        component: routesComponents.foundComponent,
        meta: {
          keepAlive: true
        }
      },
      
      {
        path: '/movie',
        name: 'movie',
        component: routesComponents.movieComponent,
        meta: {
          keepAlive: true
        }
      },
      
      {
        path: '/mine',
        name: 'mine',
        component: routesComponents.mineComponent,
        meta: {
          keepAlive: false
        }
      }

    ]
  },

  {
    path: '/movie_detail',
    name: 'movie_detail',
    component: routesComponents.movieDetailComponent,
    meta: {
      keepAlive: true
    }
  },

  {
    path: '/seats_select',
    name: 'seats_select',
    component: routesComponents.seatsSelectComponent,
    meta: {
      keepAlive: false
    }
  },

  {
    path: '/cinema_location',
    name: 'cinema_location',
    component: routesComponents.cinemaLocationComponent,
    meta: {
      keepAlive: true
    }
  },

  {
    path: '/my_collect',
    name: 'my_collect',
    component: routesComponents.myCollectComponent,
    meta: {
      keepAlive: true
    }
  },

  {
    path: '*',
    redirect: '/home'
  }

]

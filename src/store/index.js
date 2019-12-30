import Vue from 'vue'
import Vuex from 'vuex'
import { registerModule } from './registerStore/registerModule'
import { loginModule } from './loginStore/loginModule'
import { indexModule } from './index/indexModule'
import { homeModule } from './indexTabBarComponent/home/homeModule'
import { movieModule } from './indexTabBarComponent/movie/movieModule'
import { foundModule } from './indexTabBarComponent/found/foundModule'
import { mineModule } from './indexTabBarComponent/mine/mineModule'
import { movieDetailModule } from './movieDetail/movieDetailModule'
import { seatsSelectModule } from './seatsSelect/seatsSelectModule'
import { cinemaLocationModule } from './cinemaLocation/cinamaLocationModule'
import { myCollectModule } from './myCollect/myCollectModule'

Vue.use(Vuex)

export default new Vuex.Store({

  modules: {
    registerModule,
    loginModule,
    indexModule,
    homeModule,
    foundModule,
    movieModule,
    mineModule,
    movieDetailModule,
    seatsSelectModule,
    cinemaLocationModule,
    myCollectModule
  }
})

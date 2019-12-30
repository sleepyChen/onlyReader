import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'

export const registerModule = {
  // 启用命名空间
  namespaced: true,
  state,
  mutations,
  getters

}
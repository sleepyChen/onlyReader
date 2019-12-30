import { state } from './state'
import { mutations } from './mutations'
import { getters } from './getters'

export const loginModule = {

  namespaced: true,
  state,
  getters,
  mutations

}
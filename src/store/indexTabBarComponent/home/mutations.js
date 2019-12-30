export const mutations = {

  movies(state, obj) {
    state.movies[obj.type] = obj.datas;
  },

  setValue(state, value) {
    state.value = value;
  },

  setCity(state, city) {
    state.city = city;
  },

  setApi(state, obj) {
    state.api[obj.index].loaded = obj.isLoad;
  }

}

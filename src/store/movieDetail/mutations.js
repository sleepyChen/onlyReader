export const mutations = {

  saveId(state, id) {
    state.id = id;
  },

  movieDetail(state, datas) {
    state.currentMoviedetails = datas;

  },

  allDesc(state) {
    state.all = true;
  },

  isPhotoLarge(state, img) {
    state.imgLarge.show = !state.imgLarge.show;
    state.imgLarge.showImg = img ? img : '';
  }

}
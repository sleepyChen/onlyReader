class RoutesComponents{

  registerComponent() {
    return import('../views/Register.vue');
  }
  
  loginComponent() {
    return import('../views/Login.vue');
  }

  indexComponent() {
    return import('../views/Index.vue');
  }

  homeComponent() {
    return import('../views/indexTabbarComponent/Home.vue');
  }

  foundComponent() {
    return import('../views/indexTabbarComponent/Found.vue');
  }

  movieComponent() {
    return import('../views/indexTabbarComponent/Movie.vue');
  }

  mineComponent() {
    return import('../views/indexTabbarComponent/Mine.vue');
  }

  movieDetailComponent(){
    return import('../views/MovieDetail.vue');
  }
  
  seatsSelectComponent(){
    return import('../views/SeatsSelect.vue');
  }

  cinemaLocationComponent(){
    return import('../views/cinemaLocation.vue');
  }

  myCollectComponent(){
    return import('../views/myCollect.vue');
  }

}

export const routesComponents = new RoutesComponents();
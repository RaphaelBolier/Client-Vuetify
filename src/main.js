import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';

import ListeDesRestaurants from './components/ListeDesRestaurants';
import MapRestaurant from './components/MapRestaurant';

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: '',
      component: ListeDesRestaurants
    },
    {
      path: '/Map/:id',
      component: MapRestaurant
    },

  ]
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

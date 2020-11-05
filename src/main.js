import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';
import 'leaflet/dist/leaflet.css';

import ListeDesRestaurants from './components/ListeDesRestaurants';
import MapRestaurant from './components/MapRestaurant';

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'Acceuil',
      path: '/',
      component: ListeDesRestaurants
    },
    {
      name: 'Map',
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

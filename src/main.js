import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuetify from 'vuetify/lib';

import ListeDesRestaurants from './components/ListeDesRestaurants';
import Detail from './components/Detail';

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
      path: '/Detail/:id',
      component: Detail
    },

  ]
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import MainPage from './components/MainPage.vue'
import loginPage from './components/loginPage.vue'
import Panel from './components/Panel.vue'
import Logout from './components/Logout.vue'
import TransferPage from './components/TransferPage.vue'

Vue.use(VueRouter)

const router =  new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: MainPage },
    { path: '/login', component: loginPage },
    { path: '/panel', component: Panel },
    { path: '/logout', component: Logout },
    { path: '/transfer', component: TransferPage },
  ]
})

export const globalStore = new Vue({
  data: {
    globalUser: '',
    isAuthenticated: false,
    clientData: {},
  }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

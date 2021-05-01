import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Error from './components/Error.vue'
import MainPage from './components/MainPage.vue'
import Login from './components/Login.vue'
import Box from './components/Box.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: MainPage },
    { path: '/login', component: Login },
    { path: '*', component: Error },
    { path: '/box', component: Box },
  ] 
})

export const globalStore = new Vue({
  data: {
    globalUser: '',
    isAuthenticated: false,
    serverInfo: ''
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

<template>
  <div>
    <NavigationBar />
    <Home v-bind:arr="arr" v-on:info="alertInfo"/>
  </div>
</template>

<script>
import { globalStore } from '../main.js';
import navigationBar from './NavigationBar.vue';
import Home from './Home.vue';

export default {
  name: 'MainPage',
  components: {
    NavigationBar: navigationBar,
    Home
  },
  data() {
    return {
        arr: ['vuex', 'vue-devtools', 'vue-loader', 'awesome-vue'],
        localState: globalStore,
    }
  },
  methods: {
    alertInfo() {
      alert('Working');
    }
  }
}
</script>


<style>
@import '../assets/styles/style.css';
</style>

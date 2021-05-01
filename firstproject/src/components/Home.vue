<template>
    <div class="hello">
      <h1 v-if="localState.isAuthenticated">{{ localState.globalUser }}</h1>
      <h1>{{ localState.isAuthenticated }}</h1>
      <p>
        For a guide and recipes on how to configure / customize this project,<br>
        check out the
        <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
      </p>
      <h3>Installed CLI Plugins</h3>
      <ul>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
        <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      </ul>
      <h3> {{ arr }} </h3>
      <ul>
        <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
        <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
      </ul>
      <h3>Ecosystem</h3>
      <ul>
        <li v-for="a in arr" v-bind:key="a"><a href="" target="_blank" rel="noopener">{{ a }}</a></li>
      </ul>
      <div class="percentCircleBox">
        <svg class="percentCircle">
            <circle 
              r="100" 
              cx="50%" 
              cy="50%" 
              stroke="lightgray" 
              fill="none" 
              stroke-width="9" 
              stroke-linecap="round" 
              stroke-dasharray="628, 628"
            >
            </circle>
            <circle 
              id="success-value" 
              r="100" 
              cx="50%" 
              cy="50%" 
              stroke="lightgray" 
              fill="none" 
              stroke-width="10" 
              stroke-linecap="round" 
              stroke-dasharray="0, 628"
            >
            </circle>
        </svg>
        <p id="percentText">{{ percentage }}%</p>
        <input type="number" name="percentage" v-model="percentage" placeholder="0" min="0" max="100" v-on:blur="returnToZeroValue">
      </div>
      <button @click="auth">Klik!</button>
      <button @click="(e) => info(e)" draggable="true">Button!</button>
    </div>
</template>

<script>
import { globalStore } from '../main.js';

export default {
    name: 'Home',
    data() {
        return {
            percentage: 0,
            localState: globalStore,
        }
    },
    watch: {
      percentage() {
        const circle = document.getElementById('success-value');
        let successValue = (this.percentage/100)*628;

        circle.style.strokeDasharray = `${successValue}, 628`;
        if(this.percentage == 0) {
          return circle.style.stroke = 'lightgray';
        } else {
          return circle.style.stroke = 'darkblue';
        }
      }
    },
    mounted () {
      window.addEventListener('scroll', this.ScrollingEvent)
    },
    beforeDestroy () {
      window.removeEventListener('scroll', this.ScrollingEvent)
    },
    props: {
        arr: Array,
    },
    methods: {
        auth() {
            globalStore.isAuthenticated === false ? globalStore.isAuthenticated = true : globalStore.isAuthenticated = false;
        },
        ScrollingEvent() {
           const div = document.querySelector('.hello');
           let toTop = div.getBoundingClientRect().top;
           if(toTop <= 30) {
             div.style.backgroundColor = '#006dba';
             div.style.transition = 'all .2s linear';
           } else {
             div.style.backgroundColor = 'white';
             div.style.transition = '';
           }
        },
        returnToZeroValue() {
          if(this.percentage === '') {
            return this.percentage = 0;
          }
        },
        info(e) {
          e.preventDefault();
          console.log(e.target)
          this.$emit('info');
        }
    }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
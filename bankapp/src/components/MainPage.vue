<template>
  <div>
    <NavigationBar />
    <Home />
  </div>
</template>

<script>
import NavigationBar from './NavigationBar'
import Home from './Home'

export default {
  name: 'MainPage',
  components: {
    NavigationBar,
    Home
  }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>

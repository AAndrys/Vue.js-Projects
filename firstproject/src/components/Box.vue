<template>
  <div>
      <NavigationBar />
      <div class="box-container">
          <div class="draggable-box" draggable="true" v-on:mousedown="boxDrag"></div>
      </div>
  </div>
</template>

<script>
import navigationBar from './NavigationBar.vue';
export default {
    name: 'Box',
    components: {
        NavigationBar: navigationBar
    },
    data() {
        return {
            msg: 'hhhh',
        }
    },
    methods: {
        boxDrag() {
            const box = document.querySelector('.box-container');
            const dragBox = document.querySelector('.draggable-box');
            let moving = true;
            const onMouseUpEvent = () => {
                moving = false;
                box.removeEventListener('mousemove', onMouseMoveEvent);
                // box.removeEventListener('mouseup', onMouseUpEvent);
            }
            const onMouseMoveEvent = (e) => {
                if(moving) {
                    dragBox.style.left = e.clientX - 100 + 'px';
                    // dragBox.style.top = mousePosition - 100 + 'px';
                    dragBox.style.top = Math.floor(e.clientY - (60/100 * window.screen.height)) + 100 + 'px';
                    // console.log(Math.floor(e.clientY - (60/100 * window.innerHeight)));
                    // console.log(Math.floor(e.clientY - (60/100 * window.pageYOffset)));
                    // console.log(window.screen.height)
                }
            }
            box.addEventListener('mousemove', (e) => onMouseMoveEvent(e));
            box.addEventListener('mouseup', onMouseUpEvent);
        },
    }
}
</script>

<style>
@import '../assets/styles/style.css';
</style>
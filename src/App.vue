<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <the-header></the-header>

  <RouterView />
</template>
<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  components: {
    TheHeader
  },
  created() {
    this.$store.dispatch('autoLogin');
  },
}
</script>

<style  >

 @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

 * {
   box-sizing: border-box;
 }

 html {
   font-family: "Roboto", sans-serif;
 }

 body {
   margin: 0;
 }
</style>

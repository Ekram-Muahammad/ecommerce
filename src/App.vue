<script setup lang="ts">
import { RouterView } from 'vue-router'
import Navbar from '@/components/navbar.vue'
</script>

<template>
  <div class="w-screen">
    <Navbar />
    <RouterView :key="$route.fullPath" />
  </div>
</template>

<style>
#app {
  max-width: 100vw !important;
  padding: 0px !important;

}

*,
*::before,
*::after {
  margin: revert !important;
  font-weight: revert !important;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}
</style>
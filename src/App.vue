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
  min-height: 100vh !important;
}

*,
*::before,
*::after {
  font-weight: revert !important;
}

#app {
  margin-top: 0px !important;
  margin-right: auto !important;
  margin-bottom: 0px !important;
  margin-left: auto !important;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
  padding: 3px;
}
</style>
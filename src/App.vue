<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
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
</style>
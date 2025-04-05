<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
</script>

<template>
  <div class="container w-screen mx-auto px-4">
    <Navbar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <div class="wrapper">
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </div> -->

  <!-- <h1 class="text-9xl">Welcome to Your Vue.js App</h1> -->

  <div class="container w-screen mx-auto px-4">
    <RouterView />
  </div>
</template>

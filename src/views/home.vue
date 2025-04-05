<template>
  <Categories />
  <Products />
  <favourites />
  <LastVisited />
</template>


<script setup lang="ts">
import Categories from '@/components/categories.vue';
import Products from '@/components/Products.vue';
import favourites from '@/components/favourites.vue';
import LastVisited from '@/components/lastVisit.vue';
</script>

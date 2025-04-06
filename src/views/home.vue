<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 lg:grid-cols-12 gap-6">
    <!-- CategoryList takes up 3 columns -->
    <div class="col-span-12 md:col-span-2">
      <CategoryList />
    </div>

    <!-- Other elements take up 9 columns -->
    <div class="col-span-12 md:col-span-10">
      <!-- <Categories /> -->
      <Products :category="category" />
      <favourites />
      <LastVisited />
    </div>
  </div>

</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import Products from '@/components/products.vue';
import favourites from '@/components/favourites.vue';
import LastVisited from '@/components/lastVisit.vue';
import CategoryList from '@/components/categoryList.vue';

const route = useRoute();
const category = route.params.category as string;



</script>

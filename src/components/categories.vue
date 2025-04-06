<template>
  <div class="w-full px-4 py-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-10">Categories</h2>

    <div v-if="categoryStore.isLoading">Loading...</div>
    <div v-else-if="categoryStore.isError">Error fetching categories</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <ProductCategory v-for="category in categoryStore.categories" :category="category" :key="category.id"

     ></ProductCategory>
    </div>

  </div>


</template>


<script setup lang="ts">
import {  onMounted } from 'vue';
import ProductCategory from '@/components/category.vue';

import { useCategoryStore } from '@/stores/category';

const categoryStore = useCategoryStore();

onMounted(async () => {
  categoryStore.fetchCategories();
});


</script>

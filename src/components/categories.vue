<template>
  <div class="w-full px-4 py-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-10">Categories</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">


      <ProductCategory v-for="category in categories" :category="category"
     ></ProductCategory>


    </div>

  </div>


</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ApiService from '@/services/api';
import type { Category } from '../interfaces';
import ProductCategory from '@/components/category.vue';



const categories = ref<Category[]>([]);

const fetchCategories = async () => {
  try {
    const response = await ApiService.get<{ data: Category[] }>(`/categories`);
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Fetch data on component mount
onMounted(async () => {
  fetchCategories();
});


</script>

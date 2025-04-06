<template>

<div class="mt-20 border-t border-gray-200 pt-8 px-4">
  <h3 class="text-xl font-semibold text-gray-800 mb-8">Categories</h3>
  <ul role="list" class="space-y-2">
    <li v-for="category in categories" :key="category.id">
      <router-link  :to="'/'+category.slug" class="block px-4 py-3 rounded-lg text-gray-900 hover:bg-gray-100 transition duration-200 ease-in-out">
        {{ category.name }}
      </router-link>
    </li>
  </ul>
</div>

</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ApiService from '@/services/api';
import type { Category } from '../interfaces';



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

<template>



  <div class="w-full px-4 py-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-6">Products</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

      <ProductCard v-for="product in products" :product="product"></ProductCard>

    </div>
  </div>



</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ProductCard from '@/components/Product.vue';
import ApiService from '@/services/api';
import { Product } from '../interfaces';


const products = ref<Product[]>([]);

// Fetch data on component mount
onMounted(async () => {
  try {
    const response = await ApiService.get<{ data: Product[] }>('/products?offset=0&limit=10'); // Change to your API endpoint
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

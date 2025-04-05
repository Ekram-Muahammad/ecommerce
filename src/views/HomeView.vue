<template>



  <div class="w-full px-4 py-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-6">Products</h2>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

      <ProductCard v-for="i in 10" :product="product"></ProductCard>
    </div>
  </div>



</template>


<script setup lang="ts">
import { ref } from 'vue';
import ProductCard from '@/components/Product.vue';

// Define the Product interface
interface Product {
  name: string;
  image: string;
  color: string;
  price: string;
  link: string;
}

// Initialize the product data with ref
const product = ref<Product>({
  name: 'Black T-Shirt',
  image: 'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg',
  color: 'black',
  price: '10$',
  link: ''
});
</script>

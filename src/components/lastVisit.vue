<template>
  <div class="w-full px-4 py-8" v-if="lastProducts.length">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-6">Last Visited</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <ProductCard v-for="product in lastProducts" :product="product"></ProductCard>
    </div>
  </div>
</template>


<script setup lang="ts" >
import { ref, computed } from 'vue';
import ProductCard from '@/components/product.vue';
import { useLastVisitStore } from '@/stores/lastVisit'

const lastVisitStore = useLastVisitStore()

const lastProducts = computed(() => lastVisitStore.lastVisitedProducts );
</script>

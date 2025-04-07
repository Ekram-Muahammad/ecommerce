<template>
  <div class="w-full px-4 py-8" v-if="favoriteProducts.length">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-6">Favourites</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <ProductCard v-for="product in favoriteProducts" :product="product" :key="product.id"></ProductCard>
    </div>
  </div>
</template>


<script setup lang="ts">
import { defineProps, computed } from 'vue';
import ProductCard from '@/components/product.vue';
import { useFavoriteStore } from '@/stores/favourite'

const props = defineProps({
  showAll: {
    type: Boolean,
    default: false,
  }
});

const favoriteStore = useFavoriteStore()

const favoriteProducts = computed(() => {
  return favoriteStore.favoriteProducts
    .slice()
    .reverse()
    .slice(0, props.showAll ? favoriteStore.favoriteProducts.length : 5);
});

</script>

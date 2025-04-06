<template>

  <div class="mt-20 border-t border-gray-200 pt-8 px-4">
    <h3 class="text-xl font-semibold text-gray-800 mb-8">Product</h3>
    {{product}}
  </div>

  </template>


  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { ref, onMounted } from 'vue';
  import ApiService from '@/services/api';
  import type { Product } from '@/interfaces/';
  import { useLastVisitStore } from '@/stores/lastVisit'

  const product = ref<Product>(null);
  const route = useRoute();
  const slug = route.params.slug as string;
  const lastVisitStore = useLastVisitStore()

  const fetchItem = async () => {
    try {
      const response = await ApiService.get<{ data: Product }>(`/products/slug/`+slug);
      product.value = response.data;
      addLastVisited(product.value);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const addLastVisited = (product: Product) => {
  if (!lastVisitStore.isLastVisited(product.id)) {
    lastVisitStore.addLastVisited(product);
  }
};

  // Fetch data on component mount
  onMounted(async () => {
    fetchItem();
  });


  </script>

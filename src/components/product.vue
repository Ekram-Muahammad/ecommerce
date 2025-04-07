<template>
  <router-link :to="'/product/' + product.slug">

    <div class="group bg-white rounded-2xl shadow p-4">
      <!-- Product Image -->
      <img v-lazy="product.images[0]" :alt="product.title"
        class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 transition">

      <!-- Product Info -->

      <div class="mt-5  flex justify-between items-center">
        <h3 class="text-sm text-gray-700 font-semibold">
          <router-link :to="'/category/' + product.category.id" class="hover:underline">{{ product.category.name
          }}</router-link>
        </h3>
        <span :class="{ 'text-red-500': isFavorite, 'mt-3': true }" @click="toggleFavorite">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" class="w-5 h-5">
            <path
              d="M3.172 4.828a4 4 0 015.657 0L10 6.243l1.171-1.415a4 4 0 115.657 5.657l-6.364 6.364a1 1 0 01-1.414 0L3.172 10.828a4 4 0 010-5.657z" />
          </svg>
        </span>
      </div>

      <div class="mt-4 flex justify-between items-start">
        <div>
          <h3 class="text-sm text-gray-700 font-semibold">
            <p>{{ product.title }}</p>
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ product.description.length > 30 ? product.description.substring(0, 30) + " ..." : product.description }}
          </p>
        </div>
        <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>



      </div>
    </div>
  </router-link>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import type { PropType } from 'vue';
import { useFavoriteStore } from '@/stores/favourite';
import type { Product } from '@/interfaces/';

const props = defineProps({
  product: {
    type: Object as PropType<Product>,
    required: true
  }
});

const favoriteStore = useFavoriteStore();

const isFavorite = computed(() => favoriteStore.isFavorite(props.product.id));

const toggleFavorite = (event: MouseEvent) => {
  event.preventDefault();
  if (isFavorite.value) {
    favoriteStore.removeFavorite(props.product.id);
  } else {
    favoriteStore.addFavorite(props.product);
  }
};
</script>


<style scoped>
/* Scoped styling for the component, if needed */
</style>

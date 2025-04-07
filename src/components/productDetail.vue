<template>

  <div class="bg-gray-100">
    <div class="container mx-auto px-4 py-8" v-if="product != null">

      <div class="flex flex-wrap -mx-4">

        <!-- Product Images -->
        <div class="w-full md:w-1/2 px-4 mb-12" style="margin-bottom:12px">
          <img v-lazy="mainImage" alt="Product" class="w-full h-auto rounded-lg shadow-md mb-4" id="mainImage">

          <div class="flex gap-4 py-4 justify-center overflow-x-auto">
            <img v-for="image in product.images" v-lazy="image" alt="Thumbnail 1" :key="image"
              @click="mainImage = image"
              class="size-16 sm:size-20 object-cover rounded-md cursor-pointer opacity-60 hover:opacity-100 transition duration-300" />
          </div>
        </div>

        <!-- Product Details -->
        <div class="w-full md:w-1/2 px-4">
          <h2 class="text-3xl font-bold mb-2">{{ product.title }}</h2>
          <p class="text-gray-600 mb-4">{{ product.category.name }}</p>
          <div class="mb-4">
            <span class="text-2xl font-bold mr-2">${{ product.price }}</span>
          </div>

          <p class="text-gray-700 mb-6">
            {{ product.description }}
          </p>





          <div class="flex space-x-4 mb-6">

            <button @click="toggleFavorite"
              class="bg-gray-200 flex gap-2 items-center  text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
              {{ isFavorite ? "Remove Wishlist" : "Add to Wishlist" }}
            </button>
          </div>


        </div>
      </div>
    </div>

    <div v-if="isLoading" class="text-center">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-12 mx-3">Loading...</h2>
    </div>

    <div v-if="isError" class="text-center">
      <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-12 mx-3">Error fetching data</h2>
    </div>

  </div>

  <favourites />

</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted, computed } from 'vue';
import ApiService from '@/services/api';
import type { Product } from '@/interfaces/';
import { useLastVisitStore } from '@/stores/lastVisit'
import favourites from '@/components/favourites.vue';
import { useFavoriteStore } from '@/stores/favourite';

const product = ref<Product | null>(null);
const route = useRoute();
const slug = route.params.slug as string;
const lastVisitStore = useLastVisitStore()
const mainImage = ref<string>('')
const isLoading = ref(true);
const isError = ref(false);


const fetchItem = async () => {
  try {
    isLoading.value = true;
    isError.value = false;
    const response = await ApiService.get<{ data: Product }>(`/products/slug/` + slug);
    isLoading.value = false;

    // @ts-ignore
    product.value = response.data;

    if (product.value !== null && product.value.images.length > 0) {
      mainImage.value = product.value.images[0];  // Safely access images
    }

    if (product.value !== null) {
      addLastVisited(product.value);
    }

  } catch (error) {
    isLoading.value = false;
    isError.value = true;
    console.error('Error fetching data:', error);
  }
};

const addLastVisited = (product: Product) => {
  if (product === null) return;
  if (!lastVisitStore.isLastVisited(product.id)) {
    lastVisitStore.addLastVisited(product);
  }
};

const favoriteStore = useFavoriteStore();


const isFavorite = computed(() => {
  if (product.value !== null) {
    return favoriteStore.isFavorite(product.value.id);
  }
  return false;
});

const toggleFavorite = (event: MouseEvent) => {
  event.preventDefault();

  if (isFavorite.value) {
    if (product.value === null) return;
    favoriteStore.removeFavorite(product.value.id);
  } else {
    if (product.value === null) return;
    favoriteStore.addFavorite(product.value);
  }
};

// Fetch data on component mount
onMounted(async () => {
  fetchItem();
});


</script>

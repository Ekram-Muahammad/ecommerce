<template>
  <div class="w-full px-4 py-8">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-6">Products</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <ProductCard v-for="product in products" :product="product"
        @click="toggleFavorite(product); addLastVisited(product)"></ProductCard>
    </div>

    <Pagination :page="currentPage" :pagesNumber="totalPages" @update:page="setPage($event)" />
  </div>


</template>


<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import ProductCard from '@/components/Product.vue';

import Pagination from '@/components/Pagination.vue';
import ApiService from '@/services/api';
import { Product } from '../interfaces';
import { useSearchStore } from '@/stores/search'
import { useFavoriteStore } from '@/stores/favourite'
import { useLastVisitStore } from '@/stores/lastVisit'


const props = defineProps({
  category: {
    type: String,
    default: '',
  },
});


const products = ref<Product[]>([]);

const currentPage = ref(1);
const totalPages = ref(5);

const searchStore = useSearchStore()
const searchTerm = computed(() => searchStore.searchTerm)

const favoriteStore = useFavoriteStore()
const lastVisitStore = useLastVisitStore()


const fetchProducts = async (page: number) => {
  try {
    const offset = (page - 1) * 10; // Assuming 10 products per page
    const searchQuery = searchTerm.value ? `&title=${searchTerm.value}` : '';
    const categoryQuery = props.category ? `&categorySlug=${props.category}` : '';


    const response = await ApiService.get<{ data: Product[] }>(`/products?offset=${offset}&limit=10${searchQuery}${categoryQuery}`);
    products.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const setPage = (pageNumber: number) => {
  if (pageNumber < 1 || pageNumber > totalPages.value) return; // Validate page number
  currentPage.value = pageNumber;
  fetchProducts(pageNumber);
};


const toggleFavorite = (product: Product) => {
  if (favoriteStore.isFavorite(product.id)) {
    favoriteStore.removeFavorite(product.id);
  } else {
    favoriteStore.addFavorite(product);
  }
};

const addLastVisited = (product: Product) => {
  if (!lastVisitStore.isLastVisited(product.id)) {
    lastVisitStore.addLastVisited(product);
  }
};

const isLastVisited = (productId: number): boolean => {
  return lastVisitStore.isLastVisited(productId);
};

const isFavorite = (productId: number): boolean => {
  return favoriteStore.isFavorite(productId);
};


// Fetch data on component mount
onMounted(async () => {
  fetchProducts(currentPage.value);
});

watch(searchTerm, (newSearchTerm, oldSearchTerm) => {
  fetchProducts(currentPage.value);
})
</script>

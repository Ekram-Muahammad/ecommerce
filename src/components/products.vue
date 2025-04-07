<template>
  <div class="w-full px-4 py-8" v-if="products.length > 0">
    <div class="flex justify-between">

      <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-12 mx-3">Products</h2>

      <div class="flex items-center">
        Sort By : &nbsp; &nbsp;
        <SearchableDropdown v-model="sortColumn" :options="['title', 'price']" placeholder="Search by title or price" />
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <ProductCard v-for="product in products" :product="product" :key="product.id"></ProductCard>
    </div>

    <Pagination :page="currentPage" :pagesNumber="totalPages" @update:page="setPage($event)" />
  </div>

  <div v-if="products.length == 0 && isLoading == false">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-12 mx-3">No Products Found</h2>
  </div>

  <div v-if="isLoading">
    <h2 class="text-2xl font-bold tracking-tight text-gray-900 mb-12 mx-3">Loading...</h2>
  </div>


</template>


<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import ProductCard from '@/components/product.vue';

import Pagination from '@/components/pagination.vue';
import ApiService from '@/services/api';
import type { Product } from '../interfaces';
import { useSearchStore } from '@/stores/search'
import SearchableDropdown from '@/components/multi-select.vue';


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
const sortColumn = ref(null);

const isLoading = ref(false);

const fetchProducts = async (page: number) => {
  try {
    const offset = (page - 1) * 10; // Assuming 10 products per page
    const searchQuery = searchTerm.value ? `&title=${searchTerm.value}` : '';
    const categoryQuery = props.category ? `&categorySlug=${props.category}` : '';

    isLoading.value = true;

    const response = await ApiService.get<{ data: Product[] }>(`/products?offset=${offset}&limit=10${searchQuery}${categoryQuery}`);
    // @ts-ignore
    products.value = response.data;
    isLoading.value = false;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const sortProducts = () => {
  if (sortColumn.value) {
    products.value.sort((a, b) => {
      let comparison = 0;
      if (sortColumn.value !== null) {

        if (a[sortColumn.value] < b[sortColumn.value]) {
          comparison = -1;
        } else if (a[sortColumn.value] > b[sortColumn.value]) {
          comparison = 1;
        }
      }

      return comparison;
    });
  }
};

const setPage = (pageNumber: number) => {
  if (pageNumber < 1 || pageNumber > totalPages.value) return;
  currentPage.value = pageNumber;
  fetchProducts(pageNumber);
};










// Fetch data on component mount
onMounted(async () => {
  fetchProducts(currentPage.value);
});

watch(searchTerm, (newSearchTerm, oldSearchTerm) => {
  fetchProducts(currentPage.value);
})

watch([sortColumn], sortProducts);

</script>

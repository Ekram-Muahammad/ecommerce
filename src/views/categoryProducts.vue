<template>
  <Products :category="category" />
</template>


<script setup lang="ts">
import { useRoute } from 'vue-router';
import Products from '@/components/Products.vue';

const route = useRoute();
const category = route.params.slug;
</script>

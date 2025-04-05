<template>
  <div class="group bg-white rounded-2xl shadow p-4">
    <!-- Product Image -->
    <img :src="product.images[0]" :alt="product.title"
      class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 transition">

    <!-- Product Info -->
    <div class="mt-4 flex justify-between items-start">
      <div>
        <h3 class="text-sm text-gray-700 font-semibold">
          <a :href="product.link" class="hover:underline">{{ product.title }}</a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
      </div>
      <p class="text-sm font-medium text-gray-900">${{ product.price }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Scoped styling for the component, if needed */
</style>

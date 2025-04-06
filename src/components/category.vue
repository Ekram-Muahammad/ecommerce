<template>
 <router-link :to="'/category/'+category.slug" >
  <div class="group relative">
          <img :src="category.image" :alt="category.name"
          class="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 transition">

          <p class="text-base font-semibold text-gray-900">{{ category.name }}</p>
        </div>
      </router-link>
</template>

<script>
export default {
  name: 'ProductCategory',
  props: {
    category: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
/* Scoped styling for the component, if needed */
</style>

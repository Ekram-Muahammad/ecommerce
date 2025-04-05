// stores/favoriteStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../interfaces/product.interface'

export const useFavoriteStore = defineStore('favorites', () => {
  const favoriteProducts = ref<Product[]>([]) // List to store favorite products

  function addFavorite(product: Product) {
    if (!favoriteProducts.value.find((p) => p.id === product.id)) {
      favoriteProducts.value.push(product)
    }
  }

  function removeFavorite(productId: number) {
    favoriteProducts.value = favoriteProducts.value.filter((p) => p.id !== productId)
  }

  function isFavorite(productId: number) {
    return favoriteProducts.value.some((p) => p.id === productId)
  }

  return {
    favoriteProducts,
    addFavorite,
    removeFavorite,
    isFavorite,
  }
})

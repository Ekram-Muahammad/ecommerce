import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../interfaces/product.interface'

export const useLastVisitStore = defineStore('lastVisited', () => {
  const lastVisitedProducts = ref<Product[]>([]) // List to store last visited products

  function addLastVisited(product: Product) {
    const existingIndex = lastVisitedProducts.value.findIndex((p) => p.id === product.id)

    if (existingIndex !== -1) {
      lastVisitedProducts.value.splice(existingIndex, 1)
    }

    lastVisitedProducts.value.unshift(product)

    if (lastVisitedProducts.value.length > 5) {
      lastVisitedProducts.value.pop()
    }
  }

  function removeLastVisited(productId: number) {
    lastVisitedProducts.value = lastVisitedProducts.value.filter((p) => p.id !== productId)
  }

  function isLastVisited(productId: number) {
    return lastVisitedProducts.value.some((p) => p.id === productId)
  }

  return {
    lastVisitedProducts,
    addLastVisited,
    removeLastVisited,
    isLastVisited,
  }
})

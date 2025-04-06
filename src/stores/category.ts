import { defineStore } from 'pinia'
import { ref } from 'vue'
import ApiService from '@/services/api'
import type { Category } from '@/interfaces'

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const isError = ref(false)

  const fetchCategories = async () => {
    if (categories.value.length === 0) {
      isLoading.value = true
      try {
        const response = await ApiService.get<{ data: Category[] }>('/categories')
        // @ts-ignore
        categories.value = response.data
        isError.value = false
      } catch (error) {
        console.error('Error fetching categories:', error)
        isError.value = true
      } finally {
        isLoading.value = false
      }
    }
  }

  fetchCategories()

  return { categories, isLoading, isError, fetchCategories }
})

<template>
  <nav class="bg-gray-800">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <!-- Mobile menu button -->
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button @click="isOpen = !isOpen" type="button"
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu" :aria-expanded="isOpen.toString()">
            <span class="sr-only">Open main menu</span>

            <!-- Menu closed icon -->
            <svg v-if="!isOpen" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

            <!-- Menu open icon -->
            <svg v-else class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Logo and desktop nav -->
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <!-- <div class="flex shrink-0 items-center">
            <img class="h-8 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
              alt="Logo" />
          </div> -->
          <div class="hidden ml-10 sm:flex sm:space-x-6">
            <router-link v-for="item in navItems" :key="item.path" :to="item.path" :class="[
              'py-2 px-4 rounded-md text-sm font-medium transition-all duration-150',
              route.path === item.path
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-700'
            ]">
              {{ item.name }}
            </router-link>
          </div>
        </div>


        <div class="hidden sm:flex sm:items-center sm:ml-auto"  v-if="$route.name === 'home'">
          <input type="text" placeholder="Search..." v-model="searchTerm"
            class="w-60 rounded-md border border-transparent bg-gray-700 px-3 py-1.5 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white transition-all" />
        </div>

      </div>
    </div>

    <!-- Mobile menu -->
    <div class="sm:hidden" id="mobile-menu" v-show="isOpen">
      <div class="space-y-1 px-2 pt-2 pb-3">

        <div class="pb-2" v-if="$route.name === 'home'">
          <input type="text" placeholder="Search..." v-model="searchTerm"
            class="w-full rounded-md border border-transparent bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-white focus:outline-none focus:ring-2 focus:ring-white transition-all" />
        </div>

        <router-link v-for="item in navItems" :key="item.path" :to="item.path" :class="[
          'block rounded-md px-3 py-2 text-base font-medium transition-all duration-150',
          route.path === item.path
            ? 'bg-gray-900 text-white'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        ]">
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSearchStore } from '@/stores/search'


const searchStore = useSearchStore()

const isOpen = ref(false)
const route = useRoute()

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'categories', path: '/categories' },
  { name: 'favorites', path: '/favorites' },
]


const searchTerm = computed({
  get: () => searchStore.searchTerm,
  set: (value) => searchStore.setSearchTerm(value)
})


</script>

<style scoped>
a,
.green {
  padding-inline: calc(var(--spacing)* 3) !important;
}
</style>
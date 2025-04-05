<script>
export default {
  props: {
    pagesNumber: {
      type: Number, // Total number of pages
      required: true,
      default: 1,
    },
    page: {
      type: Number, // Current page
      required: true,
      default: 1,
    },
  },
  computed: {
    pageNumbers() {
      const totalPages = this.pagesNumber;
      const currentPage = this.page;
      const windowSize = 2;
      let start = currentPage - windowSize;
      let end = currentPage + windowSize;

      if (start < 1) {
        start = 1;
        end = Math.min(totalPages, start + 4);
      }

      if (end > totalPages) {
        end = totalPages;
        start = Math.max(1, end - 4);
      }

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    },
  },
  methods: {
    changePage(newPage) {
      if (newPage >= 1 && newPage <= this.pagesNumber) {
        this.$emit("update:page", newPage);
      }
    },
  },
};
</script>

<template>
   <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div class="flex flex-1 justify-between sm:hidden">
        <a href="#"  @click.prevent="changePage(page - 1)" v-if="page > 1"
          class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
        <a href="#" @click.prevent="changePage(page + 1)" v-if="page < pagesNumber"
          class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
      </div>
      <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">

        <div>
          <nav class="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">

            <a href="#" @click.prevent="changePage(page-+ 1)" v-if="page > 1"
              class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Previous</span>
              <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd" />
              </svg>
            </a>

            <a href="#" aria-current="page" @click.prevent="changePage(pageNumber)" v-for="pageNumber in pageNumbers" :key="pageNumber"

              :class="{
                  'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600': pageNumber === page,
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0': pageNumber !== page,
                }"
            >
              {{pageNumber}}
            </a>

              <a href="#" @click.prevent="changePage(page + 1)" v-if="page < pagesNumber"
              class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
              <span class="sr-only">Next</span>
              <svg class="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                <path fill-rule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
</template>

<style scoped>
a,
.green {
  padding: 0.5rem 1rem;
}
</style>

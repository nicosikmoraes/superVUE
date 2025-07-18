import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLandingStore = defineStore('landing', () => {
  // Variáveis
  const filtersName = ref([])
  //const landingProducts = ref([])
  const landingProducts = ref(Array.from({ length: 50 }, (_, i) => `Item ${i + 1}`))
  const currentPage = ref(1)
  const itemsPerPage = ref(8)

  const loadingProducts = ref(false)

  const totalPages = computed(() => Math.ceil(landingProducts.value.length / itemsPerPage.value))

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage.value
    const end = start + itemsPerPage.value
    return landingProducts.value.slice(start, end)
  })

  function nextPage() {
    if (currentPage.value < totalPages.value) currentPage.value++
  }

  function prevPage() {
    if (currentPage.value > 1) currentPage.value--
  }

  // Retornando
  return {
    filtersName,
    landingProducts,
    loadingProducts,
    paginatedItems,
    currentPage,
    itemsPerPage,
    nextPage,
    prevPage,
  }
})

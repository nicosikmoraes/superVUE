import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLandingStore = defineStore('landing', () => {
  // Variáveis
  const filtersName = ref([])
  const landingProducts = ref([])
  const loadingProducts = ref(false)

  // Retornando
  return {
    filtersName,
    landingProducts,
    loadingProducts,
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLandingStore = defineStore('landing', () => {
  // Variáveis
    const filtersName = ref([])

  // Retornando
  return {
    filtersName,
  }
})

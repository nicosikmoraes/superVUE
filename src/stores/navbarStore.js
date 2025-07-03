import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore('navbar', () => {
  // Variáveis
  const showNav = ref(true) //Variável para mostrar a navbar

  // Funções
  function ActiveNav() {
    showNav.value = true //Função para mostrar a navbar
  }

  function InactiveNav() {
    showNav.value = false //Função para esconder a navbar
  }
  // Retornando
  return {
    showNav,
    ActiveNav,
    InactiveNav,
  }
})

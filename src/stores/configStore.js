import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // Variáveis

  // Vai decidir qual menu será exibido, 0 = Perfil, 1 = Segurança
  const whichUserMenu = ref(0)

  // Funções

  // Retornando
  return {
    whichUserMenu,
  }
})

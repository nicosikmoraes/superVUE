import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  // Variáveis

  // Vai decidir qual menu será exibido, 0 = Perfil, 1 = Segurança
  // Adimin páginas 2 = Moderadores, 3 = Categorias, 4 = Produtos, 5 = Pedidos
  const whichMenu = ref(0)

  // Funções

  // Retornando
  return {
    whichMenu,
  }
})

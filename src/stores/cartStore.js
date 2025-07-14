import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useCartStore = defineStore('cart', () => {
  // Variáveis
  const userStore = useUserStore()

  //Caminho padrão da API
  const api = axios.create({
    baseURL: 'http://35.196.79.227:8000',
  })

  // Funções

  // Função para criar um novo carrinho, Vai ser chamado quando o usuário se registrar!
  async function createCart() {
    try {
      const response = await api.post('/cart', null, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      console.log('Carrinho criado com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.error('Erro ao criar carrinho:', err)
      return null
    }
  }
  // Retornando
  return {
    createCart,
  }
})

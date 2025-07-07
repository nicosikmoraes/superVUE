import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import axios from 'axios'

export const useAdminStore = defineStore('admin', () => {
  // Variáveis
  const userStore = useUserStore()

  //Caminho padrão da API
  const api = axios.create({
    baseURL: 'http://35.196.79.227:8000',
  })

  // Funções

  // Função para criar um novo moderador
  async function createModerator(moderator) {
    try {
      const response = await api.post(
        '/users/create-moderator',
        {
          name: moderator.name,
          email: moderator.email,
          password: moderator.password,
          role: 'MODERATOR',
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      console.log('Moderador criado com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.log('Erro no createModerator:', err.response?.data || err.message)
      return null
    }
  }

  // Retornando
  return {
    createModerator,
  }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  // Variáveis

  //Caminho padrão da API
  const api = axios.create({
    baseURL: 'http://35.196.79.227:8000',
  })

  // Funções

  //Função para criar usuário (REGISTER)
  async function createUser(user) {
    try {
      const res = await api.post(
        '/register',
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )

      return res.data
    } catch (err) {
      return null
    }
  }

  //Função para logar usuário (LOGIN)
  async function login(user) {
    try {
      const response = await api.post(
        '/login',
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      )

      console.log('Resposta do login:', response.data)
      return response.data
    } catch (error) {
      console.error('Erro no login:', error.response?.data || error.message)
      return null
    }
  }

  // Retornando
  return {
    createUser,
    login,
  }
})

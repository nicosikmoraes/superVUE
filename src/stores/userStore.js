import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore(
  'user',
  () => {
    // Variáveis

    // Variáveis Arrays
    const userMe = reactive({
      name: '',
      email: '',
      id: '',
      imagem: '',
      role: '',
      token: '',
    })

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

        login(user)

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

        setUserMe(response.data)

        console.log('Resposta do login:', response.data)
        return response.data
      } catch (error) {
        console.error('Erro no login:', error.response?.data || error.message)
        return null
      }
    }

    function setUserMe(data) {
      userMe.name = data.user.name
      userMe.email = data.user.email
      userMe.id = data.user.id
      userMe.imagem = data.user.image_path
      userMe.role = data.user.role
      userMe.token = data.token
    }

    function quitUserMe() {
      userMe.name = ''
      userMe.email = ''
      userMe.id = ''
      userMe.imagem = ''
      userMe.role = ''
      userMe.token = ''
    }

    // Retornando
    return {
      createUser,
      login,
      setUserMe,
      quitUserMe,
      userMe,
    }
  },
  { persist: true },
)

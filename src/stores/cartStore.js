import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'
import { useAlertStore } from './alertasStore'

export const useCartStore = defineStore('cart', () => {
  // Variáveis
  const userStore = useUserStore()
  const canvasCart = ref(false)
  const cartItems = ref([])

  // 0 = Tela do carrinho, 1 = Opção de endereços, 2 = adicionar endereço se preciso, 3 = Tela de pagamento
  const showPage = ref(0)

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

  async function addItemToCart(id, price) {
    //Confere se o item já foi adicionado, se sim aumenta a quantidade
    const existedItem = cartItems.value.items.find((item) => item.product_id === id)
    if (existedItem) {
      updateCartItemQuantity(id, existedItem.quantity)
      return null
    }

    try {
      const response = await api.post(
        '/cart/items',
        {
          product_id: id,
          quantity: 1,
          unit_price: Number(price),
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      return response.data
    } catch (err) {
      console.error('Erro ao adicionar item ao carrinho:', err.response?.data || err.message)
      return null
    }
  }

  async function updateCartItemQuantity(id, newQuantity) {
    newQuantity++
    try {
      const response = await api.put(
        '/cart/items',
        {
          product_id: id,
          quantity: newQuantity,
        },
        {
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      await getCartItems() // Atualiza a lista de itens do carrinho
      return response.data
    } catch (err) {
      console.error('Erro ao atualizar quantidade do item:', err.response?.data || err.message)
      return null
    }
  }
  async function getCartItems() {
    try {
      const res = await api.get('/cart/items', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      cartItems.value = res.data
      return res.data
    } catch (err) {
      console.error('Erro ao obter itens do carrinho:', err.response?.data || err.message)
      return null
    }
  }

  async function removeItemFromCart(id, quantity) {
    if (quantity > 1) {
      quantity = quantity - 2
      await updateCartItemQuantity(id, quantity)
      return null
    }

    try {
      const response = await api.delete('/cart/items', {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
        data: {
          product_id: id,
        },
      })

      await getCartItems() // Atualiza a lista de itens do carrinho
      return response.data
    } catch (err) {
      console.error('Erro ao remover item do carrinho:', err.response?.data || err.message)
      return null
    }
  }

  async function checkCep(cep) {
    try {
      const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)

      if (res.data.erro) {
        console.error('CEP inválido:', cep)
        return null
      }

      console.log('CEP válido:', res.data)
      return res.data
    } catch (err) {
      console.error('Erro ao consultar CEP:', err.response?.data || err.message)
      return null
    }
  }

  // Retornando
  return {
    canvasCart,
    cartItems,
    showPage,
    createCart,
    addItemToCart,
    getCartItems,
    updateCartItemQuantity,
    removeItemFromCart,
    checkCep,
  }
})

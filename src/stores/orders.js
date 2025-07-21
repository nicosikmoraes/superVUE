import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'
import { useAddressStore } from './addressStore'

export const useOrdersStore = defineStore('orders', () => {
  // Variáveis
  const userStore = useUserStore()
  const addressStore = useAddressStore()
  const myOrders = ref([])
  const orders = ref([])
  const lastOrderId = ref(null)

  //Caminho padrão da API
  const api = axios.create({
    baseURL: 'http://35.196.79.227:8000',
  })

  // Funções
  async function createOrder() {
    try {
      const response = await api.post(
        '/orders/',
        {
          address_id: addressStore.selectedAddress.id,
          coupon_id: null,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      console.log('Pedidos atualizados:', response.data)
      lastOrderId.value = response.data.id
      return response.data
    } catch (error) {
      console.error('Erro ao criar pedido:', error)
      throw error
    }
  }

  async function getAllOrders() {
    try {
      const response = await api.get('/orders/all/144', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      const newProducts = response.data
        .filter((order) => order.status !== 'CANCELED') // ou 'CANCELED' se for em inglês
        .map((order) => ({
          ...order,
          loading: false,
        }))

      orders.value = newProducts
      console.log('Pedidos obtidos:', orders.value)
      return response.data
    } catch (error) {
      console.error('Erro ao obter pedidos:', error)
      throw error
    }
  }

  async function getMyOrders() {
    try {
      const response = await api.get('/orders/', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      const newProducts = response.data
        .filter((order) => order.status !== 'CANCELED') // ou 'CANCELED' se for em inglês
        .map((order) => ({
          ...order,
          loading: false,
        }))

      myOrders.value = newProducts
      console.log('Meus pedidos obtidos:', myOrders.value)
      return response.data
    } catch (error) {
      console.error('Erro ao obter pedidos:', error)
      throw error
    }
  }

  async function updateStatus(id, newStatus) {
    if (newStatus === 'CANCELED') {
      await deleteOrder(id)
      return null
    }

    try {
      const response = await api.put(
        `/orders/${id}`,
        {
          status: newStatus,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      console.log('Pedidos atualizados:', response.data)
      await getAllOrders()
      return response.data
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error)
      throw error
    }
  }

  async function deleteOrder(id) {
    try {
      const response = await api.delete(`/orders/${id}`, {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      console.log('Pedidos deletados:', response.data)
      await getAllOrders()
      return response.data
    } catch (error) {
      console.error('Erro ao deletar pedido:', error)
      throw error
    }
  }

  // Retornando
  return {
    orders,
    lastOrderId,
    myOrders,
    createOrder,
    getAllOrders,
    updateStatus,
    getMyOrders,
  }
})

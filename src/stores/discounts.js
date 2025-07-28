import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'
import { useAdminStore } from './adminStore'

export const useDiscountStore = defineStore('discounts', () => {
  // Variáveis
  const userStore = useUserStore()
  const adminStore = useAdminStore()

  const coupons = ref([])
  const coupon_id = ref(null)

  const discounts = ref([])

  //Caminho padrão da API
  const api = axios.create({
    baseURL: 'http://35.196.79.227:8000',
  })

  // Funções
  async function createCupom(data) {
    try {
      const response = await api.post(
        '/coupons/',
        {
          code: data.code,
          discount_percentage: data.discount,
          start_date: convertToISO(data.startDate),
          end_date: convertToISO(data.endDate),
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      return response.data
    } catch (err) {
      console.error('Erro ao criar cupom:', err)
      return null
    }
  }

  function convertToISO(dateStr) {
    if (!dateStr || dateStr.length !== 10) return null

    const [day, month, year] = dateStr.split('/')
    const iso = new Date(`${year}-${month}-${day}T00:00:00Z`)

    return iso.toISOString()
  }

  async function getAllCoupons() {
    try {
      const response = await api.get('/coupons/', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      coupons.value = response.data
      return response.data
    } catch (err) {
      console.error('Erro ao obter cupons:', err.response?.data || err.message)
      return null
    }
  }

  async function deleteCoupon(id) {
    try {
      const response = await api.delete(`/coupons/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      return response.data
    } catch (err) {
      console.error('Erro ao deletar cupom:', err.response?.data || err.message)
      return null
    }
  }

  //===================================== DESCONTOS ========================================

  async function createDiscount(data) {
    try {
      const response = await api.post(
        '/discounts/',
        {
          description: 'SuperVUE',
          discount_percentage: data.discount,
          start_date: convertToISO(data.startDate),
          end_date: convertToISO(data.endDate),
          product_id: adminStore.idProductSelected,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      return response.data
    } catch (err) {
      console.error('Erro ao criar desconto:', err.response?.data || err.message)
      return null
    }
  }

  async function getMyDiscounts() {
    try {
      const response = await api.get('/discounts/', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      const filteredDiscounts = response.data.filter(
        (discounts) => discounts.description === 'SuperVUE',
      )

      await adminStore.getAllProducts()
      const productMap = new Map(adminStore.products.map((product) => [product.id, product.name]))

      discounts.value = filteredDiscounts.map((discounts) => {
        const productName = productMap.get(discounts.product_id) || 'Erro'
        return {
          ...discounts,
          product_name: productName,
        }
      })

      return discounts
    } catch (err) {
      console.error('Erro ao obter descontos:', err.response?.data || err.message)
      return null
    }
  }

  const deleteDiscount = async (id) => {
    try {
      const response = await axios.delete(`http://35.196.79.227:8000/discounts/${id}`, {
        headers: {
          accept: '*/*',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxNDQiLCJyb2xlIjoiQURNSU4iLCJleHAiOjE3NTM0MTgwMjV9.1xnWoPwvBAy_ivfC_0Gv5Pp2WMnNvWPcCYEFvgKxZ5Q',
        },
      })
    } catch (error) {
      console.error('Erro ao deletar desconto:', error)
    }
  }

  // Retornando
  return {
    createCupom,
    convertToISO,
    getAllCoupons,
    deleteCoupon,
    createDiscount,
    getMyDiscounts,
    deleteDiscount,
    coupons,
    coupon_id,
    discounts,
  }
})

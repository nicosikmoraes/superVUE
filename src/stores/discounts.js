import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useDiscountStore = defineStore('discounts', () => {
  // Variáveis
  const userStore = useUserStore()

  const coupons = ref([])
  const coupon_id = ref(null)

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

      console.log('Cupom criado com sucesso!', response.data)
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
      console.log('Cupons obtidos com sucesso:', coupons.value)
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

      console.log('Cupom deletado com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.error('Erro ao deletar cupom:', err.response?.data || err.message)
      return null
    }
  }

  // Retornando
  return {
    createCupom,
    convertToISO,
    getAllCoupons,
    deleteCoupon,
    coupons,
    coupon_id,
  }
})

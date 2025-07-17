import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useCartStore } from './cartStore'

export const usePayStore = defineStore('pay', () => {
  // Variáveis
  const cartStore = useCartStore()

  const abacateToken = ref('abc_dev_rRMxM25fNhmmGWyPhQATN45d')
  const payData = ref([])
  const qrCode = ref('')

  // Funções
  async function createPixQrCode() {
    try {
      const response = await axios.post('http://localhost:3000/api/pix', {
        amount: Number(cartStore.cartItems.total_amount) * 100,
        expiresIn: 36000,
        description: 'Pagamento com abacatepay',
      })

      console.log('QRCode criado com sucesso:', response.data)
      qrCode.value = response.data.qrCode
      payData.value = response.data
      console.log('QrCode:', payData.value)

      // Retorna o QRCode gerado
      return response.data.qrCode
    } catch (err) {
      console.error('Erro ao criar QRCode:', err.response?.data || err.message)
      return null
    }
  }

  async function simulatePayment() {
    console.log('Simulando pagamento com os dados:', payData.value.data.id)

    try {
      const response = await axios.post(
        `http://localhost:3000/api/pixQrCode/simulate-payment?id=${payData.value.data.id}`,
        {
          metadata: {},
        },
      )

      console.log('Simulado o pagamento com sucesso:', response.data)
      return response.data
    } catch (err) {
      console.error('Erro ao simular pagamento:', err.response?.data || err.message)
      return null
    }
  }

  // Retornando
  return {
    abacateToken,
    payData,
    qrCode,
    createPixQrCode,
    simulatePayment,
  }
})

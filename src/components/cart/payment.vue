<template>
  <div class="payment_container">
    <div class="header">
      <span id="back_btn" @click="cartStore.showPage = 1">&#8592;</span>
      <h1 id="title_text">Pagamento</h1>
    </div>

    <div class="qr_code_container">
      <p>Só aceitamos pix!</p>
      <img :src="payStore.payData.data.brCodeBase64" alt="QR Code" />
    </div>

    <div class="pix_btn">
      <button class="btn" type="button" @click="simulatePayment()">
        <Spinner v-if="loading" />
        <span v-else>Simular Pagamento</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { usePayStore } from '@/stores/abacatePay'
import { useCartStore } from '@/stores/cartStore'
import { ref } from 'vue'
import Spinner from '../form/spinner.vue'
import { useAlertStore } from '@/stores/alertasStore'
import { useOrdersStore } from '@/stores/orders'

const alertStore = useAlertStore()
const payStore = usePayStore()
const cartStore = useCartStore()
const orderStore = useOrdersStore()
const loading = ref(false)

async function simulatePayment() {
  loading.value = true
  try {
    await payStore.simulatePayment()
    alertStore.successAlert('Pagamento realizado com sucesso!')

    cartStore.showPage = 0
    cartStore.canvasCart = false
    await cartStore.clearCart()
    await cartStore.getCartItems()
    await orderStore.updateStatus(orderStore.lastOrderId, 'PROCESSING')
    payStore.payData = []
    payStore.qrCode = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
#back_btn {
  cursor: pointer;
  color: #b5d985;
  font-size: 32px;
  opacity: 0.9;
  font-weight: 950;
  transition: transform 0.3s ease;
}

#back_btn:hover {
  opacity: 1;
}

#title_text {
  text-align: center;
  color: #b5d985;
  font-size: 36px;
  font-weight: 700;
}

.qr_code_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn {
  width: 80%;
  height: 50px;
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  transition: 0.3s;
  font-size: 20px;
  margin-top: 10px;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.02);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.pix_btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  color: #4b4b4b;
  font-size: 16px;
  font-weight: 550;
  margin-top: 0px;
}
</style>

<template>
  <div class="my_requests_container">
    <h1>Meus Pedidos</h1>

    <Spinner v-if="loading" />
    <div v-else class="all_orders">
      <div class="order" v-for="(order, index) in ordersStore.myOrders" :key="index">
        <div class="top_info">
          <h2 id="index">{{ index + 1 }}.</h2>

          <div class="order_info">
            <h2 id="order_id">Pedido: #{{ order.id }}</h2>
            <p>{{ formatDate(order.order_date) }}</p>
          </div>
        </div>

        <div class="bottom_info">
          <div class="complete">
            <div class="complete_option" :class="statusClass(order.status)"></div>
            <h3>Pedido Realizado</h3>
          </div>

          <div class="complete">
            <div class="complete_option" :class="statusClass(order.status)"></div>
            <h3 id="processing_text">Pagamento Aprovado</h3>
          </div>

          <div class="complete">
            <div class="complete_option" :class="statusClass(order.status)"></div>
            <h3>Saiu para Entrega</h3>
          </div>

          <div class="complete">
            <div class="complete_option" :class="statusClass(order.status)"></div>
            <h3>Entregue</h3>
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup>
import Spinner from '@/components/form/spinner.vue'
import Dots from '../dots.vue'
import { onMounted, ref } from 'vue'
import { useOrdersStore } from '@/stores/orders'
import dayjs from 'dayjs'

const loading = ref(false)
const ordersStore = useOrdersStore()

onMounted(() => {
  getMyOrders()
})

async function getMyOrders() {
  loading.value = true
  try {
    await ordersStore.getMyOrders()
  } finally {
    loading.value = false
  }
}

function formatDate(date) {
  return dayjs(date).format('DD/MM HH:mm')
}

const statusClass = (status) => {
  switch (status) {
    case 'PENDING':
      return 'status-pending'
    case 'PROCESSING':
      return 'status-processing'
    case 'SHIPPED':
      return 'status-shipped'
    case 'COMPLETED':
      return 'status-completed'
    default:
      return 'status-default'
  }
}
</script>

<style scoped>
/* Container */
.my_requests_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 55vh;
  overflow-y: auto;
}

/* Titulo */
h1 {
  font-size: clamp(17px, 20px, 24px);
  color: #b5d985;
  font-weight: 800;
}

/* Top Info */
.top_info {
  display: flex;
  gap: 10px;
  align-items: center;
}

#index {
  font-size: 32px;
  color: #424242;
  font-weight: 700;
}

#order_id {
  font-size: 16px;
  color: #4b4b4b;
  font-weight: 700;
}

.all_orders {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.order {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.top_info p {
  font-size: 12px;
  color: #4b4b4b;
  font-weight: 700;
  opacity: 0.85;
  margin-top: -5px;
}

.order_info {
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: flex-start;
  justify-content: center;
}

/* Bolinhas */
.bottom_info {
  display: flex;
  gap: 20px;
}

.status-pending {
  background-color: #d3d3d3;
}

.status-processing {
  background-color: #87ceeb;
}

.status-shipped {
  background-color: #fdd835;
}

.status-completed {
  background-color: #b5d985;
}

.status-default {
  background-color: #4b4b4b;
}

.complete_option {
  width: 18px;
  height: 18px;
  opacity: 1;
  border-radius: 50%;
}

.complete {
  display: flex;
  gap: 5px;
  flex-direction: column;
  align-items: center;
}

.complete h3 {
  width: 65px;
  text-align: center;
  line-height: 1.15;
  color: #4b4b4b;
  font-size: 13px;
}

#processing_text {
  width: 80px;
}

hr {
  color: #ccc;
  margin-top: 8px;
}

/* Responsividade */
@media (max-width: 600px) {
  .my_requests_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>

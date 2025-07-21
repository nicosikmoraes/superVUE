<template>
  <div class="requests_container">
    <h1>Pedidos</h1>

    <Spinner v-if="loading" />
    <div v-else class="all_requests">
      <div class="request" v-for="order in ordersStore.orders" :key="order.id">
        <div class="top_info">
          <div class="itens_amount">
            <h2>{{ order.products.length }}</h2>
            <p>Itens</p>
          </div>

          <div class="order_info">
            <h2>Pedido: #{{ order.id }}</h2>
            <p>{{ formatDate(order.order_date) }}</p>
          </div>
        </div>

        <div class="bottom_info">
          <div class="select">
            <select v-model="order.status">
              <option value="PENDING">Pedido Realizado</option>
              <option value="PROCESSING">Pagamento Aprovado</option>
              <option value="SHIPPED">Saiu para Entrega</option>
              <option value="COMPLETED">Concluído</option>
              <option value="CANCELED">Cancelar</option>
            </select>
          </div>

          <button class="btn" type="button" @click="updateStatus(order.id, order.status)">
            <Spinner v-if="order.loading" />
            <span v-else>Ok</span>
          </button>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>

<script setup>
import Spinner from '@/components/form/spinner.vue'
import { useOrdersStore } from '@/stores/orders'
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'

const ordersStore = useOrdersStore()
const loading = ref(false)
const loadingBtn = ref(false)

onMounted(() => {
  getAllOrders()
})

async function getAllOrders() {
  loading.value = true
  try {
    await ordersStore.getAllOrders()
  } finally {
    loading.value = false
  }
}

async function updateStatus(id, status) {
  //Loading do produto
  const loadingOrder = ordersStore.orders.find((o) => o.id === id)
  loadingOrder.loading = true
  try {
    await ordersStore.updateStatus(id, status)
  } finally {
    loadingOrder.loading = false
  }
}

function formatDate(date) {
  return dayjs(date).format('DD/MM HH:mm')
}
</script>

<style scoped>
/* Container */
.requests_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 55vh;
  overflow-y: auto;
}

.all_requests {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.request {
  display: flex;
  flex-direction: column;
  gap: 12px;
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

/* Itens Amount */
.itens_amount {
  display: flex;
  flex-direction: column;
  width: 50px;
  height: 50px;
  background-color: #b5d985;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
}

.itens_amount h2 {
  font-size: 20px;
  color: white;
  font-weight: 800;
  height: 20px;
}

.itens_amount p {
  font-size: 12px;
  color: white;
  font-weight: 800;
}

/* Order Info */
.order_info {
  display: flex;
  flex-direction: column;
  gap: 0px;
  align-items: flex-start;
  justify-content: center;
}

.order_info h2 {
  font-size: 16px;
  color: #4b4b4b;
  font-weight: 700;
}

.order_info p {
  font-size: 12px;
  color: #4b4b4b;
  font-weight: 700;
  opacity: 0.85;
}

/* Bottom Info */
.bottom_info {
  display: flex;
  gap: 7px;
}

.select {
  width: 60%;
}

select {
  width: 100%;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-weight: 600;
  color: #4b4b4b;
  cursor: pointer;
  transition: 0.3s;
  height: 40px;
}

select:hover {
  transform: scale(1.02);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
}

select:focus {
  outline: none;
}

.btn {
  background-color: #b5d985;
  height: 40px;
  width: 40px;
  border-radius: 6px;
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  transform: scale(1.07);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
}

hr {
  margin-top: 5px;
  color: #ccc;
  width: 100%;
}

/* Responsividade */
@media (max-width: 600px) {
  .requests_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>

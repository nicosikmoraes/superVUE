<template>
  <div class="my_requests_container">
    <h1>Meus Pedidos</h1>

    <Spinner v-if="loading" />

    <h2 v-else-if="ordersStore.myOrders.length === 0 || !ordersStore.myOrders" class="no_requests">
      Você ainda não fez nenhum pedido!
    </h2>

    <div v-else class="all_orders">
      <div class="order" v-for="(order, index) in ordersStore.myOrders" :key="index">
        <div class="top_info">
          <h2 id="index">{{ index + 1 }}.</h2>

          <div class="order_info">
            <h2 id="order_id">Pedido: #{{ order.id }}</h2>
            <p>{{ formatDate(order.order_date) }}</p>
          </div>

          <div :class="order.status === 'COMPLETED' ? 'completed_message' : 'uncompleted_message'">
            <h3 v-if="order.status === 'COMPLETED'">Entregue!</h3>
            <h3 v-else>Aguarde..</h3>
          </div>
        </div>

        <div class="bottom_info">
          <div class="pending">
            <div class="complete">
              <!-- Column -->
              <div class="complete_option" :class="statusClassOne(order.status)"></div>
              <!-- Bolinha -->
              <h3>Pedido Realizado</h3>
            </div>

            <Dots class="dots" v-if="order.status === 'PENDING'" />
          </div>

          <div class="pending">
            <div class="complete">
              <div class="complete_option" :class="statusClassTwo(order.status)"></div>
              <h3 id="processing_text">Pagamento Aprovado</h3>
            </div>

            <Dots class="dots_processing" v-if="order.status === 'PROCESSING'" />
          </div>

          <div class="pending">
            <div class="complete">
              <div class="complete_option" :class="statusClassThree(order.status)"></div>
              <h3>Saiu para Entrega</h3>
            </div>

            <Dots id="last_ball" class="dots" v-if="order.status === 'SHIPPED'" />
          </div>

          <div class="complete" id="first_ball">
            <div class="complete_option" :class="statusClassFour(order.status)"></div>
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

const statusClassOne = (status) => {
  switch (status) {
    case 'PENDING':
      return 'status-completed'
    case 'PROCESSING':
      return 'status-completed'
    case 'SHIPPED':
      return 'status-completed'
    case 'COMPLETED':
      return 'status-completed'
    default:
      return 'status-default'
  }
}

const statusClassTwo = (status) => {
  switch (status) {
    case 'PENDING':
      return 'status-default'
    case 'PROCESSING':
      return 'status-completed'
    case 'SHIPPED':
      return 'status-completed'
    case 'COMPLETED':
      return 'status-completed'
    default:
      return 'status-default'
  }
}

const statusClassThree = (status) => {
  switch (status) {
    case 'PENDING':
      return 'status-default'
    case 'PROCESSING':
      return 'status-default'
    case 'SHIPPED':
      return 'status-completed'
    case 'COMPLETED':
      return 'status-completed'
    default:
      return 'status-default'
  }
}

const statusClassFour = (status) => {
  switch (status) {
    case 'PENDING':
      return 'status-default'
    case 'PROCESSING':
      return 'status-default'
    case 'SHIPPED':
      return 'status-default'
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
  overflow-x: auto;
}

/* Titulo */
h1 {
  font-size: clamp(17px, 20px, 24px);
  color: #b5d985;
  font-weight: 800;
}

.no_requests {
  font-size: 15px;
  color: #4b4b4b;
  font-weight: 600;
  opacity: 1;
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

.status-completed {
  background-color: #b5d985;
}

.status-default {
  background-color: #4b4b4b;
  opacity: 0.85;
}

.complete_option {
  width: 18px;
  height: 18px;
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

.pending {
  position: relative;
  background-color: transparent;
}

.dots {
  position: absolute;
  top: -5px;
  left: 60px;
}

.dots_processing {
  position: absolute;
  top: -5px;
  left: 75px;
}

.completed_message h3 {
  font-size: 11px;
  color: #697c51;
  font-weight: 800;
}

.completed_message {
  background-color: #b5d985;
  padding: 3px 7px;
  border-radius: 10px;
  align-self: flex-start;
  margin-top: 8px;
  margin-left: 5px;
}

.uncompleted_message {
  background-color: #ccc;
  padding: 3px 7px;
  border-radius: 10px;
  align-self: flex-start;
  margin-top: 8px;
  margin-left: 5px;
  opacity: 0.9;
}

.uncompleted_message h3 {
  font-size: 11px;
  color: #4b4b4b;
  font-weight: 800;
}

/* Responsividade */
@media (max-width: 600px) {
  .my_requests_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .bottom_info {
    gap: 5px;
    margin-left: 0px;
  }

  #first_ball {
    display: none;
  }

  .pending {
    position: relative;
  }

  .dots {
    position: absolute;
    left: 58px;
  }

  .dots_processing {
    position: absolute;
    left: 67px;
  }

  #last_ball {
    display: none;
  }

  #order_id {
    font-size: 14px;
  }
}
</style>

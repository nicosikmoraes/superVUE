<template>
  <div class="cart_home_container">
    <div class="header">
      <span @click="cartStore.canvasCart = false">X</span>
      <h1 id="title_text">Carrinho</h1>
    </div>

    <Spinner v-if="loading" />
    <div class="cart_items" v-else>
      <div class="item" v-for="item in cartStore.cartItems.items" :key="item.id">
        <div
          class="item_img"
          :style="{ backgroundImage: `url(http://35.196.79.227:8000${item.image_path})` }"
        ></div>

        <div class="item_info">
          <h2>{{ item.name }}</h2>

          <h1>{{ formatPrice(Number(item.unit_price)) }}</h1>
        </div>

        <span @click="removeItem(item.product_id, item.quantity)">X</span>

        <div class="item_quantity">{{ item.quantity }}</div>
      </div>
    </div>

    <div class="footer">
      <h2>Calcular Frete:</h2>
      <div class="inp_container">
        <input
          class="inp"
          type="text"
          v-model="cep"
          @input="formatCep"
          @keypress="onlyNumbers"
          maxlength="9"
          placeholder="00000-000"
        />

        <button class="btn" type="button" @click="checkCep(cep)">&#8594;</button>
      </div>
      <p>{{ cepText }}</p>

      <h1 class="total_price">
        Total: {{ formatPrice(Number(cartStore.cartItems.total_amount)) }}
      </h1>

      <button
        class="final_btn"
        type="button"
        @click="cartStore.showPage = 1"
        :disabled="!cartStore.cartItems.items?.length || null"
      >
        Finalizar Compra
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import { onMounted, ref } from 'vue'
import Spinner from '../form/spinner.vue'
import { useAlertStore } from '@/stores/alertasStore'

const cartStore = useCartStore()
const alertStore = useAlertStore()
const loading = ref(false)
const loadingCep = ref(false)
const cep = ref('')
const cepText = ref('')

onMounted(() => {
  getCartItems()
})

async function getCartItems() {
  loading.value = true
  try {
    cartStore.cartItems = await cartStore.getCartItems()
    console.log('Itens do carrinho carregados:', cartStore.cartItems)
  } finally {
    loading.value = false
  }
}

async function removeItem(id, quantity) {
  loading.value = true
  try {
    alertStore.successAlert('Item removido do carrinho!')
    await cartStore.removeItemFromCart(id, quantity)
    await getCartItems()
  } finally {
    loading.value = false
  }
}

async function checkCep(cep) {
  loadingCep.value = true
  try {
    const res = await cartStore.checkCep(cep)

    if (!res) {
      cepText.value = 'CEP inválido'
      return
    }

    cepText.value = 'Frete Grátis'
  } finally {
    loadingCep.value = false
  }
}

function formatPrice(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

function formatCep(e) {
  let value = e.target.value.replace(/\D/g, '') // Remove tudo que não for número
  if (value.length > 5) {
    value = value.slice(0, 5) + '-' + value.slice(5, 8)
  }
  cep.value = value
}

function onlyNumbers(event) {
  const key = event.key
  if (!/^[0-9]$/.test(key)) {
    event.preventDefault()
  }
}
</script>

<style scoped>
/* HEADER ESTILOS */
.header {
  width: 100%;
}

.header span {
  color: #b5d985;
  font-size: 24px;
  font-weight: 650;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s ease;
}

.header span:hover {
  opacity: 1;
  transform: scale(1.1);
}

#title_text {
  text-align: center;
  color: #b5d985;
  font-size: 36px;
  font-weight: 700;
}

/* Body Estilos */

.cart_items {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.item {
  border: 1px solid #b5d985;
  display: flex;
  gap: 10px;
  padding: 15px 15px;
  border-radius: 20px;
  box-shadow: 0 4px 7px rgba(0, 0, 0, 0.25);
  position: relative;
}

.item_img {
  width: 80px;
  height: 80px;
  background-size: cover;
  background-position: center;
  border-radius: 20px;
}

.item_info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h2 {
  color: #4b4b4b;
  font-size: 16px;
  font-weight: 600;
}

h1 {
  color: #b5d985;
  font-size: 17px;
  font-weight: 700;
}

.item span {
  color: #b32828;
  font-size: 24px;
  font-weight: 650;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s ease;
  margin: auto 8px auto auto;
}

.item span:hover {
  opacity: 1;
  transform: scale(1.1);
}

.item_quantity {
  position: absolute;
  top: -15px;
  right: -12px;
  height: 35px;
  width: 35px;
  background-color: #b5d985;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 800;
  font-size: 20px;
}

/* Input */
.inp {
  width: 35%;
  height: 40px;
  border: 1px solid #b5d985;
  padding: 0px 12px;
  border-radius: 12px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.inp:focus {
  outline: 1px solid #b5d985;
  box-shadow: none;
}

/* Button */
.btn {
  background-color: #b5d985;
  border: 1px solid #b5d985;
  color: white;
  border-radius: 12px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 40px;
  width: 50px;
  opacity: 0.8;
  cursor: pointer;
}

.btn:hover {
  opacity: 1;
}

p {
  font-size: 12px;
  color: #4b4b4b;
  margin-left: 20px;
  font-weight: 600;
}

.inp_container {
  display: flex;
  margin-left: 12px;
}

.footer {
  margin-top: 18px;
  margin-left: 0px;
}

.footer h2 {
  margin-left: 20px;
}

.total_price {
  color: #b5d985;
  font-size: 24px;
  font-weight: 800;
  margin-top: 15px;
  text-align: center;
  margin-top: 30px;
}

.final_btn {
  width: 100%;
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
}

.final_btn:hover {
  opacity: 1;
  transform: scale(1.02);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
</style>

<template>
  <div class="address_container">
    <div class="header">
      <span id="back_btn" @click="cartStore.showPage--">&#8592;</span>
      <h1 id="title_text">Endereços</h1>
    </div>

    <div class="all_address">
      <p v-if="!addressStore.addresses.length" id="no_address_text">Nenhum endereço cadastrado!</p>

      <div
        v-else
        class="address"
        v-for="address in addressStore.addresses"
        :key="address.id"
        @click="selectAddress(address.id)"
        :class="[{ checked: address.checked }]"
      >
        <div class="info">
          <h1 id="street_text">{{ address.street }}, {{ address.number }}</h1>
          <p id="city_text">{{ address.city }} ({{ address.state }})</p>
          <h2>{{ address.zip }}</h2>
        </div>

        <div class="close">
          <span id="close_btn" @click="deleteAddress(address.id)">X</span>
        </div>
      </div>
    </div>
    <!--  All Address  -->
  </div>

  <div class="footer">
    <button v-if="addAddress" class="final_btn" type="button" @click="cartStore.showPage = 2">
      <Spinner v-if="loading" />
      <span v-else>Adicionar Endereço</span>
    </button>
    <button v-else class="final_btn" type="button" @click="createQrCode()">
      <Spinner v-if="loading" />
      <span v-else>Ir para o Pagamento</span>
    </button>
  </div>
</template>

<script setup>
import Spinner from '@/components/form/spinner.vue'
import { usePayStore } from '@/stores/abacatePay'
import { useAddressStore } from '@/stores/addressStore'
import { useCartStore } from '@/stores/cartStore'
import { useDiscountStore } from '@/stores/discounts'
import { useOrdersStore } from '@/stores/orders'
import { onMounted, ref } from 'vue'

const payStore = usePayStore()
const addressStore = useAddressStore()
const cartStore = useCartStore()
const addAddress = ref(true)
const loading = ref(false)
const ordersStore = useOrdersStore()
const discountsStore = useDiscountStore()

onMounted(() => {
  getAddresses()
})

async function getAddresses() {
  await addressStore.getAddresses()
}

async function deleteAddress(id) {
  loading.value = true
  try {
    await addressStore.deleteAddress(id)

    if (addressStore.selectedAddress.id === id) {
      addressStore.selectedAddress = []
      addAddress.value = true
    }
  } finally {
    loading.value = false
  }
}

async function selectAddress(selectedId) {
  const clickedAddress = await addressStore.addresses.find((addr) => addr.id === selectedId)

  // Se já estiver marcado, desmarque todos
  if (clickedAddress.checked) {
    addressStore.addresses = addressStore.addresses.map((addr) => ({
      ...addr,
      checked: false,
    }))
    addAddress.value = true
    addressStore.selectedAddress = []
  } else {
    // Marca só o clicado e desmarca os outros
    addressStore.addresses = addressStore.addresses.map((addr) => ({
      ...addr,
      checked: addr.id === selectedId,
    }))
    addAddress.value = false
    addressStore.selectedAddress = clickedAddress
    console.log('Endereço selecionado:', addressStore.selectedAddress)
  }
}

async function createQrCode() {
  loading.value = true
  try {
    await payStore.createPixQrCode()
    await ordersStore.createOrder()
    discountsStore.coupon_id = null
    cartStore.showPage = 3
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

#no_address_text {
  text-align: center;
  color: #4b4b4b;
  font-size: 20px;
  font-weight: 500;
}

.footer {
  margin-top: 15px;
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
  margin-top: 10px;
}

.final_btn:hover {
  opacity: 1;
  transform: scale(1.02);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

/* Address */
.all_address {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.address {
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  border: 1px solid #b5d985;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  transition: 0.3s;
  cursor: pointer;
}

.checked {
  transform: scale(1.035);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
}

#street_text {
  font-size: 17px;
  color: #4b4b4b;
  font-weight: 700;
}

#city_text {
  font-size: 14px;
  color: #4b4b4b;
  font-weight: 700;
}

h2 {
  font-size: 16px;
  color: #4b4b4b;
  font-weight: 700;
}

#city_text,
h2 {
  margin-left: 5px;
}

.info {
  width: 80%;
}

.close {
  width: 20%;
  display: flex;
  align-items: center;
}

#close_btn {
  margin-left: auto;
  color: #b32828;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.3s;
  opacity: 0.9;
}

#close_btn:hover {
  opacity: 1;
  transform: scale(1.1);
}
</style>

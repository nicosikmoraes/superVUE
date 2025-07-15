<template>
  <div class="products_container">
    <div class="filter_container">
      <span>Filtros Selecionados: </span>
      <h1 id="filter_value" v-for="(filter, index) in landingStore.filtersName" :key="index">
        {{ filter }}
      </h1>
    </div>

    <Spinner v-if="landingStore.loadingProducts === true" />
    <div class="show_products" v-else>
      <div class="product" v-for="product in landingStore.landingProducts" :key="product.id">
        <div
          class="product_image"
          :style="{ backgroundImage: `url(http://35.196.79.227:8000${product.image_path})` }"
        ></div>
        <h2 id="product_name">{{ product.name }}</h2>

        <h1 id="product_price">R$ {{ product.price }}</h1>

        <button
          class="product_btn"
          @click="addItemToCart(product.id, product.price)"
          :disabled="loadigndBtn"
        >
          Comprar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore'
import { useLandingStore } from '@/stores/landingStore'
import { onMounted, ref } from 'vue'
import Spinner from '../form/spinner.vue'
import { useCartStore } from '@/stores/cartStore'
import { useAlertStore } from '@/stores/alertasStore'

const landingStore = useLandingStore()
const adminStore = useAdminStore()
const cartStore = useCartStore()
const loadigndBtn = ref(false)
const alertStore = useAlertStore()

onMounted(() => {
  getAllProducts()
})

async function getAllProducts() {
  landingStore.loadingProducts = true
  try {
    await adminStore.getAllProducts()
  } finally {
    landingStore.loadingProducts = false
  }
}

async function addItemToCart(productId, price) {
  loadigndBtn.value = true
  try {
    await cartStore.addItemToCart(productId, price)
    await cartStore.getCartItems()
    alertStore.successAlert('Item adicionado ao carrinho!')
  } finally {
    loadigndBtn.value = false
  }
}
</script>

<style scoped>
/* Filtros */
.filter_container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 18px;
  background-color: #f0fbe2;
  padding: 6px 18px;
  border-radius: 20px;
  width: fit-content;
  max-width: 100%;
  overflow-wrap: break-word;
}

#filter_value {
  background-color: #697c51;
  padding: 0 10px;
  border-radius: 12px;
  color: #b5d985;
  font-weight: 600;
}

span {
  font-size: 18px;
  color: #b5d985;
  font-weight: 700;
}

/* Produtos */
.products_container {
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
  gap: 20px;
  max-width: 70%;
}

.show_products {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: flex-start;
}

.product {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 270px;
  height: 320px;
  border: 2px solid #b5d985;
  border-radius: 12px;
  padding: 12px 12px;
}

.product_image {
  width: 100%;
  height: 190px;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
}

#product_name {
  font-size: 15px;
  font-weight: 700;
  color: #424242;
  margin-left: 10px;
}

#product_price {
  font-size: 20px;
  font-weight: 900;
  color: #b5d985;
  margin-left: 10px;
}

.product_btn {
  width: 100%;
  height: 40px;
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  transition: 0.3s;
}

.product_btn:hover {
  opacity: 1;
  transform: scale(1.02);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

@media (max-width: 700px) {
  .products_container {
    max-width: 100%;
  }
}

@media (max-width: 600px) {
  .product {
    width: 100%;
  }
}
</style>

<template>
  <div class="show_products_container">
    <h1>Produtos</h1>

    <SelectCategory />

    <div class="all_products">
      <Spinner v-if="adminStore.loadingProducts" />
      <div
        v-else
        class="product_container"
        v-for="product in adminStore.products"
        :key="product.id"
      >
        <div
          class="product"
          :style="{ backgroundImage: `url(http://35.196.79.227:8000${product.image_path})` }"
        >
          <span class="quantity">{{ product.stock }}</span>
          <h2>{{ product.name }}</h2>
          <p>R$ {{ product.price }}</p>
        </div>
      </div>
    </div>

    <button type="button" class="btn" @click="adminStore.showProducts = false">
      Criar Produto
    </button>
  </div>
</template>

<script setup>
import Spinner from '@/components/form/spinner.vue'
import SelectCategory from '../selectCategory.vue'
import { useAdminStore } from '@/stores/adminStore'
import { onMounted, ref } from 'vue'

const adminStore = useAdminStore()

onMounted(() => {
  getAllProducts()
})

async function getAllProducts() {
  adminStore.loadingProducts = true
  try {
    await adminStore.getAllProducts()
    console.log('Produtos: ', products.value)
  } finally {
    adminStore.loadingProducts = false
  }
}
</script>

<style scoped>
/* Container */
.show_products_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Titulo */
h1 {
  font-size: clamp(17px, 20px, 24px);
  color: #b5d985;
  font-weight: 800;
}

/* Button */
.btn {
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  border-radius: 6px;
  height: 45px;
  width: 100%;
  opacity: 0.9;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.03);
  box-shadow: 0px 3px 5px #b6b6b6;
}

/* Produto */
.all_products {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.product_container {
  position: relative;
  display: inline-block;
}

.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 195px;
  height: 195px;
  background-color: #eee;
  border: 1px solid #b5d985;
  position: relative;
  border-radius: 10px;
  color: white;
  font-weight: 800;
  text-shadow: 1px 1px black;
  background-size: cover;
  background-position: center;
  font-size: 16.5px;
  padding: 3px 0px;
}

.quantity {
  position: absolute;
  top: -10px;
  right: -10px;
  width: 26px;
  height: 26px;
  background-color: #b5d985;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 700;
}

/* Responsividade */
@media (max-width: 600px) {
  .show_products_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .btn {
    width: 100%;
  }
}
</style>

<template>
  <div class="products_container">
    <ShowProducts v-if="adminStore.showProducts === true" />

    <CreateProduct v-else />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CreateProduct from './createProduct.vue'
import ShowProducts from './showProducts.vue'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()
</script>

<style scoped>
.products_container {
  height: 55vh;
  overflow-y: auto;
}
</style>

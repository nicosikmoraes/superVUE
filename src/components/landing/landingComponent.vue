<template>
  <div class="landing_container">
    <Banner />

    <div class="body">
      <Filter />
      <Products />
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useAlertStore } from '@/stores/alertasStore'
import Banner from './banner.vue'
import Filter from './filter.vue'
import Products from './products.vue'

const userStore = useUserStore()
const alertStore = useAlertStore()
</script>

<style scoped>
.landing_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.body {
  display: flex;
  flex: 1;
}
</style>

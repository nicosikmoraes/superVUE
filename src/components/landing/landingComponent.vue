<template>
  <div class="landing_container">
    <Banner />

    <div class="body_landing">
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
</script>

<style scoped>
.landing_container {
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.body_landing {
  display: flex;
  flex: 1;
  margin-bottom: 100px;
}
</style>

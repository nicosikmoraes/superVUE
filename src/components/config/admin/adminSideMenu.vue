<template>
  <h2 v-if="userStore.admin === true" @click="configStore.whichMenu = 2">Moderadores</h2>
  <h2 @click="configStore.whichMenu = 3">Categorias</h2>
  <h2 @click="configStore.whichMenu = 4">Produtos</h2>
  <h2 @click="configStore.whichMenu = 5">Pedidos</h2>
</template>

<script setup>
import { useConfigStore } from '@/stores/configStore'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const configStore = useConfigStore()
</script>

<style scoped>
h2 {
  color: #b5d985;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

h2:hover {
  transform: scale(1.1);
}
</style>

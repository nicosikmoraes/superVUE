<template>
  <h2 @click="configStore.whichMenu = 0">Perfil</h2>
  <h2 @click="configStore.whichMenu = 1">Segurança</h2>
  <h2 @click="configStore.whichMenu = 6">Meus Pedidos</h2>
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

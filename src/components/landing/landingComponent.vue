<template>
  <div class="test" v-if="userStore.userMe.token">
    {{ userStore.userMe.name }}
    {{ userStore.userMe.email }}
    {{ userStore.userMe.id }}
    {{ userStore.userMe.imagem }}
    {{ userStore.userMe.role }}
    {{ userStore.userMe.token }}
  </div>

  <button @click="alertStore.ballonQuitAlert">Test</button>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { useAlertStore } from '@/stores/alertasStore'

const userStore = useUserStore()
const alertStore = useAlertStore()
</script>

<style scoped>
.test {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="login_container">
    <LoginComponent />
  </div>
</template>

<script setup>
import LoginComponent from '@/components/form/login/loginComponent.vue'
import { onMounted } from 'vue'
import { useNavStore } from '@/stores/navbarStore'

const navStore = useNavStore()

onMounted(() => {
  navStore.showNav = false
})
</script>

<style scoped>
.login_container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7e7e7;
}
</style>

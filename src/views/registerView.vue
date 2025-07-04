<template>
  <div class="register_container">
    <RegisterComponent />
  </div>
</template>

<script setup>
import RegisterComponent from '@/components/form/register/registerComponent.vue'
import { useNavStore } from '@/stores/navbarStore'
import { onMounted } from 'vue'

const navStore = useNavStore()

onMounted(() => {
  navStore.showNav = false
})
</script>

<style scoped>
.register_container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e7e7e7;
}
</style>

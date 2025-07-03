<template>
  <div class="container_landing">Landing Page</div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useNavStore } from '@/stores/navbarStore'

const route = useRoute()
const navStore = useNavStore()

if (route.path === '/') {
  navStore.ActiveNav()
}
</script>

<style scoped></style>

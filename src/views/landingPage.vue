<template>
  <div class="container_landing">
    <LandingComponent />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useNavStore } from '@/stores/navbarStore'
import LandingComponent from '@/components/landing/landingComponent.vue'

const route = useRoute()
const navStore = useNavStore()

if (route.path === '/') {
  navStore.ActiveNav()
}
</script>

<style scoped></style>

<template>
  <div class="container_landing">
    <LandingComponent />
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useNavStore } from '@/stores/navbarStore'
import LandingComponent from '@/components/landing/landingComponent.vue'
import { useLandingStore } from '@/stores/landingStore'
import { onMounted } from 'vue'

const route = useRoute()
const navStore = useNavStore()
const landingStore = useLandingStore()

if (route.path === '/') {
  navStore.ActiveNav()
}

onMounted(() => {
  landingStore.filtersName = []
})
</script>

<style scoped>
.container_landing {
  flex: 1;
  overflow: auto;
  width: 100%;
  margin-top: 70px;
}
</style>

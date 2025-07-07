<template>
  <div class="container_config">
    <ConfigMenu />
    <ConfigMain />
  </div>
</template>

<script setup>
import ConfigMain from '@/components/config/configMain.vue'
import ConfigMenu from '@/components/config/configMenu.vue'
import { onMounted } from 'vue'
import { useConfigStore } from '@/stores/configStore'

const configStore = useConfigStore()

onMounted(() => {
  configStore.whichMenu = 0
})
</script>

<style scoped>
.container_config {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>

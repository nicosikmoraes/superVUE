<template>
  <div class="categories_container">
    <ShowCategories v-if="adminStore.showCategories === true" />

    <CreateCategories v-else />
  </div>
</template>

<script setup>
import CreateCategories from './createCategories.vue'
import ShowCategories from './showCategories.vue'
import { useAdminStore } from '@/stores/adminStore'

const adminStore = useAdminStore()
</script>

<style scoped>
.categories_container {
  height: 55vh;
  overflow-y: auto;
}
</style>

<template>
  <div class="filter_container" :class="{ open: navStore.offCanvas }">
    <h1>Filtros</h1>

    <div class="filter_category">
      <h2>Categorias</h2>

      <Spinner v-if="loading" />
      <div class="checkbox_group" v-else>
        <label v-for="category in adminStore.categories" :key="category.id" class="checkbox_label">
          <input
            type="checkbox"
            :value="category.name"
            v-model="category.selected"
            class="rounded-checkbox"
            @change="handleCheckboxChange(category.id, category.name)"
          />

          {{ category.name }}
        </label>
      </div>
    </div>
  </div>

  <!-- BACKDROP -->
  <div
    v-if="navStore.offCanvas === true"
    class="backdrop"
    @click="navStore.offCanvas = false"
  ></div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore'
import { useLandingStore } from '@/stores/landingStore'
import { onMounted, ref } from 'vue'
import Spinner from '../form/spinner.vue'
import { useNavStore } from '@/stores/navbarStore'

const landingStore = useLandingStore()
const adminStore = useAdminStore()
const navStore = useNavStore()
const loading = ref(false)

onMounted(() => {
  getCategories()
})

async function getCategories() {
  loading.value = true
  try {
    await adminStore.getCategories()
  } finally {
    loading.value = false
  }
}

async function handleCheckboxChange(id, name) {
  landingStore.loadingProducts = true
  try {
    adminStore.idSelected = id

    const index = landingStore.filtersName.indexOf(name)

    if (index === -1) {
      // Adiciona o nome se ainda não estiver no array
      landingStore.filtersName.push(name)
    } else {
      // Remove se já estiver
      landingStore.filtersName.splice(index, 1)
    }

    // Atualiza os produtos filtrados
    await adminStore.getAllProducts()
  } finally {
    landingStore.loadingProducts = false
  }
}
</script>

<style scoped>
/* Container global */
.filter_container {
  border-right: 1px solid #e6e6e6;
  min-width: 350px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

/* Titulo */
h1 {
  font-size: 32px;
  color: #b5d985;
  font-weight: 700;
  margin-top: 40px;
}

/* Estilos do filtro categoria */
.filter_category {
  width: 270px;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 22px 25px;
  margin-top: 10px;
}

h2 {
  color: #b5d985;
  font-size: 20px;
  font-weight: 700;
}

/* Checkbox */
.checkbox_group {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.checkbox_label {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Checkbox redondo */
.rounded-checkbox {
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #b5d985;
  border-radius: 50%; /* Torna redondo */
  position: relative;
  cursor: pointer;
}

.rounded-checkbox:checked {
  background-color: #b5d985;
}

.rounded-checkbox:checked::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
}

@media (max-width: 700px) {
  .filter_container {
    position: fixed;
    top: 0;
    left: -350px;
    width: 350px;
    height: 100vh;
    background-color: #fff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    transition: left 0.3s ease;
    z-index: 1001;
    border: none;
  }

  .filter_container.open {
    left: 0;
  }

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1000;
  }
}
</style>

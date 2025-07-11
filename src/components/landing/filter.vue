<template>
    <div class="filter_container">
        <h1>Filtros</h1>

        <div class="filter_category">
            <h2>Categorias</h2>

        <div class="checkbox_group">
            <label 
              v-for="category in categories" 
              :key="category.id" 
              class="checkbox_label"
             >

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
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore';
import { useLandingStore } from '@/stores/landingStore';
import { onMounted, ref } from 'vue';

const landingStore = useLandingStore()
const adminStore = useAdminStore()
const categories = ref([])

onMounted(() => {
    getCategories()
})

async function getCategories() {
    categories.value = await adminStore.getCategories()
}

async function handleCheckboxChange(id, name) {
  adminStore.idSelected = id

  const index = landingStore.filtersName.indexOf(name)

  if (index === -1) {
    // Adiciona o nome se ainda não estiver no array
    landingStore.filtersName.push(name)
  } else {
    // Remove se já estiver
    landingStore.filtersName.splice(index, 1)
  }

  console.log(adminStore.idSelected, landingStore.filtersName)
}

</script>

<style scoped>
/* Container global */
.filter_container {
    border-right: 1px solid #e6e6e6;
    width: 350px;
    display: flex;
    align-items: center;
    flex-direction: column;
}

/* Titulo */
h1 {
    font-size: 32px;
    color: #B5D985;
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
    color: #B5D985;
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
  border: 2px solid #B5D985;
  border-radius: 50%; /* Torna redondo */
  position: relative;
  cursor: pointer;
}

.rounded-checkbox:checked {
  background-color: #B5D985;
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
</style>
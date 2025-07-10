<template>
  <div class="select_container">
    <h2>Selecione uma categoria:</h2>

    <select id="category_select" v-model="selected" @change="changeCategory()">
      <option value="">Todas as Categorias</option>
      <option v-for="category in categories" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useAdminStore } from '@/stores/adminStore'

const categories = ref([])
const selected = ref('')
const adminStore = useAdminStore()

onMounted(() => {
  getCategories()

  if (adminStore.editProduct === true) {
    getSelected()
  }
})

//Função para buscar as categorias
async function getCategories() {
  categories.value = await adminStore.getCategories()
}

async function changeCategory() {
  adminStore.idSelected = selected.value
  adminStore.loadingProducts = true

  try {
    if (adminStore.showProducts === true) {
      if (!adminStore.idSelected) {
        await adminStore.getAllProducts()
      } else {
        await adminStore.getCategoryProducts()
      }
    }
  } finally {
    adminStore.loadingProducts = false
  }
}

async function getSelected() {
  const product = adminStore.products.find((product) => product.id === adminStore.idProductSelected)

  if (!product) {
    console.warn('Produto não encontrado')
    return
  }

  selected.value = product.category_id
  await changeCategory()
}
</script>

<style scoped>
h2 {
  color: #b5d985;
  font-size: 17px;
  font-weight: 700;
  margin-left: 2px;
}

#category_select {
  padding: 8px 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
  border: 1px solid #ccc;
}

#category_select:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

#category_select:focus {
  outline: none;
}

option {
  color: black;
  font-weight: 500;
  cursor: pointer;
}

option:hover {
  background-color: #4b5c35;
}
</style>

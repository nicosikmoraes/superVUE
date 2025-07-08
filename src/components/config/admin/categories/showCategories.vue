<template>
  <div class="show_categories_container">
    <h1>Categorias</h1>

    <Spinner v-if="loading" />
    <div class="category" v-else v-for="category in categories" :key="category.id">
      <img
        class="img_category"
        v-if="category.image_path !== '/uploads/defaults/no_categories_image.png'"
        :src="'http://35.196.79.227:8000' + category.image_path"
      />
      <h2>{{ category.name }}</h2>

      <Spinner v-if="loadingDelete" class="img_delete" />
      <img
        v-else
        class="img_delete"
        src="/src/assets/images/trash.png"
        alt=""
        @click="deleteCategory(category.id)"
      />
    </div>

    <button type="button" class="btn" @click="adminStore.showCategories = false">
      Criar Categoria
    </button>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore'
import { onMounted } from 'vue'
import { ref } from 'vue'
import Spinner from '@/components/form/spinner.vue'
import { useAlertStore } from '@/stores/alertasStore'

const adminStore = useAdminStore()
const alertStore = useAlertStore()
const categories = ref([])
const loading = ref(false)
const loadingDelete = ref(false)

onMounted(() => {
  getCategories()
})

async function getCategories() {
  loading.value = true
  try {
    categories.value = await adminStore.getCategories()
    console.log('Categorias: ', categories.value)
  } finally {
    loading.value = false
  }
}

async function deleteCategory(id) {
  loading.value = true
  try {
    const res = await adminStore.deleteCategory(id)

    await getCategories()
    alertStore.categoryDeleteAlert()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Container */
.show_categories_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Titulo */
h1 {
  font-size: clamp(17px, 20px, 24px);
  color: #b5d985;
  font-weight: 800;
}

/* Button */
.btn {
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  border-radius: 6px;
  height: 45px;
  width: 100%;
  opacity: 0.9;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.03);
  box-shadow: 0px 3px 5px #b6b6b6;
}

/* Categorias */
.category {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  border: 2px solid #b5d985;
  border-radius: 6px;
  padding: 8px 12px;
}

.img_category {
  height: 40px;
  border-radius: 5px;
}

.img_delete {
  height: 27px;
  cursor: pointer;
  margin-left: auto;
}

.img_delete:hover {
  transform: scale(1.1);
}

h2 {
  color: black;
  font-size: 16px;
  font-weight: 500;
}

/* Responsividade */
@media (max-width: 600px) {
  .show_categories_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>

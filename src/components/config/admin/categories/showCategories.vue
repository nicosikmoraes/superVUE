<template>
  <div class="show_categories_container">
    <h1>Categorias</h1>

    <Spinner v-if="loading" />
    <div class="category_container" v-else>
      <div class="category" v-for="category in categories" :key="category.id">
        <img
          class="img_category"
          v-if="category.image_path !== '/uploads/defaults/no_categories_image.png'"
          :src="'http://35.196.79.227:8000' + category.image_path"
        />

        <div class="info">
          <h2>{{ category.name }}</h2>

          <img
            class="img_delete"
            src="/src/assets/images/trash.png"
            alt=""
            @click="deleteCategory(category.id)"
          />
        </div>
      </div>
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

onMounted(() => {
  getCategories()
})

async function getCategories() {
  loading.value = true
  try {
    categories.value = await adminStore.getCategories()
  } finally {
    loading.value = false
  }
}

async function deleteCategory(id) {
  loading.value = true
  try {
    const res = await adminStore.deleteCategory(id)

    await getCategories()
    alertStore.successAlert('Categoria Deletada!')
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

.category_container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
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
  flex-direction: column;
  gap: 6px;
  align-items: center;
  border: 2px solid #b5d985;
  border-radius: 8px;
  padding: 6px 6px;
  width: 340px;
}

.img_category {
  height: 75px;
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.img_delete {
  height: 30px;
  cursor: pointer;
  margin-left: auto;
}

.img_delete:hover {
  transform: scale(1.1);
}

h2 {
  color: black;
  font-size: 18px;
  font-weight: 600;
  margin-left: 5px;
}

/* Responsividade */

@media (max-width: 900px) {
  .category {
    width: 200px;
  }
}

@media (max-width: 600px) {
  .show_categories_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .btn {
    width: 200px;
  }
}
</style>

<template>
  <div class="hover_container">
    <div class="top_itens">
      <a @click="deleteProduct(id)"><img class="icon" src="/src/assets/images/trashFull.png" /></a>
      <a
        @click="
          (((adminStore.editProduct = true), (adminStore.showProducts = false)),
          (adminStore.idProductSelected = id))
        "
        ><img class="icon" src="/src/assets/images/pencilWhite.png"
      /></a>
    </div>

    <div class="bottom_itens">
      <a @click="((adminStore.idProductSelected = id), minusStock())"
        ><img class="icon" src="/src/assets/images/minus.png"
      /></a>

      <a @click="((adminStore.idProductSelected = id), addStock())"
        ><img class="icon" src="/src/assets/images/plus.png"
      /></a>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore'
import { useAlertStore } from '@/stores/alertasStore'
import { ref } from 'vue'

const props = defineProps({
  id: Number,
  stock: Number,
})

const adminStore = useAdminStore()
const alertStore = useAlertStore()
const localStock = ref(props.stock)

// Funções
async function deleteProduct(id) {
  adminStore.loadingProducts = true
  try {
    await adminStore.deleteProduct(id)
    await adminStore.getAllProducts()
    alertStore.successAlert('Produto deletado com sucesso!')
  } finally {
    adminStore.loadingProducts = false
  }
}

async function addStock() {
  localStock.value++
  await adminStore.updateStock(localStock.value)
  await adminStore.getAllProducts()
}

async function minusStock() {
  localStock.value--
  await adminStore.updateStock(localStock.value)
  await adminStore.getAllProducts()
}
</script>

<style scoped>
/*============================== CONTAINER =================================================*/
.hover_container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
}

.top_itens {
  display: flex;
  flex-direction: row;
  gap: 6px;
  margin-top: 55px;
}

.bottom_itens {
  display: flex;
  flex-direction: row;
  gap: 6px;
}

/*============================== IMAGE =================================================*/
.icon {
  width: 42px;
  height: 42px;
  opacity: 1;
}

.icon:hover {
  transform: scale(1.1);
}
</style>

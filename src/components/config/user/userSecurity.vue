<template>
  <div class="security_container">
    <h1>Opções de segurança</h1>

    <div class="delete_btn">
      <h2>Deletar Conta:</h2>
      <button type="button" @click="confirmDeletion()">Deletar</button>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alertasStore'

const alertStore = useAlertStore()
const userStore = useUserStore()
const router = useRouter()

// Funções
async function deleteUser() {
  const res = await userStore.deleteUserMe()
  router.push('/')
  alertStore.successAlert('Conta Deletada!')
}

function confirmDeletion() {
  Swal.fire({
    title: 'Tem certeza?',
    text: 'Essa ação irá excluir permanentemente sua conta.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) {
      // 🔥 Chama a função de exclusão
      deleteUser()
    }
  })
}
</script>

<style scoped>
.security_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  font-size: clamp(16px, 19px, 24px);
  color: #b5d985;
  font-weight: 800;
}

h2 {
  color: #b5d985;
  font-size: 18px;
  font-weight: 800;
}

button {
  background-color: #e44441;
  color: white;
  border-radius: 6px;
  height: 40px;
  width: 90px;
  opacity: 0.9;
  cursor: pointer;
  font-weight: 700;
  margin-left: 1px;
  margin-top: 2px;
  transition: 0.2s;
}

button:hover {
  opacity: 1;
  transform: scale(1.03);
  box-shadow: 0px 3px 5px #b6b6b6;
}

/* Responsividade */
@media (max-width: 600px) {
  .security_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>

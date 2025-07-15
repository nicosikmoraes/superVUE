<template>
  <div class="config_menu">
    <div class="menu_header"></div>
    <div class="side_menu">
      <UserSideMenu />

      <AdminSideMenu v-if="userStore.moderator === true" />

      <h2 @click="router.push('/')">Voltar</h2>
      <h2 @click="quit()">Sair</h2>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useAlertStore } from '@/stores/alertasStore'
import UserSideMenu from './user/userSideMenu.vue'
import AdminSideMenu from './admin/adminSideMenu.vue'

const router = useRouter()
const userStore = useUserStore()
const alertStore = useAlertStore()

function quit() {
  router.push('/')
  userStore.quitUserMe()
  alertStore.quitAlert()
}
</script>

<style scoped>
/* Contaier */
.config_menu {
  min-width: 140px;
  min-height: 65vh;
  border-radius: 12px;
  box-shadow: 0px 4px 16px #969696;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (max-width: 600px) {
  .config_menu {
    min-width: 30%;
    max-width: 30%;
  }
}

/* Header */
.menu_header {
  width: 100%;
  height: 60px;
  background-color: #b5d985;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}

/* Menu */
.side_menu {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
}

h2 {
  color: #b5d985;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

h2:hover {
  transform: scale(1.1);
}
</style>

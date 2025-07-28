<template>
  <div class="modal-content">
    <div v-show="route.path === '/'">
      <button class="btn" @click="goToConfig()">Configurações</button>
    </div>

    <div v-show="route.path === '/config'">
      <button class="btn" @click="goToMenu()">Menu</button>
    </div>
    <hr />
    <div>
      <button class="btn" @click="quit()">Sair</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNavStore } from '@/stores/navbarStore'
import { useUserStore } from '@/stores/userStore'
import { useAlertStore } from '@/stores/alertasStore'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'

const navStore = useNavStore()
const userStore = useUserStore()
const alertStore = useAlertStore()
const router = useRouter()
const route = useRoute()

function quit() {
  navStore.showModal = false
  router.push('/')
  userStore.quitUserMe()
  alertStore.quitAlert()
}

function goToConfig() {
  navStore.showModal = false
  router.push('/config')
}

function goToMenu() {
  navStore.showModal = false
  router.push('/')
}
</script>

<style scoped>
.modal-content {
  position: absolute;
  top: 60px;
  right: 50px;
  background: #b5d985;
  padding: 20px;
  border-radius: 8px;
  max-width: 170px;
  width: 100%;
  color: white;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 16px #969696;
}

.btn {
  padding: 8px 5px;
  font-size: 16px;
  font-weight: 650;
  opacity: 0.7;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.05);
}
</style>

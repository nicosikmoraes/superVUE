<template>
  <div class="container_app">
    <div class="navbar_component" v-show="navStore.showNav">
      <Navbar />
    </div>

    <router-view />

    <div class="footer_component" v-show="navStore.showNav">
      <Footer />
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/app/navbar/navbar.vue'
import Footer from '@/components/app/footer.vue'
import { useNavStore } from '@/stores/navbarStore'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from './stores/userStore'
import { useAdminStore } from './stores/adminStore'

const navStore = useNavStore()
const userStore = useUserStore()
const adminStore = useAdminStore()

//Variáveis Arrays
const form = reactive({
  email: 'nico@gmail.com',
  password: '16052006',
})

onMounted(() => {
  getToken()
})

async function getToken() {
  if (userStore.userMe.token) {
    return
  }

  await userStore.login(form)
  userStore.stockToken = userStore.userMe.token
  console.log(userStore.stockToken)
  userStore.quitUserMe()
}
</script>

<style>
/* Configurações Globais */
* {
  box-sizing: border-box;
  margin: 0;
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Estilos Container */
.container_app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Estilos Navbar */
.navbar_component {
  position: absolute;
  top: 0;
  width: 100%;
}

/* Estilos Footer */
.footer_component {
  position: fixed;
  bottom: 0;
  width: 100%;
}

/* Estilos do Router View */
.main_component {
  flex: 1;
  width: 100%;
  overflow: auto;
}
</style>

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
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const navStore = useNavStore()
const router = useRouter()
</script>

<style>
/* Configurações Globais */
* {
  box-sizing: border-box;
  margin: 0;
  font-family:
    Inter,
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
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
</style>

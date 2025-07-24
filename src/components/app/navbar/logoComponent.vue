<template>
  <div
    v-if="showCanvas"
    class="offcanvas_btn"
    @click="navbarStore.offCanvas = !navbarStore.offCanvas"
  >
    <img id="menu_wider" src="/src/assets/images/menu-wider.png" />
  </div>
  <div class="container_logo">
    <div class="logo">
      <img id="img_logo" src="/src/assets/images/cart.png" />
    </div>

    <h1 id="title_logo">SuperVUE</h1>
  </div>
</template>

<script setup>
import { useNavStore } from '@/stores/navbarStore'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const navbarStore = useNavStore()
const route = useRoute()

// Só mostra o botão de offcanvas se a rota for a landing page
const showCanvas = computed(() => route.path === '/')
</script>

<style scoped>
.container_logo {
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
}

/* Estilos Logo */
.logo {
  height: 50px;
  width: 55px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: #b5d985;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

#img_logo {
  height: 37px;
}

#title_logo {
  color: #b5d985;
  font-size: clamp(16px, 20px, 24px);
  font-weight: 700;
}

.offcanvas_btn {
  display: none;
}

/* OFFCANVAS */
@media (max-width: 700px) {
  .offcanvas_btn {
    display: block;
    margin-right: 12px;
  }

  #menu_wider {
    width: 50px;
  }
}

/* Responsividade Title */
@media (max-width: 600px) {
  #title_logo {
    font-size: 22px;
    margin-left: 10px;
  }
}
</style>

<template>
  <div class="options_container">
    <div v-show="!userStore.userMe.token" class="login_btn" @click="goToLogin()">Entrar</div>

    <div
      v-show="userStore.userMe.token"
      class="user_options"
      @click="navStore.showModal = !navStore.showModal"
    >
      <img id="img_conf" src="/src/assets/images/cog.png" />
    </div>

    <ModalConfig v-show="navStore.showModal" />

    <div
      class="cart_btn"
      @click="((cartStore.canvasCart = !cartStore.canvasCart), cartStore.getCartItems())"
    >
      <img id="img_cart" src="/src/assets/images/cart-plus.png" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useNavStore } from '@/stores/navbarStore'
import { useUserStore } from '@/stores/userStore'
import ModalConfig from '@/components/modal/modalConfig.vue'
import { useCartStore } from '@/stores/cartStore'

// Variáveis
const router = useRouter()
const navStore = useNavStore()
const userStore = useUserStore()
const cartStore = useCartStore()

// Funções
function goToLogin() {
  navStore.InactiveNav()
  router.push('/login')
}
</script>

<style scoped>
/* Container */
.options_container {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* Button */
.login_btn {
  background-color: #b5d985;
  color: white;
  font-weight: 600;
  padding: 7px 15px;
  border-radius: 6px;
  opacity: 0.9;
  cursor: pointer;
}

.login_btn:hover {
  opacity: 1;
  transform: scale(1.05);
}

/* Opções de Usuário */
.user_options {
  min-width: 40px;
  opacity: 0.9;
}

.user_options:hover {
  opacity: 1;
}

/* Carrinho */
.cart_btn {
  min-width: 40px;
}

#img_cart {
  width: 65px;
  cursor: pointer;
}

#img_cart:hover,
#img_conf:hover {
  transform: scale(1.1);
}

#img_conf {
  width: 40px;
  cursor: pointer;
}
</style>

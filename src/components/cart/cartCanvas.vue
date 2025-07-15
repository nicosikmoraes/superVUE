<template>
  <div class="container_cart">
    <div class="offcanvas" :class="{ active: cartStore.canvasCart }">
      <CartHome />
    </div>

    <!-- Backdrop -->
    <div class="backdrop" v-if="cartStore.canvasCart" @click="cartStore.canvasCart = false"></div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
import CartHome from './cartHome.vue'
import { watch } from 'vue'

const cartStore = useCartStore()

watch(
  () => cartStore.canvasCart,
  (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto'
  },
)
</script>

<style scoped>
.offcanvas {
  position: fixed;
  top: 0;
  right: -425px;
  width: 425px;
  height: 100%;
  overflow-y: auto;
  background-color: #fafafa;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  padding: 25px;
  transition: right 0.3s ease;
  z-index: 1001;
}

.offcanvas.active {
  right: 0;
}

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}
</style>

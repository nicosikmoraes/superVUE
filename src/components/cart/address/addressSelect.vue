<template>
  <div class="address_container">
    <div class="header">
      <span id="back_btn" @click="cartStore.showPage--">&#8592;</span>
      <h1 id="title_text">Endereços</h1>
    </div>

    <div class="all_address">
      <p id="no_address_text">Nenhum endereço cadastrado!</p>
    </div>

    <div class="footer">
      <button class="final_btn" type="button" @click="cartStore.showPage = 2">
        Adicionar Endereço
      </button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped>
#back_btn {
  cursor: pointer;
  color: #b5d985;
  font-size: 32px;
  opacity: 0.9;
  font-weight: 950;
  transition: transform 0.3s ease;
}

#back_btn:hover {
  opacity: 1;
}

#title_text {
  text-align: center;
  color: #b5d985;
  font-size: 36px;
  font-weight: 700;
}

#no_address_text {
  text-align: center;
  color: #4b4b4b;
  font-size: 20px;
  font-weight: 500;
}

.footer {
  margin-top: 15px;
}

.final_btn {
  width: 100%;
  height: 50px;
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  transition: 0.3s;
  font-size: 20px;
}

.final_btn:hover {
  opacity: 1;
  transform: scale(1.02);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
</style>

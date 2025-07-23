<template>
  <div class="discounts_container">
    <div class="cupom_form">
      <CupomForm />
    </div>

    <div class="discounts_form">
      <DiscountsForm />
    </div>
  </div>
</template>

<script setup>
import CupomForm from './cupomForm.vue'
import DiscountsForm from './discountsForm.vue'
</script>

<style scoped>
/* Container */
.discounts_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 55vh;
  overflow-y: auto;
}

/* Responsividade */
@media (max-width: 600px) {
  .discounts_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>

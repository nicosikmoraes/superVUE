<template>
  <div class="container_navbar">
    <div class="container_logo">
        <div class="logo">
          <img id="img_logo" src="/src/assets/images/cart.png">
        </div>

           <h1 id="title_logo">SuperVUE</h1>
    </div>

    <InputComponent />

    <OptionsComponent />
  </div>
</template>

<script setup>
import InputComponent from './inputComponent.vue';
import OptionsComponent from './optionsComponent.vue';

</script>

<style scoped>
/* Estilos Container */
.container_navbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  height: 8vh;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
}

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

/* Responsividade Title */
@media (max-width: 600px) {
  #title_logo {
    display: none;
  }
}

</style>

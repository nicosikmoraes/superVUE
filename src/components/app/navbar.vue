<template>
  <div class="container_navbar">
    <div class="logo">Logo</div>

    <div class="input_search">
      <!-- Colocar isso aqui em outro componente -->
      <input type="text" placeholder="Pesquisar" />
      <button class="send_btn">Enviar</button>
    </div>

    <div class="options">
      <!-- Colocar isso aqui em outro componente -->
      <div class="login_btn">Entrar</div>
      <div class="cart_btn">Carrinho</div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Estilos Container */
.container_navbar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 20px;
  height: 8vh;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.input_search {
  display: flex;
  align-items: center;
  justify-content: center;
}

.options {
  display: flex;
}
</style>

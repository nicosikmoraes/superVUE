<template>
  <div class="banner_container">
    <div class="banner_img">
      <div class="banner_overlay">
        <h1>SuperVUE</h1>
        <h2>Faça suas compras sem sair de casa!</h2>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
/* Estilos do banner */
.banner_container {
  height: 300px;
  width: 100%;
}

.banner_img {
  position: relative;
  height: 300px;
  width: 100%;
  background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.banner_overlay {
  position: relative;
  height: 300px;
  width: 100%;
  background: linear-gradient(
    to right,
    rgba(34, 197, 94, 0.9),
    /* from-green-500/90 */ rgba(34, 197, 94, 0.7),
    /* via-green-500/70 */ rgba(34, 197, 94, 0.5) /* to-green-500/50 */
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  color: white;
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 750;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* drop-shadow-md */
}

h2 {
  color: white;
  font-size: clamp(16px, 20px, 28px);
  font-weight: 600;
  font-family: 'Poppins', sans-serif;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4); /* drop-shadow-md */
  margin-top: -2px;
}
</style>

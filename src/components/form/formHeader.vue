<template>
  <div class="header_container">
    <div class="close_btn">
      <span @click="goToLanding()">X</span>
    </div>
    <div class="login_header">
      <h1 id="header_text">{{ headerMessage }}</h1>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

//Variáveis
const router = useRouter()
const route = useRoute()

const headerMessage = ref('')

//Validação
if (route.path === '/login') {
  headerMessage.value = 'Entre na sua conta'
}

if (route.path === '/register') {
  headerMessage.value = 'Crie sua conta'
}

//Funções
function goToLanding() {
  router.push('/')
}
</script>

<style scoped>
/* Container */
.login_header {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Header Text */
#header_text {
  color: #b5d985;
  font-size: 30px;
  font-weight: 900;
}

span {
  margin-left: 27px;
  font-size: 23px;
  font-weight: 550;
  color: #b5d985;
  cursor: pointer;
}

span:hover {
  transform: scale(1.2);
}

.close_btn {
  height: 70px;
  display: flex;
  align-items: center;
}
</style>

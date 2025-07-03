<template>
  <div class="footer_container">
    <h1 v-show="showLogin" id="footer_text">
      Não possui uma conta? <a @click="goToRegister()">Cadastre-se</a>
    </h1>
    <h1 v-show="!showLogin" id="footer_text">
      Já possui uma conta? <a @click="goToLogin()">Entrar</a>
    </h1>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

//Variáveis
const router = useRouter()
const route = useRoute()

const showLogin = ref(true)

//Validação
if (route.path === '/login') {
  showLogin.value = true
}

if (route.path === '/register') {
  showLogin.value = false
}

//Funções
function goToRegister() {
  router.push('/register')
}

function goToLogin() {
  router.push('/login')
}
</script>

<style scoped>
/* Estilos Container */
.footer_container {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

/* Footer Text */
#footer_text {
  color: #b5d985;
  font-size: 17px;
  font-weight: 600;
  margin-left: 3px;
}

a:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>

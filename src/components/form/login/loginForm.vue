<template>
  <div class="body_container">
    <form id="form_login" @submit.prevent="login()">
      <div class="inp">
        <h2>Email</h2>
        <input v-model="form.email" type="text" placeholder="Digite seu Email" required />
      </div>

      <div class="inp">
        <h2>Senha</h2>
        <input v-model="form.password" type="password" placeholder="Digite sua Senha" required />
      </div>
      <button type="submit" :disabled="loading">
        <Spinner v-if="loading" />
        <span v-else>Entrar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alertasStore'
import { ref } from 'vue'
import Spinner from '../spinner.vue'

//Variáveis
const userStore = useUserStore()
const router = useRouter()
const useAlert = useAlertStore()

const loading = ref(false)

//Variáveis Arrays
const form = reactive({
  email: '',
  password: '',
})

// Funções
async function login() {
  loading.value = true
  try {
    const res = await userStore.login(form)

    if (!res) {
      useAlert.errorLoginAlert()
      return
    }

    router.push('/')
    useAlert.loginAlert()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Estilos Container */
.body_container {
  flex: 1;
}

#form_login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  gap: 15px;
}

/* Input */
input {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid #b5d985;
  border-radius: 5px;
}

input:focus {
  border: 1px solid #b5d985;
  outline: 1px solid #b5d985;
  box-shadow: none;
  transform: scale(1.01);
}

.inp {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  width: 65%;
}

/* Texto */
h2 {
  color: #b5d985;
  font-size: 15px;
  font-weight: 700;
  margin-left: 3px;
}

/* Botão */
button {
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  font-size: 17px;
  border-radius: 5px;
  height: 47px;
  width: 65%;
  opacity: 0.9;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  opacity: 1;
  transform: scale(1.03);
  box-shadow: 0px 3px 5px #b6b6b6;
}
</style>

<template>
  <div class="body_container">
    <form id="form_login" @submit.prevent="createUser()">
      <div class="inp">
        <h2>Nome</h2>
        <input type="text" v-model="form.name" placeholder="Digite seu Nome" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div class="inp">
        <h2>Email</h2>
        <input type="text" v-model="form.email" placeholder="Digite seu Email" />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <div class="inp">
        <h2>Senha</h2>
        <input type="password" v-model="form.password" placeholder="Digite sua Senha" />
        <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
      </div>
      <button type="submit">
        <Spinner v-if="loading" />
        <span v-else>Cadastrar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useAlertStore } from '@/stores/alertasStore'
import { useRouter } from 'vue-router'
import Spinner from '../spinner.vue'
import { ref } from 'vue'

//Variáveis
const userStore = useUserStore()
const useAlert = useAlertStore()
const router = useRouter()

const loading = ref(false)

//Variáveis Arrays
const form = reactive({
  name: '',
  email: '',
  password: '',
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
})

async function createUser() {
  loading.value = true
  try {
    if (!validate()) {
      console.log('❌ Dados inválidos')
      return
    }

    const res = await userStore.createUser(form)
    console.log(res)

    if (!res) {
      useAlert.errorRegisterAlert()
      return
    }

    useAlert.registerAlert()
  } finally {
    loading.value = false
  }
}

// Função de Validação do Formulário
function validate() {
  let valid = true

  //Validação Nome
  if (!form.name.trim()) {
    errors.name = 'O nome é obrigatório'
    valid = false
  } else {
    errors.name = ''
  }

  // Validação Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    errors.email = 'O email é obrigatório'
    valid = false
  } else if (!emailRegex.test(form.email)) {
    errors.email = 'O email é inválido'
    valid = false
  } else {
    errors.email = ''
  }

  // Validação Senha
  if (!form.password.trim()) {
    errors.password = 'A senha é obrigatória'
    valid = false
  } else if (form.password.length < 6) {
    errors.password = 'A senha deve ter no mínimo 6 caracteres'
    valid = false
  } else {
    errors.password = ''
  }

  return valid
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
  margin-top: 0px;
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

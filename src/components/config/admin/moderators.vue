<template>
  <div class="perfil_container">
    <h1>Crie um novo moderador</h1>

    <form id="form_login" @submit.prevent="createModerator()">
      <div class="name_container">
        <h2 class="inp_text">Nome:</h2>
        <input class="inp" type="text" placeholder="Digite o nome" v-model="form.name" />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div class="email_container">
        <h2 class="inp_text">Emai:</h2>
        <input class="inp" type="text" placeholder="Digite o email" v-model="form.email" />
        <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
      </div>

      <div class="password_container">
        <h2 class="inp_text">Senha:</h2>
        <input class="inp" type="text" placeholder="Digite a senha" v-model="form.password" />
        <p v-if="errors.password" class="text-red-500 text-sm">{{ errors.password }}</p>
      </div>

      <button class="btn" type="submit">
        <Spinner v-if="loading" />
        <span v-else>Criar</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref, reactive } from 'vue'
import Spinner from '@/components/form/spinner.vue'
import { useAlertStore } from '@/stores/alertasStore'
import { useAdminStore } from '@/stores/adminStore'

//Variáveis
const userStore = useUserStore()
const adminStore = useAdminStore()
const alertStore = useAlertStore()
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

async function createModerator() {
  loading.value = true
  try {
    if (!validate()) {
      console.log('❌ Dados inválidos')
      return
    }

    const res = await adminStore.createModerator(form)
    console.log(res)

    if (!res) {
      alertStore.errorRegisterAlert()
      return
    }

    alertStore.registerAlert()
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

//Funções
</script>

<style scoped>
/* Container */
.perfil_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#form_login {
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  gap: 15px;
}

/* Titulo */
h1 {
  font-size: clamp(17px, 20px, 24px);
  color: #b5d985;
  font-weight: 800;
}

/* Input */
.inp {
  width: 80%;
  height: 40px;
  border: 1px solid #b5d985;
  padding: 0px 12px;
  border-radius: 6px;
}

.inp:focus {
  outline: 1px solid #b5d985;
  box-shadow: none;
}

/* Input Text */
.inp_text {
  color: #b5d985;
  font-size: 16px;
  font-weight: 700;
  margin-left: 2px;
}

/* Button */
.btn {
  background-color: #b5d985;
  border: 1px solid #b5d985;
  color: white;
  border-radius: 6px;
  font-weight: 700;
  height: 40px;
  width: 80%;
  opacity: 0.9;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.03);
  box-shadow: 0px 3px 5px #b6b6b6;
}

/* Responsividade */
@media (max-width: 600px) {
  .perfil_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }
}
</style>

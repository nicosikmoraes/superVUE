<template>
  <div class="perfil_container">
    <h1>Atualize seus dados</h1>

    <div class="name_container">
      <h2 class="inp_text">Alterar nome:</h2>

      <div class="inp_name">
        <input class="inp" type="text" placeholder="Digite seu novo nome" v-model="name" />
        <button class="btn" type="button" @click="updateUserName()" :disabled="loadingName">
          <Spinner v-if="loadingName" />
          <span v-else>&#8594;</span>
        </button>
      </div>
    </div>

    <div class="email_container">
      <h2 class="inp_text">Alterar emai:</h2>

      <div class="inp_email">
        <input class="inp" type="text" placeholder="Digite seu novo email" v-model="email" />
        <button class="btn" type="button" @click="updateUserEmail()" :disabled="loadingEmail">
          <Spinner v-if="loadingEmail" />
          <span v-else>&#8594;</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'
import Spinner from '@/components/form/spinner.vue'
import { useAlertStore } from '@/stores/alertasStore'

//Variáveis
const userStore = useUserStore()
const alertStore = useAlertStore()
const name = ref('')
const email = ref('')
const loadingName = ref(false)
const loadingEmail = ref(false)

//Funções
async function updateUserName() {
  loadingName.value = true
  try {
    const res = await userStore.updateUserMe(name.value, userStore.userMe.email)

    if (!res) {
      alertStore.errorUpdateNameAlert()
      return
    }

    alertStore.updateNameAlert()
  } finally {
    loadingName.value = false
  }
}

async function updateUserEmail() {
  loadingEmail.value = true
  try {
    const res = await userStore.updateUserMe(userStore.userMe.name, email.value)

    if (!res) {
      alertStore.errorUpdateEmailAlert()
      return
    }

    alertStore.updateEmailAlert()
  } finally {
    loadingEmail.value = false
  }
}
</script>

<style scoped>
/* Container */
.perfil_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Titulo */
h1 {
  font-size: clamp(17px, 20px, 24px);
  color: #b5d985;
  font-weight: 800;
}

/* Input */
.inp {
  width: 75%;
  height: 40px;
  border: 1px solid #b5d985;
  padding: 0px 12px;
  border-radius: 6px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
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
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 40px;
  width: 50px;
  opacity: 0.8;
  cursor: pointer;
}

.btn:hover {
  opacity: 1;
}

.inp_name,
.inp_email {
  display: flex;
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

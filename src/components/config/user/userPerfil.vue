<template>
  <div class="perfil_container">
    <h1>Atualize seus dados</h1>

    <div class="img_container">
      <div class="img">
        <Spinner v-if="loadingImage" />
        <img v-else :src="'http://35.196.79.227:8000' + userStore.userMe.imagem" alt="" />
      </div>

      <label class="custom-file-upload">
        📁 Escolher imagem
        <input type="file" @change="handleFile" accept="image/*" />
      </label>
    </div>

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
const loadingImage = ref(false)

//Funções
async function updateUserName() {
  loadingName.value = true
  try {
    const res = await userStore.updateUserMe(name.value, userStore.userMe.email)

    if (!res) {
      alertStore.errorAlert('O nome precisa ser diferente!')
      return
    }

    alertStore.successAlert('Nome Atualizado!')
  } finally {
    loadingName.value = false
  }
}

async function updateUserEmail() {
  loadingEmail.value = true
  try {
    const res = await userStore.updateUserMe(userStore.userMe.name, email.value)

    if (!res) {
      alertStore.errorAlert('O email precisa ser diferente!')
      return
    }

    alertStore.successAlert('Email Atualizado!')
  } finally {
    loadingEmail.value = false
  }
}

async function handleFile(event) {
  loadingImage.value = true
  try {
    const file = event.target.files[0]
    if (file) {
      const res = await userStore.uploadImagem(file)

      if (!res) {
        alertStore.errorAlert('Apenas arquivos JPG ou PNG são permitidos.')
        return
      }

      await userStore.getUserMe()

      alertStore.successAlert('Imagem Atualizada!')
    }
  } finally {
    loadingImage.value = false
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

.img_container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-start;
  width: 50%;
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

.custom-file-upload input[type='file'] {
  display: none;
}

.custom-file-upload {
  display: inline-block;
  width: 105%;
  padding: 8px 12px;
  background-color: #b5d985;
  opacity: 0.9;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.custom-file-upload:hover {
  opacity: 1;
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

/* Imagem */
.img {
  height: 100px;
  width: 100px;
  border-radius: 200px;
  background-color: #cacaca;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

img {
  height: 100px;
  width: 100px;
  border-radius: 200px;
}

/* Responsividade */
@media (max-width: 600px) {
  .perfil_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .img_container {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
  }

  .custom-file-upload {
    width: 95%;
  }
}
</style>

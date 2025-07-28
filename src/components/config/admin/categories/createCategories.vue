<template>
  <div class="create_categories_container">
    <h1>Criar Categoria</h1>

    <div class="name_container">
      <h2 class="inp_text">Nome:</h2>
      <input class="inp" type="text" placeholder="Digite o nome" v-model="form.name" />
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
    </div>

    <div class="description_container">
      <h2 class="inp_text">Descrição:</h2>
      <textarea
        class="inp"
        id="descricao"
        name="descricao"
        rows="3"
        cols="28"
        placeholder="Digite a descrição aqui..."
      ></textarea>
    </div>

    <div class="img_container">
      <label class="custom-file-upload">
        📁 Escolher imagem
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
      <img src="/src/assets/images/check.png" v-if="imageOk" />
    </div>

    <button class="btn" type="button" @click="createCategory()">
      <Spinner v-if="loading" />
      <span v-else>Criar</span>
    </button>
  </div>
</template>

<script setup>
import Spinner from '@/components/form/spinner.vue'
import { ref, reactive } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { useAlertStore } from '@/stores/alertasStore'

const adminStore = useAdminStore()
const alertStore = useAlertStore()
const imageOk = ref(false)
const loading = ref(false)

//Variáveis Arrays
const form = reactive({
  name: '',
  description: '',
  imageFile: null,
})

const errors = reactive({
  name: '',
})

function handleFileChange(event) {
  form.imageFile = event.target.files[0]

  if (form.imageFile) {
    imageOk.value = true
  }
}

async function createCategory() {
  loading.value = true
  try {
    if (!validate()) {
      return
    }

    const res = await adminStore.createCategory(form)

    if (!res) {
      alertStore.errorAlert('Dados Inválidos')
      return
    }

    adminStore.showCategories = true
    alertStore.successAlert('Categoria Criada!')
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

  return valid
}
</script>

<style scoped>
/* Container */
.create_categories_container {
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.img_container {
  display: flex;
  flex-direction: row;
  gap: 12px;
  align-items: center;
  width: 75%;
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
  border: 1px solid #b5d985;
  padding: 8px 12px;
  border-radius: 6px;
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
  height: 35px;
  widows: 35px;
  font-weight: 800;
}

/* Button */
.btn {
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  padding: 10px 0px;
  border-radius: 6px;
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
  .create_categories_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .img_container {
    width: 100%;
  }

  img {
    height: 30px;
  }
}
</style>

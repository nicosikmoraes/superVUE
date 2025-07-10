<template>
  <div class="create_product_container">
    <h1 v-if="adminStore.editProduct === false">Criar Produto</h1>
    <h1 v-else>Editar Produto</h1>

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

    <div class="price_container">
      <h2 class="inp_text">Preço:</h2>
      <input
        class="inp_numeric"
        type="text"
        :value="formattedPrice"
        @input="updatePrice($event.target.value)"
        @keypress="blockNonNumeric"
      />
    </div>

    <div class="stock_container">
      <h2 class="inp_text">Quantidade:</h2>
      <input class="inp_numeric" type="number" min="1" v-model="form.stock" />
      <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.stock }}</p>
    </div>

    <div class="select_container">
      <SelectCategory />
    </div>

    <div class="img_container">
      <label class="custom-file-upload">
        📁 Escolher imagem
        <input type="file" @change="handleFileChange" accept="image/*" />
      </label>
      <img src="/src/assets/images/check.png" v-if="imageOk" />
    </div>
    <p id="img_url">{{ form.imageFile }}</p>

    <button
      v-if="adminStore.editProduct === false"
      class="btn"
      type="button"
      @click="createProduct()"
    >
      <Spinner v-if="loading" />
      <span v-else>Criar</span>
    </button>

    <button v-else class="btn" type="button" @click="editProduct()">
      <Spinner v-if="loading" />
      <span v-else>Editar</span>
    </button>
  </div>
</template>

<script setup>
import Spinner from '@/components/form/spinner.vue'
import { ref, reactive, computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { useAlertStore } from '@/stores/alertasStore'
import SelectCategory from '../selectCategory.vue'

const adminStore = useAdminStore()
const alertStore = useAlertStore()
const imageOk = ref(false)
const loading = ref(false)

//Variáveis Arrays
const form = reactive({
  name: '',
  description: '',
  price: 0,
  stock: 1,
  imageFile: null,
})

const errors = reactive({
  name: '',
  stock: '',
  select: '',
  price: '',
})

//Funções
async function createProduct() {
  loading.value = true
  try {
    if (!validate()) {
      return
    }

    const res = await adminStore.createProduct(form)

    if (!res) {
      alertStore.errorAlert('Selecione uma categoria primeiro')
      return
    }

    adminStore.showProducts = true
    alertStore.successAlert('Produto criado com sucesso!')
  } finally {
    loading.value = false
  }
}

async function editProduct() {
  loading.value = true
  try {
    if (!validate()) {
      return
    }

    const res = await adminStore.updateProduct(form)

    if (!res) {
      alertStore.errorAlert('Selecione uma categoria primeiro')
      return
    }

    adminStore.showProducts = true
    adminStore.editProduct = false
    alertStore.successAlert('Produto atualizado com sucesso!')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (adminStore.editProduct === true) {
    setData()
    imageOk.value = true
  }
})

async function setData() {
  console.log('setData', adminStore.idProductSelected)
  const product = adminStore.products.find((product) => product.id === adminStore.idProductSelected)

  if (!product) {
    console.warn('Produto não encontrado')
    return
  }

  form.name = product.name
  form.description = product.description
  form.price = product.price
  form.stock = product.stock
  form.imageFile = product.image_path
}

//Formatar preço
const formattedPrice = computed(() => {
  return form.price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })
})

function updatePrice(value) {
  // Remove tudo que não é número
  const numeric = parseFloat(value.replace(/[^\d]/g, '')) / 100
  form.price = isNaN(numeric) ? 0 : numeric
}

function blockNonNumeric(event) {
  const char = String.fromCharCode(event.keyCode)
  if (!/[0-9]/.test(char)) {
    event.preventDefault()
  }
}

// Formatar minha imagem
function handleFileChange(event) {
  form.imageFile = event.target.files[0]

  if (form.imageFile) {
    imageOk.value = true
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

  if (!form.price || form.price < 1) {
    errors.price = 'O preço é obrigatório'
    valid = false
  } else {
    errors.price = ''
  }

  if (!form.stock || form.stock < 1) {
    errors.stock = 'A quantidade é obrigatória e deve ser maior que zero'
    valid = false
  } else {
    errors.stock = ''
  }

  return valid
}
</script>

<style scoped>
/* Container */
.create_product_container {
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

#img_url {
  color: black;
  font-size: 12px;
  margin-top: -13px;
  margin-left: 5px;
  width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Input */
.inp,
.inp_numeric {
  width: 80%;
  border: 1px solid #b5d985;
  padding: 8px 12px;
  border-radius: 6px;
}

.inp_numeric {
  width: 135px;
}

.inp:focus,
.inp_numeric:focus {
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

img {
  height: 30px;
  font-weight: 800;
}

/* Responsividade */
@media (max-width: 600px) {
  .create_product_container {
    padding: 20px 20px;
    flex-direction: column;
    gap: 15px;
  }

  .img_container {
    width: 100%;
  }
}
</style>

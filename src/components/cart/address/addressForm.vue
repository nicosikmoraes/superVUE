<template>
  <div class="address_form_container">
    <div class="header">
      <span id="back_btn" @click="cartStore.showPage--">&#8592;</span>
      <h1 id="title_text">Novo Endereço</h1>
    </div>

    <div class="form_container">
      <div class="country_container">
        <p for="country">País:</p>
        <select v-model="addressStore.selectedCountry" id="country" @change="handleCountries()">
          <option value="" disabled selected>Selecione um país</option>
          <option
            v-for="country in addressStore.countries"
            :key="country.cca2"
            :value="country.cca2"
          >
            {{ country.name.common }}
          </option>
        </select>
        <p class="error">{{ countryText }}</p>
      </div>

      <div class="state_container">
        <div class="state_container">
          <p for="state">Estado:</p>
          <select
            v-model="addressStore.selectedState"
            id="state"
            @change="handleState()"
            :disabled="!isBrazil"
          >
            <option value="" disabled selected>Selecione um Estado</option>
            <option v-for="state in addressStore.states" :key="state.id" :value="state.nome">
              {{ state.nome }}
            </option>
          </select>
        </div>
      </div>

      <div class="city_container">
        <p for="city">cidade:</p>
        <multiselect
          id="city"
          v-model="addressStore.selectedCity"
          :options="addressStore.cities"
          placeholder="Escolha uma cidade"
          label="nome"
          track-by="id"
          class="custom-select"
          :disabled="!isBrazil || !addressStore.selectedState"
        />
        <p class="error">{{ cityText }}</p>
      </div>

      <div class="street_container">
        <p for="street">Rua:</p>

        <div class="street_inps">
          <input
            type="text"
            class="street"
            id="street_name"
            v-model="addressStore.street"
            placeholder="Digite o nome da rua"
            :disabled="!isBrazil"
          />

          <input
            type="number"
            max="5"
            class="street"
            id="number"
            v-model="addressStore.number"
            placeholder="N°"
            :disabled="!isBrazil"
          />
        </div>
        <p class="error">{{ streetText }}</p>
      </div>

      <div class="cep_container">
        <p>CEP:</p>
        <input
          class="inp_cep"
          type="text"
          v-model="addressStore.cep"
          @input="formatCep"
          @keypress="onlyNumbers"
          maxlength="9"
          placeholder="00000-000"
          :disabled="!isBrazil"
        />
        <p class="error">{{ cepText }}</p>
      </div>

      <button class="btn" type="button" @click="addAddress()">
        <Spinner v-if="loading" />
        <span v-else>Adicionar Endereço</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import Multiselect from 'vue-multiselect'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import { useAddressStore } from '@/stores/addressStore'
import { onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import Spinner from '@/components/form/spinner.vue'
import { useAlertStore } from '@/stores/alertasStore'

const cartStore = useCartStore()
const addressStore = useAddressStore()
const alertStore = useAlertStore()
const countryText = ref('')
const isBrazil = ref(true)
const valid = ref(false)
const loading = ref(false)

const cepText = ref('')
const cityText = ref('')
const streetText = ref('')

onMounted(() => {
  getData()
  addressStore.selectedCountry = 'BR'
  addressStore.selectedState = ''
  addressStore.selectedCity = ''
  addressStore.street = ''
  addressStore.number = null
  addressStore.cep = ''
})

async function getData() {
  await addressStore.getCountries()
  await addressStore.getBrazilianStates()
}

function handleCountries() {
  if (addressStore.selectedCountry === 'BR') {
    isBrazil.value = true
    countryText.value = ''
  } else {
    isBrazil.value = false
    countryText.value = 'Indisponível'
  }
}

async function handleState() {
  const found = addressStore.states.find((s) => s.nome === addressStore.selectedState)

  if (found) {
    addressStore.stateSign = found.sigla
    // Você pode chamar a função de buscar cidades aqui também
    await addressStore.getCitiesByState(found.sigla)
  }
}

async function addAddress() {
  loading.value = true

  try {
    await validate()

    if (!valid.value) {
      alertStore.errorAlert('Dados inválidos')
      return
    }

    await addressStore.createAddress()
    cartStore.showPage = 1
  } finally {
    loading.value = false
  }
}

// VALIDAÇÔES

async function validate() {
  valid.value = true

  // Validação da Cidade
  if (!addressStore.selectedCity || !addressStore.selectedCity.nome?.trim()) {
    cityText.value = 'O nome da cidade é obrigatório'
    valid.value = false
  } else {
    cityText.value = ''
  }

  // Validação da Rua
  if (!addressStore.street || !addressStore.street.trim()) {
    streetText.value = 'O nome da rua é obrigatório'
    valid.value = false
  } else if (!addressStore.number) {
    streetText.value = 'Número inválido'
    valid.value = false
  } else {
    streetText.value = ''
  }

  // Validação do CEP (caso checkCep faça algo assíncrono, considere usar await)
  await checkCep(addressStore.cep)
}
async function checkCep(cep) {
  const res = await cartStore.checkCep(cep)

  if (!res) {
    cepText.value = 'CEP inválido'
    valid.value = false
    return
  }

  cepText.value = ''
}

function formatCep(e) {
  let value = e.target.value.replace(/\D/g, '') // Remove tudo que não for número
  if (value.length > 5) {
    value = value.slice(0, 5) + '-' + value.slice(5, 8)
  }
  addressStore.cep = value
}

function onlyNumbers(event) {
  const key = event.key
  if (!/^[0-9]$/.test(key)) {
    event.preventDefault()
  }
}
</script>

<style scoped>
select {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

select:hover {
  transform: scale(1.02);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

select:focus {
  outline: none;
}

p {
  color: #4b4b4b;
  font-size: 16px;
  font-weight: 550;
  margin-left: 6px;
}

.error {
  color: #b32828;
  font-size: 14px;
  margin-top: 2px;
}

/* Header */

#back_btn {
  cursor: pointer;
  color: #b5d985;
  font-size: 32px;
  opacity: 0.9;
  font-weight: 950;
  transition: transform 0.3s ease;
}

#back_btn:hover {
  opacity: 1;
}

#title_text {
  text-align: center;
  color: #b5d985;
  font-size: 36px;
  font-weight: 700;
}

/* Form Country */
.form_container {
  margin-top: 12px;
  display: flex;
  flex-direction: row;
  gap: 25px;
  flex-wrap: wrap;
}

.country_container {
  width: 35%;
}

#country {
  width: 100%;
  height: 40px;
}

/* Estate Form */
.state_container {
  width: 45%;
}

#state {
  height: 40px;
}

/* City Form */
.city_container {
  width: 100%;
}

#city {
  width: 100%;
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

/* Street Form */
.street_container {
  width: 100%;
}

.street_inps {
  display: flex;
  gap: 10px;
}

.street {
  border: 1px solid #ccc;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 16px;
  height: 40px;
  cursor: pointer;
  transition: 0.3s;
}

.street:focus,
.street:hover {
  outline: none;
  transform: scale(1.02);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

#street_name {
  width: 75%;
}

#number {
  width: 25%;
}

/* MulitSelect */
.custom-select .multiselect__select {
  display: none; /* Esconde o ícone de seta padrão do multiselect */
}

.custom-select .multiselect__tags {
  display: flex;
  align-items: center;
  color: black;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid #ccc;
  cursor: pointer;
  border-radius: 6px;
  transition: 0.3s;
}

.custom-select .multiselect__tags:hover,
.custom-select .multiselect__tags:focus {
  outline: none;
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.custom-select .multiselect__option--highlight {
  color: #4b4b4b;
}

.cep_container {
  width: 100%;
}

/* CEP Form */
.inp_cep {
  width: 35%;
  height: 40px;
  border: 1px solid #ccc;
  padding: 4px 12px;
  border-radius: 6px;
  font-weight: 500;
  transition: 0.3s;
  cursor: pointer;
}

.inp_cep:focus,
.inp_cep:hover {
  outline: none;
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Button */
.btn {
  width: 100%;
  height: 50px;
  background-color: #b5d985;
  color: white;
  font-weight: 700;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  opacity: 0.9;
  transition: 0.3s;
  font-size: 20px;
}

.btn:hover {
  opacity: 1;
  transform: scale(1.02);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}
</style>

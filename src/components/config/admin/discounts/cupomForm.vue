<template>
  <div class="cupom_form">
    <h1>Cupons</h1>

    <div class="top_inps">
      <div class="code_inp">
        <p>Código</p>
        <input type="text" placeholder="Código do Cupom" v-model="form.code" />
        <span v-if="errors.code" class="error">{{ errors.code }}</span>
      </div>

      <div class="porcentage_inp">
        <p>%</p>
        <input type="number" min="0" max="100" placeholder="%" v-model.number="form.discount" />
        <span v-if="errors.discount" class="error">{{ errors.discount }}</span>
      </div>
    </div>

    <div class="bottom_inps">
      <div class="data_initial_inp">
        <p>Data Inicial</p>
        <input
          type="text"
          placeholder="dd/mm/aaaa"
          v-model="form.startDate"
          maxlength="10"
          @input="maskDate('startDate')"
        />
        <span v-if="errors.startDate" class="error">{{ errors.startDate }}</span>
      </div>

      <div class="data_initial_inp">
        <p>Data Final</p>
        <input
          type="text"
          placeholder="dd/mm/aaaa"
          v-model="form.endDate"
          maxlength="10"
          @input="maskDate('endDate')"
        />
        <span v-if="errors.endDate" class="error">{{ errors.endDate }}</span>
      </div>
    </div>

    <button class="btn" @click="submitCoupon">
      <Spinner v-if="loading" />
      <h2 v-else>Adicionar Cupom</h2>
    </button>

    <div class="select_container">
      <select v-model="coupon_id">
        <option value="null">Deletar Cupons</option>
        <option v-for="coupon in discountStore.coupons" :key="coupon.id" :value="coupon.id">
          {{ coupon.code }}
        </option>
      </select>

      <button class="delete_btn" @click="deleteCoupon()" :disabled="coupon_id === null">
        <Spinner v-if="loadingDelete" />
        <h2 v-else>X</h2>
      </button>
    </div>
  </div>
</template>

<script setup>
import Spinner from '@/components/form/spinner.vue'
import { useAlertStore } from '@/stores/alertasStore'
import { useDiscountStore } from '@/stores/discounts'
import { onMounted, ref } from 'vue'

const discountStore = useDiscountStore()
const alertStore = useAlertStore()

const form = ref({
  code: '',
  discount: null,
  startDate: '',
  endDate: '',
})

const errors = ref({})

const loading = ref(false)
const loadingDelete = ref(false)
const coupon_id = ref(null)

onMounted(() => {
  getAllCoupons()
})

async function getAllCoupons() {
  await discountStore.getAllCoupons()
}

async function deleteCoupon() {
  if (coupon_id.value === null) {
    return
  }

  loadingDelete.value = true
  try {
    await discountStore.deleteCoupon(coupon_id.value)
    await getAllCoupons()
    alertStore.successAlert('Cupom deletado!')
  } finally {
    loadingDelete.value = false
    coupon_id.value = null
  }
}

async function submitCoupon() {
  if (validateForm()) {
    loading.value = true

    try {
      await discountStore.createCupom(form.value)
      await discountStore.getAllCoupons()
      alertStore.successAlert('Cupom criado!')
    } finally {
      loading.value = false
      form.value.code = ''
      form.value.discount = null
      form.value.startDate = ''
      form.value.endDate = ''
    }
  } else {
    console.warn('Formulário inválido:', errors.value)
  }
}

function validateForm() {
  errors.value = {}

  if (!form.value.code) {
    errors.value.code = 'Inválido.'
  }

  if (form.value.discount === null || form.value.discount < 0 || form.value.discount > 100) {
    errors.value.discount = 'Inválido.'
  }

  if (!form.value.startDate) {
    errors.value.startDate = 'Inválido.'
  }

  if (!form.value.endDate) {
    errors.value.endDate = 'Inválido.'
  }

  // Verifica ordem das datas
  if (isValidDate(form.value.startDate) && isValidDate(form.value.endDate)) {
    const [sd, sm, sy] = form.value.startDate.split('/').map(Number)
    const [ed, em, ey] = form.value.endDate.split('/').map(Number)

    const start = new Date(sy, sm - 1, sd)
    const end = new Date(ey, em - 1, ed)

    if (start > end) {
      errors.value.endDate = 'Inválido'
    }
  }

  return Object.keys(errors.value).length === 0
}

function maskDate(field) {
  let value = form.value[field]

  // Remove tudo que não for número
  value = value.replace(/\D/g, '')

  // Aplica a máscara: dd/mm/aaaa
  if (value.length > 2) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  if (value.length > 5) {
    value = value.slice(0, 5) + '/' + value.slice(5, 10)
  }

  // Limita a 10 caracteres (dd/mm/aaaa)
  form.value[field] = value.slice(0, 10)
}

function isValidDate(dateStr) {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/
  if (!regex.test(dateStr)) return false

  const [d, m, y] = dateStr.split('/').map(Number)
  const date = new Date(y, m - 1, d)

  return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d
}
</script>

<style scoped>
/* Container */
.cupom_form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

/* Titulo */
h1 {
  font-size: clamp(17px, 20px, 24px);
  color: #b5d985;
  font-weight: 800;
}

p {
  color: #b5d985;
  font-weight: 800;
  font-size: 16px;
  margin-left: 5px;
}

span {
  color: #b32828;
  font-size: 13px;
  margin-left: 5px;
  font-weight: 600;
}

input {
  border: 1px solid #b5d985;
  padding: 8px 16px;
  border-radius: 6px;
  width: 100%;
}

input:focus {
  outline: 1px solid #b5d985;
}

/* Top Inputs do Cupom */
.top_inps {
  display: flex;
  gap: 3%;
  max-width: 400px;
}

.code_inp {
  width: 70%;
}

.porcentage_inp {
  width: 27%;
}

/* Bottom Inputs do Cupom */
.bottom_inps {
  display: flex;
  gap: 3%;
  max-width: 400px;
}

.data_initial_inp {
  width: 48.5%;
}

.btn {
  background-color: #b5d985;
  height: 40px;
  width: 100%;
  border-radius: 6px;
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  transform: scale(1.02);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
}

/* Select */
.select_container {
  display: flex;
  gap: 10px;
  align-items: center;
}

select {
  border: 1px solid #b5d985;
  background-color: white;
  padding: 8px 16px;
  border-radius: 6px;
  width: 70%;
  font-weight: 600;
  color: #4b4b4b;
  cursor: pointer;
  transition: 0.3s;
  height: 40px;
}

option {
  cursor: pointer;
  transition: 0.3s;
}

option:hover {
  background-color: #b5d985;
  color: white;
}

select:focus {
  outline: none;
}

select:hover {
  transform: scale(1.02);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
}

.delete_btn {
  padding: 8px 16px;
  height: 40px;
  width: 25%;
  border-radius: 6px;
  background-color: #b32828;
  color: white;
  font-weight: 800;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.9;
}

.delete_btn:hover {
  transform: scale(1.02);
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.1);
  opacity: 1;
}
</style>

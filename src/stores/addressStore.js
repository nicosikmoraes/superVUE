import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './userStore'

export const useAddressStore = defineStore('address', () => {
  // Variáveis
  const userStore = useUserStore()

  const countries = ref([])
  const selectedCountry = ref('BR')

  const states = ref([])
  const selectedState = ref('')
  const stateSign = ref('')

  const cities = ref([])
  const selectedCity = ref('')

  const street = ref('')
  const number = ref(null)

  const cep = ref('')

  const addresses = ref([])
  const selectedAddress = ref([])
  // Funções

  async function getCountries() {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2')

      countries.value = response.data.sort((a, b) => a.name.common.localeCompare(b.name.common))
    } catch (err) {
      console.error('Erro ao obter países:', err.response?.data || err.message)
      return null
    }
  }

  async function getBrazilianStates() {
    try {
      const response = await axios.get(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
      )

      states.value = response.data.sort((a, b) => a.nome.localeCompare(b.nome))

      return response.data
    } catch (err) {
      console.error('Erro ao obter estados:', err.response?.data || err.message)
      return null
    }
  }

  async function getCitiesByState(state) {
    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
      )

      cities.value = response.data.sort((a, b) => a.nome.localeCompare(b.nome))
    } catch (err) {
      console.error('Erro ao obter cidades:', err.response?.data || err.message)
      return null
    }
  }

  async function createAddress() {
    try {
      const response = await axios.post(
        'http://35.196.79.227:8000/addresses/',
        {
          street: street.value,
          number: number.value,
          zip: cep.value,
          city: selectedCity.value.nome,
          state: selectedState.value,
          country: selectedCountry.value,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      return response.data
    } catch (err) {
      console.error('Erro ao criar endereço:', err.response?.data || err.message)
      return null
    }
  }

  async function getAddresses() {
    try {
      const response = await axios.get('http://35.196.79.227:8000/addresses/', {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      // Adiciona a propriedade 'checked' (inicialmente false) a cada endereço
      addresses.value = response.data.map((address) => ({
        ...address,
        checked: false,
      }))

      return addresses.value
    } catch (err) {
      console.error('Erro ao obter endereços:', err.response?.data || err.message)
      return null
    }
  }

  async function deleteAddress(id) {
    try {
      const response = await axios.delete(`http://35.196.79.227:8000/addresses/${id}`, {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      await getAddresses()
      return response.data
    } catch (err) {
      console.error('Erro ao deletar endereço:', err.response?.data || err.message)
      return null
    }
  }

  // Retornando
  return {
    countries,
    selectedCountry,
    states,
    selectedState,
    stateSign,
    cities,
    selectedCity,
    street,
    number,
    cep,
    addresses,
    selectedAddress,
    getCitiesByState,
    getCountries,
    getBrazilianStates,
    createAddress,
    getAddresses,
    deleteAddress,
  }
})

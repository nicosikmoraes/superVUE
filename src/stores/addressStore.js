import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAddressStore = defineStore('address', () => {
  // Variáveis
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
  // Funções

  async function getCountries() {
    try {
      const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2')

      console.log('Países obtidos com sucesso:', response.data)

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
      console.log('Estados:', states)

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
      console.log('Cidades:', cities)
    } catch (err) {
      console.error('Erro ao obter cidades:', err.response?.data || err.message)
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
    getCitiesByState,
    getCountries,
    getBrazilianStates,
  }
})

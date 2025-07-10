import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useUserStore } from './userStore'
import axios from 'axios'
import { useAlertStore } from './alertasStore'

export const useAdminStore = defineStore('admin', () => {
  // Variáveis
  const products = ref([])

  //Stores
  const userStore = useUserStore()

  //Mostrar Componentes
  const showCategories = ref(true)
  const showProducts = ref(true)
  const editProduct = ref(false)

  //IDs
  const idSelected = ref(null)
  const idProductSelected = ref(null)

  //Loading
  const loadingProducts = ref(false)

  //Caminho padrão da API
  const api = axios.create({
    baseURL: 'http://35.196.79.227:8000',
  })

  // Funções

  // Função para criar um novo moderador
  async function createModerator(moderator) {
    try {
      const response = await api.post(
        '/users/create-moderator',
        {
          name: moderator.name,
          email: moderator.email,
          password: moderator.password,
          role: 'MODERATOR',
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      console.log('Moderador criado com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.log('Erro no createModerator:', err.response?.data || err.message)
      return null
    }
  }

  // Função para criar uma nova categoria
  async function createCategory(data) {
    const formData = new FormData()

    formData.append('name', data.name)

    if (data.description) {
      formData.append('description', data.description)
    }

    if (data.imageFile) {
      formData.append('image', data.imageFile)
    }

    try {
      const response = await api.post('/categories/', formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      console.log('Categoria criada com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.log('Erro no createCategory:', err.response?.data || err.message)
      return null
    }
  }

  async function getCategories() {
    try {
      const res = await api.get(`/categories/user/${userStore.userMe.id}`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      return res.data
    } catch (err) {
      console.log('Erro no getCategories:', err.response?.data || err.message)
      return null
    }
  }

  async function deleteCategory(id) {
    try {
      const response = await api.delete(`/categories/${id}`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      console.log('Categoria deletada com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.log('Erro no deleteCategory:', err.response?.data || err.message)
      return null
    }
  }

  async function createProduct(data) {
    try {
      //Formatando os dados
      const formData = new FormData()

      formData.append('name', data.name)
      formData.append('price', data.price)
      formData.append('stock', data.stock)

      if (!idSelected.value) {
        throw new Error('Nenhuma categoria selecionada')
      }

      formData.append('category_id', idSelected.value)

      //Formata os dados só se eles existirem já que são opcionais
      if (data.description) {
        formData.append('description', data.description)
      }

      if (data.imageFile) {
        formData.append('image', data.imageFile)
      }

      //Faz a requisição
      const response = await api.post('/products/', formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      console.log('Produto criado com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.log('Erro no createProduct:', err.response?.data || err.message)
      return null
    }
  }

  async function updateProduct(data) {
    if (
      data.imageFile !==
      products.value.find((product) => product.id === idProductSelected.value).image_path
    ) {
      console.log('Imagem alterada')
      await updateImg(data.imageFile)
    }

    await updateStock(data.stock)

    try {
      const response = await api.put(
        `/products/${idProductSelected.value}`,
        {
          name: data.name,
          price: data.price,
          description: data.description,
          category_id: idSelected.value,
        },
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userStore.userMe.token}`,
          },
        },
      )

      console.log('Produto atualizado com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.log('Erro no editProduct:', err.response?.data || err.message)
      return null
    }
  }

  async function updateStock(stock) {
    try {
      const response = await api.put(
        `/products/${idProductSelected.value}/stock`,
        {
          stock: stock,
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
      console.log('Erro no updateStock:', err.response?.data || err.message)
      return null
    }
  }

  async function updateImg(imageFile) {
    try {
      const formData = new FormData()
      formData.append('image', imageFile)

      const response = await api.put(`/products/${idProductSelected.value}/image`, formData, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      console.log('Imagem atualizada com sucesso!', response.data)
      return response.data
    } catch (err) {
      console.log('Erro no updateImg:', err.response?.data || err.message)
      return null
    }
  }

  async function getAllProducts() {
    try {
      const res = await api.get(`/products/user/144`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      //Adicionando a propriedade hover
      const hoverProducts = res.data.map((product) => ({
        ...product,
        hover: false,
      }))

      products.value = hoverProducts
      return products.value
    } catch (err) {
      console.log('Erro no getAllProducts:', err.response?.data || err.message)
      return null
    }
  }

  async function getCategoryProducts() {
    try {
      const res = await api.get(`/products/category/${idSelected.value}`, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      products.value = res.data
      return res.data
    } catch (err) {
      console.log('Erro no getCategoryProducts:', err.response?.data || err.message)
      return null
    }
  }

  async function deleteProduct(id) {
    try {
      const res = await api.delete(`/products/${id}`, {
        headers: {
          accept: '*/*',
          Authorization: `Bearer ${userStore.userMe.token}`,
        },
      })

      console.log('Produto deletado com sucesso!', res.data)
      return res.data
    } catch (err) {
      console.log('Erro no deleteProduct:', err.response?.data || err.message)
      return null
    }
  }

  // Retornando
  return {
    deleteProduct,
    createModerator,
    createCategory,
    getCategories,
    deleteCategory,
    createProduct,
    getAllProducts,
    getCategoryProducts,
    updateProduct,
    updateStock,
    updateImg,
    editProduct,
    showCategories,
    showProducts,
    idSelected,
    products,
    loadingProducts,
    idProductSelected,
  }
})

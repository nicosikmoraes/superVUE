import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

export const useAlertStore = defineStore('alert', () => {
  // Variáveis
  const router = useRouter()

  // Alerta se Sucesso
  function registerAlert() {
    Swal.fire({
      title: 'Conta criada',
      text: 'Cadastro realizado com sucesso!',
      icon: 'success',
      confirmButtonText: 'Ok',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/')
      }
    })
  }

  function errorRegisterAlert() {
    Swal.fire({
      icon: 'error',
      title: 'E-mail já cadastrado',
      text: 'Já existe uma conta com esse endereço de e-mail.',
      confirmButtonText: 'OK',
    })
  }

  function errorLoginAlert() {
    Swal.fire({
      icon: 'error',
      title: 'Conta não encontrada',
      text: 'Email ou senha inválidos.',
      confirmButtonText: 'OK',
    })
  }

  // Retornando
  return {
    registerAlert,
    errorRegisterAlert,
    errorLoginAlert,
  }
})

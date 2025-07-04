import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import { useUserStore } from './userStore'

export const useAlertStore = defineStore('alert', () => {
  // Variáveis
  const router = useRouter()
  const userStore = useUserStore()

  // Alertas de Sucesso

  function registerAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Conta Criada!',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  function loginAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Seja bem vindo ' + userStore.userMe.name + '!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  // Alertas de Erro
  function errorRegisterAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: 'E-mail já cadastrado!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#DB4441',
      color: '#fff',
    })
  }

  function errorLoginAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: 'Email ou senha inválidos!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#DB4441',
      color: '#fff',
    })
  }

  // Avisos
  function quitAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'warning',
      title: 'Você saiu da sua conta!',
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  // Retornando
  return {
    errorRegisterAlert,
    errorLoginAlert,
    quitAlert,
    registerAlert,
    loginAlert,
  }
})

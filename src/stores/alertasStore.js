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

  function updateNameAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Nome Atualizado!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  function updateImageAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Imagem Atualizada!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  function categoryAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Categoria Criada!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  function deleteAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Conta Deletada!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  function categoryDeleteAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Categoria Deletada!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  function updateEmailAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: 'Email Atualizado!',
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

  function errorUpdateNameAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: 'O nome precisa ser diferente!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#DB4441',
      color: '#fff',
    })
  }

  function errorUpdateEmailAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: 'O email precisa ser diferente!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#DB4441',
      color: '#fff',
    })
  }

  function errorUploadAlert() {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: 'Apenas arquivos JPG ou PNG são permitidos.',
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

  // ALERTA DE ERRO PADRÃO
  function errorAlert(message) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#DB4441',
      color: '#fff',
    })
  }

  //ALERTA DE SUCESSO PADRÃO
  function successAlert(message) {
    Swal.fire({
      toast: true,
      position: 'bottom-end',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#7CBB70',
      color: '#fff',
    })
  }

  // Retornando
  return {
    errorRegisterAlert,
    errorLoginAlert,
    errorUpdateNameAlert,
    errorUpdateEmailAlert,
    errorUploadAlert,
    quitAlert,
    registerAlert,
    loginAlert,
    updateNameAlert,
    updateEmailAlert,
    updateImageAlert,
    deleteAlert,
    categoryDeleteAlert,
    categoryAlert,
    errorAlert,
    successAlert,
  }
})

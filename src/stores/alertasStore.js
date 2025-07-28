import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const useAlertStore = defineStore('alert', () => {
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
    quitAlert,
    errorAlert,
    successAlert,
  }
})

<template>
  <div class="login">
    <FormHeader />

    <RegisterForm />

    <FormFooter />
  </div>
</template>

<script setup>
import FormFooter from '../formFooter.vue'
import FormHeader from '../formHeader.vue'
import RegisterForm from './registerForm.vue'
</script>

<style scoped>
.login {
  width: 500px;
  height: 600px;
  border: 3px solid #b5d985;
  box-shadow: 0px 4px 7px #b5d985;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 600px) {
  .login {
    width: 90vw;
  }
}
</style>

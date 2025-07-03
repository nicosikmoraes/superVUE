<template>
  <div class="login">
    <FormHeader />

    <LoginForm />

    <LoginFooter />
  </div>
</template>

<script setup>
import LoginFooter from '../formFooter.vue'
import LoginForm from './loginForm.vue'
import FormHeader from '../formHeader.vue'
</script>

<style scoped>
.login {
  width: 500px;
  height: 550px;
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

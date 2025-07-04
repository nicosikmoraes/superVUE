<template>
  <div class="config_main">
    <div class="main_header"><h1 id="header_text">Configurações</h1></div>
    <UserPerfil v-if="configStore.whichUserMenu === 0" />
    <UserSecurity v-if="configStore.whichUserMenu === 1" />
  </div>
</template>

<script setup>
import UserPerfil from './user/userPerfil.vue'
import { useConfigStore } from '@/stores/configStore'
import UserSecurity from './user/userSecurity.vue'

const configStore = useConfigStore()
</script>

<style scoped>
.config_main {
  min-width: 450px;
  min-height: 65vh;
  border-radius: 12px;
  box-shadow: 0px 4px 16px #969696;
}

@media (max-width: 600px) {
  .config_main {
    min-width: 60%;
    max-width: 60%;
  }
}

/* Header */
.main_header {
  width: 100%;
  height: 60px;
  background-color: #b5d985;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  color: white;
}

#header_text {
  font-size: 20px;
  font-weight: 650;
}
</style>

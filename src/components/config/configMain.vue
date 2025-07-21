<template>
  <div class="config_main">
    <div class="main_header"><h1 id="header_text">Configurações</h1></div>
    <UserPerfil v-if="configStore.whichMenu === 0" />
    <UserSecurity v-if="configStore.whichMenu === 1" />
    <Moderators v-if="configStore.whichMenu === 2" />
    <Categories v-if="configStore.whichMenu === 3" />
    <Products v-if="configStore.whichMenu === 4" />
    <Requests v-if="configStore.whichMenu === 5" />
    <MyRequests v-if="configStore.whichMenu === 6" />
  </div>
</template>

<script setup>
import UserPerfil from './user/userPerfil.vue'
import { useConfigStore } from '@/stores/configStore'
import UserSecurity from './user/userSecurity.vue'
import Moderators from './admin/moderators.vue'
import Categories from './admin/categories/categories.vue'
import Products from './admin/products/products.vue'
import Requests from './admin/requests.vue'
import MyRequests from './user/myRequests.vue'

const configStore = useConfigStore()
</script>

<style scoped>
.config_main {
  min-width: 450px;
  max-width: 1200px;
  height: 65vh;
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

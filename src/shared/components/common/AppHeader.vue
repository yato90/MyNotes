<template>
  <header>
    <img src="../../assets/icons/Logo.svg" alt="Logo" class="login_image" />
    <BaseButton @click="toggleModal()" v-if="!token">
      <img src="../../assets/icons/Login.svg" alt="Login" />
      Вход
    </BaseButton>
    <div v-else class="profile">
      <p class="text_small">{{ email }}</p>
      <div class="user" @click="showTooltip = !showTooltip">
        <img src="../../assets/icons/User.svg" />
        <div v-if="showTooltip" class="tooltip" :style="tooltipStyles">
          <a @click="logOut()">Выйти</a>
        </div>
      </div>
    </div>
  </header>
  <Loginmodal :showModal="showModal" @update:showModal="showModal = $event" />
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import { ref } from 'vue'
import Loginmodal from './LoginModal.vue'
import { LogOut } from '../../../app/api/auth'

const showModal = ref(false)
const token = ref(localStorage.getItem('accessToken') ?? null)
const email = ref(localStorage.getItem('emailUser') ?? null)
const toggleModal = () => {
  showModal.value = true
}
const logOut = async () => {
  await LogOut()
}
const showTooltip = ref(false)
const tooltipStyles = ref({ left: '-75px', top: '63px' })
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 160px;
  width: 100%;
}
.profile {
  display: flex;
  align-items: center;
  gap: 12px;
}
.text_small {
  color: var(--color-white);
}
.user {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 100%;
  background-color: var(--color-dark-middle);
}
.tooltip {
  position: absolute;
  border-radius: 12px;
  padding: 40px;
  background-color: var(--color-dark-middle);
  z-index: 10;
}
@media (max-width: 1370px) {
  header {
    padding: 20px 80px;
  }
}
@media (max-width: 480px) {
  header {
    padding: 20px;
    height: 96px;
  }
  .login_image {
    width: 154px;
    height: 36px;
  }
}
</style>

<template>
  <BaseModal :visible="showModal" @update:visible="emit('update:showModal', $event)">
    <template v-if="isAuth">
      <div class="login">
        <h2>Вход в ваш аккаунт</h2>
        <form @submit.prevent>
          <div class="email">
            <p class="text_small title">Email</p>
            <BaseInput v-model="email" placeholder="Введите Email" type="text" />
          </div>
          <div class="password">
            <p class="text_small title">Пароль</p>
            <BaseInput v-model="password" placeholder="Введите пароль" type="password" />
          </div>
        </form>
        <div class="bottom_actions">
          <div class="bottom_text">
            <p class="text_small">У вас нет аккаунта?</p>
            <a @click="changeAuth('register')">Зарегистрируйтесь</a>
          </div>
          <BaseButton @click="submit('login')">Войти</BaseButton>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="login">
        <h2>Регистрация</h2>
        <form @submit.prevent>
          <div class="email">
            <p class="text_small title">Email</p>
            <BaseInput v-model="email" placeholder="Введите Email" type="text" />
          </div>
          <div class="password">
            <p class="text_small title">Пароль</p>
            <BaseInput v-model="password" placeholder="Введите пароль" type="password" />
          </div>
          <div class="password">
            <p class="text_small title">Пароль ещё раз</p>
            <BaseInput v-model="confirmPass" placeholder="Введите пароль" type="password" />
          </div>
        </form>
        <div class="bottom_actions">
          <div class="bottom_text">
            <p class="text_small">У вас есть аккаунт?</p>
            <a @click="changeAuth('login')">Войдите</a>
          </div>
          <BaseButton @click="submit('register')">Зарегистрироваться</BaseButton>
        </div>
      </div>
    </template>
    <div class="error" v-if="errorMessage !== null">
      {{ errorMessage }}
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import BaseModal from '../ui/BaseModal.vue'
import BaseInput from '../ui/BaseInput.vue'
import { ref } from 'vue'
import { login, register } from '../../../app/api/auth'
import { useRouter } from 'vue-router'

defineProps<{ showModal: boolean }>()
const router = useRouter()
const isAuth = ref<boolean>(true)
const email = ref<string>('')
const password = ref<string>('')
const confirmPass = ref<string>('')
const errorMessage = ref<string | null>(null)

const emit = defineEmits(['update:showModal'])

const submit = async (type: 'register' | 'login') => {
  if (type === 'register') {
    const { error } = await register(email.value, password.value, confirmPass.value)
    if (error.value) {
      errorMessage.value = error.value
      return
    }
    alert('успех')
  } else if (type === 'login') {
    const { data, error } = await login(email.value, password.value)
    if (error.value) {
      errorMessage.value = error.value
      return
    }
    if (data.value && data.value.accessToken) {
      localStorage.setItem('accessToken', data.value.accessToken)
      localStorage.setItem('emailUser', email.value)
      router.push('/notes').then(() => {
        window.location.reload()
      })
    } else {
      console.error('Ошибка: accessToken не найден в ответе')
    }
  }
  emit('update:showModal', false)
}
const changeAuth = (type: 'register' | 'login') => {
  if (type === 'register') isAuth.value = false
  else isAuth.value = true
}
</script>

<style scoped>
h2 {
  color: var(--color-white);
}
form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.login {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.email {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.password {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.text_small {
  color: var(--color-gray);
}
.title {
  padding: 0px 24px;
}
.bottom_actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.bottom_text {
  display: flex;
  gap: 4px;
  align-items: center;
  flex-wrap: wrap;
}
.error {
  margin-top: 28px;
  border-radius: 24px;
  padding: 8px 20px;
  width: 100%;
  background: rgba(255, 116, 97, 0.1);
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 18px;
  line-height: 156%;
  color: #ff7461;
}
@media (max-width: 680px) {
  .bottom_actions {
    flex-direction: column-reverse;
    button {
      width: 100%;
    }
  }
}
</style>

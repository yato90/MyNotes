<template>
  <div class="input-wrapper">
    <textarea
      :type="isPasswordVisible ? 'text' : type"
      :placeholder="placeholder"
      :value="modelValue"
      :maxlength="maxLength"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <button v-if="type === 'password'" @click="togglePasswordVisibility" class="eye-button">
      <img v-if="isPasswordVisible" src="../../assets/icons/OnPassword.svg" />
      <img v-else src="../../assets/icons/OffPassword.svg" />
    </button>
    <div v-if="showCounter && maxLength" class="char-counter">
      <p class="text_small">{{ modelValue.length }} / {{ maxLength }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'

defineProps<{
  modelValue: string
  placeholder?: string
  type?: string
  maxLength?: number
  showCounter?: boolean
}>()

const isPasswordVisible = ref(false)

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<style scoped>
.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
textarea {
  border-radius: 36px;
  padding: 16px;
  background: var(--color-white);
  border: 1px solid #ccc;
  height: 72px;
  width: 100%;
  outline: none;
  min-height: 244px;
  resize: none;
  overflow: auto;
}
textarea::placeholder {
  color: var(--color-gray);
}
.eye-button {
  display: flex;
  align-items: center;
  position: absolute;
  right: 28px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
}
.text_small {
  color: var(--color-gray);
}
.char-counter {
  font-size: 12px;
  color: gray;
  position: absolute;
  right: 5px;
  bottom: -33px;
}
</style>

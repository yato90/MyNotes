<template>
  <div v-if="props.visible" class="modal-overlay">
    <div class="modal">
      <BaseButton @click="close" class="close-button">
        <img src="../../assets/icons/Close.svg" alt="Close" />
      </BaseButton>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['update:visible'])

const close = () => {
  emit('update:visible', false)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 31, 56, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal {
  background: var(--color-dark-middle);
  padding: 20px;
  border-radius: 8px;
  position: relative;
  max-width: 100%;
  border-radius: 40px;
  padding: 80px;
  width: 780px;
}
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 56px;
}
@media (max-width: 1366px) {
  .modal {
    width: 594px;
  }
}
@media (max-width: 770px) {
  .modal {
    width: 688px;
  }
}
@media (max-width: 680px) {
  .modal {
    width: 352px;
    padding: 90px 16px;
  }
}
</style>

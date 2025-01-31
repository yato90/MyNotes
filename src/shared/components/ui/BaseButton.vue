<template>
  <button>
    <slot></slot>
  </button>
</template>

<script setup lang="ts"></script>

<style scoped>
button {
  border-radius: 32px;
  padding: 0px 24px;
  background: var(--color-green-light);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
  font-family: 'Montserrat-Medium', sans-serif;
  font-weight: 500;
  font-size: 20px;
  line-height: 160%;
  gap: 12px;
  height: 56px;
}
button:hover {
  background: var(--color-green-middle);
}
button:active {
  background: var(--color-green-dark);
}
button:disabled {
  background: var(--color-gray);
}
</style>

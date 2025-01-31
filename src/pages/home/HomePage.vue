<template>
  <div class="main_block">
    <div class="left_info">
      <h1>Мои заметки</h1>
      <h3>Не забывай о важном, храни его в облаке.</h3>
    </div>
    <div class="righr_img">
      <img src="../../shared/assets/img/Group.png" alt="Group" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { router } from '../../app/router'

const token = ref(localStorage.getItem('accessToken') ?? null)
onMounted(() => {
  if (token) {
    router.push('/notes')
  }
})
</script>

<style scoped>
h1 {
  color: var(--color-white);
}
h3 {
  color: var(--color-gray);
}
.main_block {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left_info {
  width: 642px;
  height: 392px;
}
.righr_img {
  width: 897px;
  max-height: 864px;
  img {
    width: 100%;
    height: 100%;
  }
}
@media (max-width: 1370px) {
  .righr_img {
    width: 627px;
    height: 604px;
  }
}
@media (max-width: 1300px) {
  .main_block {
    flex-direction: column;
  }
  .left_info {
    width: auto;
    height: auto;
    margin-top: 40px;
    text-align: center;
  }
  .righr_img {
    width: auto;
    height: auto;
  }
}
</style>

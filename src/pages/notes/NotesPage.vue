<template>
  <div class="notes_page">
    <NotesList />
    <BaseButton class="add" @click="toggleAddModal()">
      <img src="../../shared/assets/icons/Add.svg" alt="Add" />
    </BaseButton>
    <AddModal :showModal="showModal" @update:showModal="showModal = $event" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../../shared/components/ui/BaseButton.vue'
import NotesList from './components/NotesList.vue'
import AddModal from './components/AddModal.vue'

const showModal = ref<boolean>(false)
const toggleAddModal = () => {
  console.log('test')
  showModal.value = true
}
</script>

<style scoped>
.notes_page {
  /* position: relative; */
  height: 82vh;
}
.add {
  width: 56px;
  height: 56px;
  position: absolute;
  bottom: 30px;
  right: 30px;
  box-shadow: 0 15px 46px -10px rgba(0, 0, 0, 0.6);
}
</style>

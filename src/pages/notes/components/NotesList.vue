<template>
  <div class="notes">
    <NotesCard v-for="items in notes" :key="items.id" :notes="items" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import NotesCard from './NotesCard.vue'
import { getNotes } from '../api/notesApi'
import type { INotesResponse } from '../types/notestype'

onMounted(async () => {
  const { data, error } = await getNotes()
  if (error.value) {
    console.log(error.value)
  } else if (data.value) {
    notes.value = data.value
  }
})
const notes = ref<INotesResponse[]>()
</script>

<style scoped>
.notes {
  padding: 40px 0px;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  align-items: start;
}
@media (max-width: 1200px) {
  .notes {
    display: flex;
    flex-direction: column;
  }
}
</style>

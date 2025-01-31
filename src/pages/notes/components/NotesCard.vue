<template>
  <div class="note">
    <div class="title">
      <h4>{{ notes.title }}</h4>
    </div>
    <div class="info">
      <p class="text_normal">
        {{ notes.content }}
      </p>
    </div>
    <div class="action">
      <div class="delete" @click="remove(notes.id)">
        <img src="../../../shared/assets/icons/Close.svg" />
        <p class="text_normal">Удалить</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { deleteNote } from '../api/notesApi'
import type { INotesResponse } from '../types/notestype'

defineProps<{ notes: INotesResponse }>()
const remove = async (id: number) => {
  await deleteNote(id)
  window.location.reload()
}
</script>

<style scoped>
h4 {
  color: var(--color-white);
}
.note {
  position: relative;
  border-radius: 12px 0 12px 12px;
  box-shadow: 0 15px 15px -10px rgba(0, 0, 0, 0.4);
  background: var(--color-green-light);
  height: auto;
  overflow: hidden;
}
@media (max-width: 1214px) {
  .note {
    width: 100%;
    overflow: visible;
  }
}
.note:after {
  content: '';
  position: absolute;
  top: 0%;
  right: 0%;
  width: 0px;
  height: 0px;
  border-radius: 0 0 0 12px;
  background: var(--color-green);
  border-top: 41px solid var(--color-dark);
  border-left: 41px solid transparent;
}
.title {
  padding: 20px 56px 20px 28px;
  border-bottom: 1px solid #97ab0d;
}
.info {
  color: var(--color-white);
  padding: 20px 28px 28px 28px;
}
.action {
  display: flex;
  justify-content: end;
  padding: 8px;
}
.delete {
  cursor: pointer;
  color: var(--color-white);
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 24px;
}
.delete:hover {
  color: var(--color-gray);
}
</style>

<template>
  <BaseModal :visible="showModal" @update:visible="emit('update:showModal', $event)">
    <div class="add_form">
      <h2>Добавление заметки</h2>
      <form @submit.prevent>
        <div class="title_input">
          <p class="text_small title">Название заметки</p>
          <BaseInput
            v-model="title"
            placeholder="Введите название"
            type="text"
            :maxLength="100"
            :showCounter="true"
          />
        </div>
        <div class="description">
          <p class="text_small title">Текст заметки</p>
          <BaseTextArea
            v-model="description"
            placeholder="Введите текст"
            type="text"
            :maxLength="500"
            :showCounter="true"
          />
        </div>
      </form>
      <div class="bottom_actions">
        <BaseButton @click="submit()">Добавить</BaseButton>
      </div>
    </div>
    <div class="error" v-if="errorMessage !== null">
      {{ errorMessage }}
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseButton from '../../../shared/components/ui/BaseButton.vue'
import BaseModal from '../../../shared/components/ui/BaseModal.vue'
import BaseInput from '../../../shared/components/ui/BaseInput.vue'
import { ref } from 'vue'
import BaseTextArea from '../../../shared/components/ui/BaseTextArea.vue'
import { addNote } from '../api/notesApi'

defineProps<{ showModal: boolean }>()
const title = ref<string>('')
const description = ref<string>('')
const errorMessage = ref<string | null>(null)

const emit = defineEmits(['update:showModal'])

const submit = async () => {
  const { error } = await addNote(title.value, description.value)
  if (error.value) {
    errorMessage.value = error.value
    return
  }
  window.location.reload()
  emit('update:showModal', false)
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
.add_form {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.title_input {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.description {
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
  justify-content: end;
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

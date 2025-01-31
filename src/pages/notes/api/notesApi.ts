import { BaseApiUrl } from '../../../app/api/apiUrls'
import { useFetch } from '../../../app/api/useFetch'
import type { INotesResponse } from '../types/notestype'

export async function addNote(title: string, description: string) {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('Токен доступа не найден!')
  }
  const params = {
    title: title,
    content: description
  }
  const { data, error } = await useFetch(BaseApiUrl.Task + 'api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(params)
  })
  return { data, error }
}

export async function getNotes() {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('Токен доступа не найден!')
  }
  const { data, error } = await useFetch<INotesResponse[]>(BaseApiUrl.Task + 'api/notes', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  return { data, error }
}
export async function deleteNote(id: number) {
  const accessToken = localStorage.getItem('accessToken')
  if (!accessToken) {
    throw new Error('Токен доступа не найден!')
  }
  const { data, error } = await useFetch<INotesResponse[]>(BaseApiUrl.Task + `api/notes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  })
  return { data, error }
}

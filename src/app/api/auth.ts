import { BaseApiUrl } from './apiUrls'
import { router } from '../router'
import { useFetch } from './useFetch'
import type { AuthResponse } from '../types/auth'

export async function LogOut() {
  await useFetch<AuthResponse>(BaseApiUrl.Task + 'api/auth', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  localStorage.removeItem('accessToken')
  localStorage.removeItem('emailUser')
  router.push('/').then(() => {
    window.location.reload()
  })
}

export const checkLogin = async () => {
  const token = localStorage.getItem('accessToken')
  if (token === null) return 'logout'
  else if (token) return 'continue'
}

export const login = async (email: string, password: string) => {
  const params = {
    email: email,
    password: password
  }
  const { data, error } = await useFetch<AuthResponse>(BaseApiUrl.Task + 'api/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  return { data, error }
}

export const register = async (email: string, password: string, confirmPass: string) => {
  const params = {
    email: email,
    password: password,
    confirm_password: confirmPass
  }
  const { data, error } = await useFetch(BaseApiUrl.Task + 'api/reg', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
  return { data, error }
}

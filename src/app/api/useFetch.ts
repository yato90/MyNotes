import { ref } from 'vue'

export async function useFetch<T>(url: string, options: RequestInit = {}) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const loading = ref<boolean>(false)

  const fetchData = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || `Ошибка ${response.status}`)
      }
      data.value = await response.json()
    } catch (err: any) {
      error.value = err.message || 'Ошибка запроса'
    } finally {
      loading.value = false
    }
  }
  await fetchData()

  return { data, error, loading }
}

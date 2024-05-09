import { UseFetchOptions } from 'nuxt/app'

export function useAPI<T> (
  url: string | (() => string),
  options: Omit<UseFetchOptions<T>, 'default'> & { default: () => T | Ref<T> }
) {
  const config = useRuntimeConfig()
  const apiUrl = computed(() => typeof url === 'function' ? url() : url)
  return useFetch(apiUrl, {
    key: apiUrl,
    server: false,
    lazy: true,
    baseURL: config.public.API,
    immediate: false,
    ...options
  })
}

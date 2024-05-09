import pkg from './package.json'

export default defineNuxtConfig({
  css: [
    '@/assets/styles/main.scss'
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', as: 'style', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', as: 'style', href: 'https://fonts.gstatic.com', crossorigin: true },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap' }
      ]
    }
  },
  modules: [
    '@nuxtjs/device',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/eslint-module',
    '@nuxt/test-utils/module',
    '@vee-validate/nuxt',
    '@vueuse/nuxt',
    'dayjs-nuxt'
  ],
  veeValidate: {
    autoImports: true
  },
  runtimeConfig: {
    public: {
      VERSION: pkg.version,
      API: process.env.API_URL
    }
  },
  components: [
    { path: '@/components/dls', prefix: 'v' },
    { path: '@/components/common', prefix: 'com' },
    '@/components'
  ],
  devtools: { enabled: true }
})

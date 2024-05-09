import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    include: ['./test/**/*.test.ts'],
    exclude: ['node_modules', '.output', '.nuxt'],
    globals: true,
    coverage: {
      provider: 'istanbul',
      clean: false
    }
  }
})

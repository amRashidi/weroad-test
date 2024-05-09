import type { Config } from 'tailwindcss'
import { theme } from './tailwind/variables'
export default <Partial<Config>>{
  mode: 'jit',
  content: [
    './pages/**/*.{vue,tsx,js}',
    './components/**/*.{vue,tsx,js}'
  ],
  theme: {
    ...theme,
    screens: {
      sm: '100%',
      lg: '1140px'
    }
  },
  plugins: [
    'postcss-import'
  ]
}

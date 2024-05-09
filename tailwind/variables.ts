import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'
export const theme:Partial<Config['theme']> = {
  colors: {
    primary: '#FF4758',
    secondary: '#3A5669',
    warning: colors.amber[400],
    error: colors.rose[400],
    black: colors.black,
    white: colors.white,
    transparent: colors.transparent,
    gray: { ...colors.gray }
  },
  screens: {
    sm: '100%',
    lg: '1310px'
  },
  extend: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        lg: '0'
      }
    },
    fontFamily: {
      sans: ['Work Sans']
    }
  }
}

import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

// const fonts = { mono: `'Menlo', monospace` }
const fonts = {
  heading: "Mulish",
  body: "Montserrat",
}

const breakpoints = createBreakpoints({
  // sm: '40em',
  // md: '52em',
  // lg: '64em',
  // xl: '80em',
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
})
const colors = {
  black: '#16161D',
  brand_gray: '#E9ECF1',
  brand_purple: {
    100: '#f6effa',
    200: '#e5d0f0',
    300: '#d4b1e7',
    400: '#c392dd',
    450: '#AE74D2',
    500: '#7C80DB',
    600: '#9845c4',
    700: '#76319b',
    800: '#301445',
    900: '#2e143e'
  }
}

const theme = extendTheme(
  withDefaultColorScheme({ colorScheme: "brand_purple" }),
  {
  colors,
  fonts,
  breakpoints,
})

export default theme

import { createTheme } from '@mui/material/styles'
import { blue, deepOrange } from '@mui/material/colors'

export const theme = createTheme({
  palette: {
    primary: {
      main: blue['A700'],
    },
    secondary: {
      main: deepOrange[600],
    },
  },
})

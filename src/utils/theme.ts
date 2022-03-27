import { createTheme } from '@mui/material/styles';
import { blue, red } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue["A700"],
    },
    secondary: {
      main: red[600],
    },
  }
});
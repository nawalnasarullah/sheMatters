import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    black: {
      main: '#000000',
    },
    white: {
      main: '#ffffff',
    },
    primary: {
      main: '#005c65',
      hover:'#004654',
      dark: '#005368',
      darker: '#003a40',
      light:'rgba(0, 92, 101, 0.04)'

    },
    secondary: {
      main: '#FCEAEA',
      dark: '#f8cccc'
    },
    grey: {
      main: '#acacac',
      brownish: '#aaa',
      light: '#f8f8f8'
    }
  },
  typography: {
    fontFamily: '"Khula", sans-serif', 
    h1: {
      fontFamily: '"Signika", sans-serif',
    },
    h2: {
      fontFamily: '"Signika", sans-serif',
    },
    h5: {
      fontFamily: '"Signika", sans-serif',
    },
    body1: {
      fontFamily: '"Khula", sans-serif',
      fontSize: 14,
      fontWeight: 500,
    },
    button: {
      fontFamily: '"Signika", sans-serif', 
      fontSize: 14,
    },
  },
});

export default theme;

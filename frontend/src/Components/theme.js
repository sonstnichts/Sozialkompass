import { createTheme } from '@mui/material';
import {red} from '@mui/material/colors';


// Sets up theme for page (blue color)
const theme = createTheme({
  spacing: 8,

  shape: {
    borderRadius: 100,
  }, 
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    background: {
      default: '#white',
      supp: '#003153',
      
    },
  },
});




export default theme; 

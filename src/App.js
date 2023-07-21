import Header from './components/Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

import CssBaseline from '@mui/material/CssBaseline';


const darkTheme = createTheme({
  direction: 'rtl',
  palette: {
    mode: 'dark',
    background:{
      paper : '#133165'
    }
  },
  // primary: ,
});



const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
    <Header />
  </ThemeProvider>
  );
}

export default App;

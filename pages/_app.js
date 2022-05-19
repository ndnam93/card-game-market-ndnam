
import { ThemeProvider } from 'styled-components';
import { theme } from '../config/themeVariables';

import '../styles/globals.css'
import '../styles/style.css'

function MyApp({ Component, pageProps }) {
  return (  
    <ThemeProvider theme={{ ...theme }}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp

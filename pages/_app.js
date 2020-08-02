import { Provider } from 'react-redux';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import store from '../store';
import './styles.css';
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ColorModeProvider value="dark">
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

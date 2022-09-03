import '../styles/global.css';
import Layout from '@/components/layout';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/josefin-sans/700.css';
import { AppProps } from 'next/app';
import { store } from '../src/redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Toaster />
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Layout>
    </ChakraProvider>
  );
};

export default App;

import '../styles/global.css';
import Layout from '@/components/layout';
import theme from '@/theme';
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/josefin-sans/700.css';
import { AppProps } from 'next/app';
import { store, persistor } from '../src/redux/store';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { PersistGate } from 'redux-persist/integration/react';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Layout>
            <Toaster position='bottom-center' />
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
};

export default App;

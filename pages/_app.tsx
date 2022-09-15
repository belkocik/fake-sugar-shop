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
import { UserProvider, Session } from '@auth0/nextjs-auth0';
import NextNProgress from 'nextjs-progressbar';

const App = ({
  Component,
  pageProps,
}: AppProps<{
  session: Session;
}>) => {
  const { user } = pageProps;

  return (
    <ChakraProvider theme={theme}>
      <UserProvider user={user}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Layout>
              <NextNProgress
                options={{ easing: 'ease', speed: 500 }}
                color='teal'
                height={4}
              />
              <Toaster position='top-center' />
              <Component {...pageProps} />
            </Layout>
          </PersistGate>
        </Provider>
      </UserProvider>
    </ChakraProvider>
  );
};

export default App;

import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer } from 'src/contexts/auth-context';
import { UserProvider } from '../contexts/user_context/user_context.js';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { EstoqueProvider } from '../contexts/components_context/estoque_context.js';
import { DataProvider } from '../contexts/data_context/data_context.js';
import { CorteCoracaoProvider } from '../contexts/corte.coracao.context.js';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  return (
    <CorteCoracaoProvider>
      <DataProvider>
        <UserProvider>
          <EstoqueProvider>
            <CacheProvider value={emotionCache}>
              <Head>
                <title>
                  Encanto das Frutas
                </title>
                <meta
                  name="viewport"
                  content="initial-scale=1, width=device-width"
                />
              </Head>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <AuthConsumer>
                    {
                      (auth) => auth.isLoading
                        ? <SplashScreen />
                        : getLayout(<Component {...pageProps} />)
                    }
                  </AuthConsumer>
                </ThemeProvider>
              </LocalizationProvider>
            </CacheProvider>
          </EstoqueProvider>
        </UserProvider>
      </DataProvider>
    </CorteCoracaoProvider>
  );
};

export default App;

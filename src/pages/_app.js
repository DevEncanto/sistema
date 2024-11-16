import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';

// Contextos

import { DataProvider } from '../contexts/contexts/data.context.js';

// Cache inicial
const clientSideEmotionCache = createEmotionCache();

// SplashScreen

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const { getLayout = (page) => page } = Component; // Suporte a layouts personalizados
  useNProgress(); // Hook de progresso

  const theme = createTheme(); // Tema da aplicação

  return (
    <DataProvider>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>Encanto das Frutas</title>
          <meta name="viewport" content="initial-scale=1, width=device-width" />
        </Head>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </LocalizationProvider>
      </CacheProvider>
    </DataProvider>
  );
};

export default App;

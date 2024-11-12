import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';

// Contextos
import { UserProvider } from '../contexts/user_context/user_context.js';
import { EstoqueProvider } from '../contexts/components_context/estoque_context.js';
import { DataProvider } from '../contexts/data_context/data_context.js';
import { CorteCoracaoProvider } from '../contexts/corte.coracao.context.js';

// Cache inicial
const clientSideEmotionCache = createEmotionCache();

// SplashScreen
const SplashScreen = () => null;

const App = ({ Component, emotionCache = clientSideEmotionCache, pageProps }) => {
  const { getLayout = (page) => page } = Component; // Suporte a layouts personalizados
  useNProgress(); // Hook de progresso

  const theme = createTheme(); // Tema da aplicação

  // Condicionalmente carrega os providers de contexto, dependendo da página
  const renderContextProviders = (page) => {
    if (page === '/someSpecificPage') {
      return (
        <CorteCoracaoProvider>
          <EstoqueProvider>
            <Component {...pageProps} />
          </EstoqueProvider>
        </CorteCoracaoProvider>
      );
    }

    // Default (aplica contextos padrão)
    return (
      <DataProvider>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </DataProvider>
    );
  };

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Encanto das Frutas</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthConsumer>
            {(auth) =>
              auth.isLoading ? (
                <SplashScreen />
              ) : (
                // Renderiza os contextos de acordo com a página
                getLayout(renderContextProviders(Component))
              )
            }
          </AuthConsumer>
        </ThemeProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;

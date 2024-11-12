import { useContext } from 'react';
import Head from 'next/head';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { DataContext } from '../../contexts/data_context/data_context';
import { UserContext } from '../../contexts/user_context/user_context';
import { UsuariosService } from '../../service/usuarios.service';


const Page = () => {

  const dataContext = useContext(DataContext)
  const userContext = useContext(UserContext)
  const { controle, gerenciarControle } = userContext

  const handleLogin = async () => {
    const aService = UsuariosService.build(userContext, dataContext)
    await aService.login()
  }

  return (
    <>
      <Head>
        <title>
          Login | Encanto
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '50px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Stack
                direction={`row`}
                spacing={2}
              >
                <Typography variant="h4">
                  Login
                </Typography>
                {controle.load ?
                  <img src="/assets/loading.svg" width={38} height={38} /> : <></>
                }

              </Stack>
            </Stack>
            <Stack
              sx={{
                height: "10px",
                margin: "-15px 0 20px 0"
              }}
            >
              {!!(controle.message) ?
                <Typography
                  color={controle.alert}
                  variant="body2"
                  fontWeight={600}
                >
                  {controle.message}
                </Typography> :
                <></>
              }
            </Stack>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Usuário ou E-mail"
                name="usuario"
                onChange={(e) => { gerenciarControle(e, "usuario") }}
                type="text"
                value={controle.usuario}
              />
              <TextField
                fullWidth
                label="Senha"
                name="password"
                onChange={(e) => { gerenciarControle(e, "senha") }}
                value={controle.senha}
                type="password"
              />
            </Stack>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
              onClick={handleLogin}
            >
              Logar
            </Button>

          </div>
        </Box>
      </Box >
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;

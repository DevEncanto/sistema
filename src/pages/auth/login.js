import { useCallback, useState, useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { login } from '../../util/util-login';
import { useRouter } from 'next/router';
import { UserContext } from '../../contexts/user_context/user_context';
import { DataContext } from '../../contexts/data_context/data_context';

const Page = () => {  
  const router = useRouter();
  const auth = useAuth();
  const [method, setMethod] = useState('email');
  const { setUser } = useContext(UserContext)
  const {iniciarControle} = useContext(DataContext)
  const [load, setLoad] = useState(false)
  const [usuario, setUsuario] = useState("")
  const [senha, setSenha] = useState("")
  const [message, setMessage] = useState("")
  const [alert, setAlert] = useState("")
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Digite um e-mail válido')
        .max(255)
        .required('E-mail é obrigatótio'),
      password: Yup
        .string()
        .max(255)
        .required('Senha obrigatória')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signIn(values.email, values.password);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  const handleLogin = async () => {
    await login(usuario, senha, setMessage, setAlert, router, iniciarControle, setLoad)
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
                {load ?
                  <img src="/assets/loading.svg" width={38} height={38} /> : <></>
                }
              </Stack>
              {!!(!message) ?
                // <Typography
                //   color="text.secondary"
                //   variant="body2"
                // >
                //   Ainda não possui uma conta?
                //   &nbsp;
                //   <Link
                //     component={NextLink}
                //     href="/auth/register"
                //     underline="hover"
                //     variant="subtitle2"
                //     color="cereja.100"
                //   >
                //     Faça o seu cadastro aqui!
                //   </Link>
                // </Typography>
                <></> 
                :
                <Typography
                  color={alert}
                  variant="body2"
                  fontWeight={600}
                >
                  {message}
                </Typography>
              }
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Usuário ou E-mail"
                  name="usuario"
                  onBlur={formik.handleBlur}
                  onChange={(e) => { setUsuario(e.target.value) }}
                  type="text"
                  value={usuario}
                  autoComplete=''
                />
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={(e) => { setSenha(e.target.value) }}
                  type="password"
                  value={senha}
                  autoComplete='on'
                />
              </Stack>
              <Stack>
                {/* <Button onClick={handleTrocarSenha}
                  sx={{
                    background: "none",
                    "&:hover": {
                      background: "none"
                    }
                  }}
                >
                  <Typography variant='h5'
                    sx={{
                      fontSize: "10pt",
                      margin: "5px 10px",
                      textDecoration: "underline",
                      cursor: "pointer",
                      color: "cereja.100"
                    }}>
                    Esqueceu sua senha?
                  </Typography>
                </Button> */}
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
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
            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;

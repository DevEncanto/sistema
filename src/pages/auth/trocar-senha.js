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
import { solicitarTokenEmail, trocarSenha } from 'src/util/util-trocar-senha';

const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const [sendEmail, setSendEmail] = useState(false)
  const { setUser } = useContext(UserContext)
  const [label, setLabel] = useState("")
  const [usuario, setUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [token, setToken] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("")
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
    await login(usuario, senha, setMessage, setAlert, router, setUser)
  }
  const handleSolicitarToken = async () => {
    await solicitarTokenEmail(email, router, setMessage, setColor, setSendEmail)
  }

  const handleTrocarSenha = async () => {
    await trocarSenha(senha, confirmar, token, setLabel, setColor, router)
  }
  return (
    <>
      <Head>
        <title>
          Alteração da Senha | CherrySocial
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
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Alteração da Senha
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Clique aqui para
                &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/login0"
                  underline="hover"
                  variant="subtitle2"
                  color="cereja.100"
                >
                voltar ao login!
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              {!sendEmail ?
                <Stack sx={{ marginBottom: "20px" }}>
                  {!!(!message) ?
                    <Typography sx={{ fontSize: "10pt", textAlign: "justify", fontWeight: 600 }}>
                      Digite seu e-mail da sua conta e solicite o token de validação, caso o e-mail for encontrado em nosssa base de dados, o token será enviado para sua caixa de entrada.
                    </Typography> :
                    <Typography sx={{ fontSize: "10pt", textAlign: "justify", fontWeight: 600, color: color }}>
                      {message}
                    </Typography>
                  }

                </Stack> :
                <Stack sx={{ marginBottom: "20px" }}>
                  {!!(!label) ?
                    <Typography sx={{ fontSize: "10pt", textAlign: "justify", fontWeight: 600 }}>
                      Informe sua nova senha e o token que foi enviado para o seu e-mail!
                    </Typography> :
                    <Typography sx={{ fontSize: "10pt", textAlign: "justify", fontWeight: 600, color: color }}>
                      {label}
                    </Typography>
                  }
                </Stack>
              }
              <Stack spacing={3}>
                {!sendEmail ?
                  <TextField
                    fullWidth
                    label="E-mail"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email"
                    value={email}
                    autoComplete=''
                  /> :
                  <></>

                }
                {sendEmail ?
                  <>
                    <TextField
                      fullWidth
                      label="Nova Senha"
                      name="Nova Senha'"
                      onBlur={formik.handleBlur}
                      onChange={(e) => { setSenha(e.target.value) }}
                      type="password"
                      value={senha}
                      autoComplete='on'
                    />
                    <TextField
                      fullWidth
                      label="Confirmar Senha"
                      name="confirmar senha"
                      onBlur={formik.handleBlur}
                      onChange={(e) => { setConfirmar(e.target.value) }}
                      type="password"
                      value={confirmar}
                      autoComplete='on'
                    />
                    <TextField
                      fullWidth
                      label="Token"
                      name="token"
                      onBlur={formik.handleBlur}
                      onChange={(e) => { setToken(e.target.value) }}
                      type="text"
                      value={token}
                      autoComplete='on'
                    />
                  </> :
                  <></>
                }
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
              {!sendEmail ?
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  onClick={handleSolicitarToken}
                >
                  Solicitar Token de Validação
                </Button> :
                <Button
                  fullWidth
                  size="large"
                  sx={{ mt: 3 }}
                  type="submit"
                  variant="contained"
                  onClick={handleTrocarSenha}
                >
                  Alterar Senha
                </Button>

              }
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

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useState } from 'react';
import { cadastrarUsuario } from 'src/util/util-cadastro';


const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Digite um e-mail válido')
        .max(255)
        .required('E-mail é obrigatótio'),
      name: Yup
        .string()
        .max(255)
        .required('Usuário é obrigatório'),
      password: Yup
        .string()
        .max(255)
        .required('Senha é obrigatória')
    }),
    onSubmit: async (values, helpers) => {
      try {
        await auth.signUp(values.email, values.name, values.password);
        router.push('/');
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const handleFormatUser = (e) => {
    let string = e.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g, "").trim()
    setNome(string.toLowerCase())
  }

  const handleCadastro = async () => {
    await cadastrarUsuario(email, senha, nome, confirmar, indicacao, router, setAlert, setMessage, setLoad)
  }

  const [nome, setNome] = useState("")
  const [load, setLoad] = useState(false)
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [indicacao, setIndicacao] = useState("")
  const [message, setMessage] = useState("")
  const [alert, setAlert] = useState("")
  return (
    <>
      <Head>
        <title>
          Cadastro | CherrySocial
        </title>
      </Head>
      <Box
        sx={{
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
              <Stack
                sx={{ alignItems: "center" }}
                spacing={2}
                direction={"row"}>
                <Typography variant="h4">
                  Cadastro
                </Typography>
                {load ?
                  <img src="/assets/loading.svg" width={38} height={38} /> : <></>
                }
              </Stack>

              {!!(!message) ?
                <Typography
                  color="text.secondary"
                  variant="body2"
                >
                  Já possui uma conta?
                  &nbsp;
                  <Link
                    component={NextLink}
                    href="/auth/login"
                    underline="hover"
                    variant="subtitle2"
                    color="cereja.100"
                  >
                    Realize o seu login!
                  </Link>
                </Typography> :
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
              <Stack spacing={1}>
                <TextField
                  pattern="[a-z0-9]"
                  fullWidth
                  label="Usuário"
                  name="name"
                  inputProps={{ maxLength: 20 }}
                  helperText={nome.length == 20 ? <Typography variant='h5' sx={{ color: "red", fontSize: "7pt" }}>Máx. 20 Caracteres</Typography> : ""}
                  onBlur={formik.handleBlur}
                  onChange={(e => handleFormatUser(e))}
                  value={nome}
                />
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={(e) => { setEmail(e.target.value) }}
                  type="email"
                  value={email}
                />
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  inputProps={{ maxLength: 25 }}
                  helperText={senha.length == 25 ? <Typography variant='h5' sx={{ color: "red", fontSize: "7pt" }}>Máx. 25 Caracteres</Typography> : ""}
                  onBlur={formik.handleBlur}
                  onChange={(e) => { setSenha(e.target.value) }}
                  type="password"
                  value={senha}
                />
                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  name="confirmar senha"
                  onBlur={formik.handleBlur}
                  onChange={(e) => { setConfirmar(e.target.value) }}
                  type="password"
                  value={confirmar}
                />
                <TextField
                  fullWidth
                  label="Código de Indicação"
                  name="indicacao"
                  onBlur={formik.handleBlur}
                  onChange={(e) => { setIndicacao(e.target.value) }}
                  type="text"
                  value={indicacao}
                />
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
                onClick={() => { handleCadastro() }}              >
                Cadastrar
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

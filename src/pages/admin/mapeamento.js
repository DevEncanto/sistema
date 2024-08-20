import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, TextField, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user-context';
import { loadMapeamento, changeMapeamento } from '../../util/util-admin';
import { useRouter } from 'next/router';
import { Acordion } from 'src/components/acordion';

const Page = () => {


  const router = useRouter()


  const { loadUser } = useContext(UserContext)
  const [usuario, setUsuario] = useState("")
  const [map, setMap] = useState([])


  useEffect(() => {
    loadUser()
    loadMapeamento(setMap)
    const loop = setInterval(async () => {
      await changeMapeamento(setMap, router)
    }, 1000)
    return () => {
      clearInterval(loop)
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          Mapeamento | Cherry Social
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          marginTop: "-60px"
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Stack direction={`row`} spacing={2} sx={{ alignItems: "center" }}>
                  <Typography variant="h4">
                    Mapeamento dos Usuários
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
            <Stack direction={`row`} spacing={1}>
              <Stack direction={`row`} sx={{ width: "60%", alignItems: "center" }}>
                <TextField
                  fullWidth
                  label="Pesquisar Usuário"
                  name="exc-avatar"
                  onChange={e => { setUsuario(e.target.value) }}
                  type="text"
                  value={usuario}
                  autoComplete='off'
                />
              </Stack>
              <Stack direction={`row`} sx={{ width: "20%", alignItems: "center", justifyContent: "center" }}>

                <Button
                  variant='contained'
                  onClick={() => { setUsuario("") }}
                >
                  Limpar Pesquisa
                </Button>

              </Stack>

            </Stack>
            <Acordion
              usuarios={map}
              usuario={usuario}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
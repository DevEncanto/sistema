import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, TextField, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/contexts/user.context';
import { changeRanking, dadosAdmin } from '../../util/util-admin';
import { loadRanking } from '../../util/util-admin';
import { ListaRanking } from 'src/components/ListaRanking';
import { useRouter } from 'next/router';

const Page = () => {

  const router = useRouter()

  const { loadUser } = useContext(UserContext)
  const [usuario, setUsuario] = useState("")
  const [ranking, setRanking] = useState([])



  useEffect(() => {
    loadUser()
    loadRanking(setRanking)
    const loop = setInterval(async () => {
      await changeRanking(setRanking, router)
    }, 5000)
    return () => {
      clearInterval(loop)
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          Ranking | Cherry Social
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
                    Ranking de Usuários
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
            <ListaRanking
              title={false}
              items={ranking}
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
import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { HistoricoSaques } from "../components/historico-saques"
import { UserContext } from '../contexts/user_context/user_context';
import { Fab } from '@mui/material';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { atualizarDadosUsuario } from '../util/util-atualizar-dados';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';

const Page = () => {
  const router = useRouter()
  const [load, setLoad] = useState(false)
  const { user, loadUser, setUser, setMode } = useContext(UserContext)
  useEffect(() => {
    loadUser()
    handleSetMode()
  }, [])

  const handleUpdate = async () => {
    await atualizarDadosUsuario(user?.usuario?.idUsuario, setUser, setLoad, router)
  }
  const handleSetMode = async () => {
    await modoDashboard(router, setMode)
  }

  return (
    <>
      <Head>
        <title>
          Saques | Cherry Social
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
              sx={{ justifyContent: "space-between" }}
              spacing={4}
            >
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}>
                <Typography variant="h4">
                  Histórico de Saques
                </Typography>
                {load ?
                  <img src="/assets/loading.svg" width={40} height={40} />
                  :
                  <Fab
                    color="primary"
                    aria-label="add" size='small'
                    onClick={handleUpdate}
                    sx={{
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <ArrowDownCircleIcon height={25} width={25} fontWeight={600} />
                  </Fab>
                }
              </Stack>
            </Stack>
            <HistoricoSaques
              count={user?.saques?.length}
              items={user?.saques}
              setUser={setUser}
            />
          </Stack>
        </Container>
      </Box >
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
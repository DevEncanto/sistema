import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid, Stack, Fab, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user-context';
import formatSaldo from '../utils/formatarSaldos';
import WalletIcon from '@heroicons/react/24/solid/WalletIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon'
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { atualizarDadosUsuario } from '../util/util-atualizar-dados';
import { RankingUsuarios } from 'src/components/ranking-usuarios';
import { CartaoEstatistica } from 'src/components/cartao-estatisticas';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
const Page = () => {
  const router = useRouter()
  const premios = [10, 8, 6, 4, 2]
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
  return <>
    <Head>
      <title>
        Home | Cherry Social
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
      <Stack
        direction="row"
        spacing={4}
        sx={{ alignItems: "center", marginLeft: "20px", marginBottom: "5px" }}
      >
        <Typography variant="h4"
          sx={{ fontSize: { sm: "10pt", md: "24pt" } }}
        >
          Suas Estatísticas
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
      <Typography variant='p' sx={{ fontSize: 12, marginLeft: "286px", fontWeight: 600, marginTop: "10px" }}>
        {!load ? "Atualizar saldo!" : ""}
      </Typography>
      <Container maxWidth="xl">
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CartaoEstatistica
              difference={20}
              title={`Saldo`}
              color={`success.main`}
              icon={<CurrencyDollarIcon />}
              value={`R$ ${user?.usuario?.saldo == undefined ? "0.00" : formatSaldo(user?.usuario?.saldo, 3)}`}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CartaoEstatistica
              difference={20}
              title={`Tot. de Desafios`}
              color={`warning.main`}
              icon={<ListBulletIcon />}
              value={`${user?.usuario?.totalDesafios == undefined ? 0 : user?.usuario?.totalDesafios}`}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <CartaoEstatistica
              difference={20}
              title={`Tot. de Saques`}
              icon={<WalletIcon />}
              color={`primary.main`}
              sx={{ height: '100%' }}
              value={user?.saques == undefined ? 0 : user?.saques?.length}
            />
          </Grid>

        </Grid>
        <Stack variant="column"
          spacing={4}>
          <RankingUsuarios
            items={user?.ranking}
          />
        </Stack>
      </Container>
    </Box>
  </>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

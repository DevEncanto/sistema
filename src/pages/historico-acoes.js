import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid, Stack, Fab, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user_context/user_context';
import formatSaldo from '../utils/formatarSaldos';
import WalletIcon from '@heroicons/react/24/solid/WalletIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import ListBulletIcon from '@heroicons/react/24/solid/ListBulletIcon'
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { atualizarDadosUsuario } from '../util/util-atualizar-dados';
import { HistoricoAcoesUsuarios } from 'src/components/historico-acoes';
import { CartaoEstatistica } from 'src/components/cartao-estatisticas';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
const Page = () => {
  const router = useRouter()

  const [load, setLoad] = useState(false)
  const { user, loadUser, setUser, setMode, mode } = useContext(UserContext)
  const [valores, setValores] = useState({
    total: 0,
    facil: 0,
    medio: 0,
    dificil: 0,
    ranking: 0,
    indicacao: 0,
    saque: 0
  })

  useEffect(() => {
    loadUser()
    handleSetMode()

  }, [])

  useEffect(() => {
    calcValores()
  }, [user])

  const calcValores = () => {
    let valores = {
      total: 0,
      facil: 0,
      medio: 0,
      dificil: 0,
      ranking: 0,
      indicacao: 0,
      saque: 0
    }
    user?.historico?.forEach((desafio) => {

      valores.total += desafio.valor
      if (desafio.desafio.includes("SAQUE")) {
        valores["saque"] += desafio.valor
      } else {
        valores[desafio.desafio] += desafio.valor
      }

    })
    setValores(valores)
  }
  const handleUpdate = async () => {
    await atualizarDadosUsuario(user?.usuario?.idUsuario, setUser, setLoad, router)
  }
  const handleSetMode = async () => {
    await modoDashboard(router, setMode)
  }
  return <>
    <Head>
      <title>
        Histórico | Cherry Social
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        marginTop: "-60px",
        // background: "#000"
      }}
    >
      <Stack
        direction="row"
        spacing={4}
        sx={{ alignItems: "center", marginLeft: "20px", marginBottom: "5px" }}
      >
        <Typography variant="h4">
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
      <Stack
        sx={{ padding: "10px 0 0 20px" }}
      >
        <Typography
          variant='h5'
          sx={{ fontSize: "15pt" }}
        >
          Total Acumulado: R$ {formatSaldo(valores.total, 3)}
        </Typography>
      </Stack>

      <Container maxWidth="xl">
        <Stack
          sx={{ margin: { sm: "10px 0 20px" }, justifyContent: "center" }}
          direction={{ sm: "row" }}
        >
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "80px" }}
            title={`Fácil`}
            color={`success.main`}
            icon={<CurrencyDollarIcon />}
            value={`R$ ${valores?.facil == undefined ? "0.00" : formatSaldo(valores?.facil, 3)}`}
          />
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "80px" }}
            difference={20}
            title={`Médio`}
            color={`warning.main`}
            icon={<CurrencyDollarIcon />}
            value={`R$ ${valores?.medio == undefined ? "0.00" : formatSaldo(valores?.medio, 3)}`}
          />
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "80px" }}
            difference={20}
            title={`Díficil`}
            color={`red`}
            icon={<CurrencyDollarIcon />}
            value={`R$ ${valores?.dificil == undefined ? "0.00" : formatSaldo(valores?.dificil, 3)}`}
          />
        </Stack>
        <Stack
          sx={{ margin: { sm: "10px 0 20px" }, justifyContent: "center" }}
          direction={{ sm: "row" }}
        >
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "80px" }}
            title={`Ranking Premiado`}
            color={`primary.main`}
            icon={<CurrencyDollarIcon />}
            value={`R$ ${valores?.ranking == undefined ? "0.00" : formatSaldo(valores?.ranking, 3)}`}
          />
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "80px" }}
            difference={20}
            title={`Indicação Premiada`}
            color={`cereja.100`}
            icon={<CurrencyDollarIcon />}
            value={`R$ ${valores?.indicacao == undefined ? "0.00" : formatSaldo(valores?.indicacao, 3)}`}
          />
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "80px" }}
            difference={20}
            title={`Saque Premiado`}
            color={`indigo`}
            icon={<CurrencyDollarIcon />}
            value={`R$ ${valores?.saque == undefined ? "0.00" : formatSaldo(valores?.saque, 3)}`}
          />
        </Stack>

        <Stack
          variant="column"
          spacing={4}
          sx={{ marginTop: "15px" }}
        >
          <Typography variant="p"
            sx={{ fontSize: "20px", fontWeight: 600 }}
          >
            Históricos de Ações
          </Typography>
          <HistoricoAcoesUsuarios
            items={user?.historico}
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

import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Divider, Container, Stack, Typography, Fab, Button, TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user-context';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { botoesNavegacao, insumos } from '../../componentes/tabela_estoque/data';
import { TabsInsumos } from '../../componentes/tabela_estoque/tabs';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';



const Page = () => {

  const [insumo, setInsumo] = useState("")
  const { loadUser, tab, setTab, setTabsEntrada } = useContext(UserContext)
  const [idUsuario, setIdUsuario] = useState("")
  const [load, setLoad] = useState(false) 

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <>
      <Head>
        <title>
          Insumos | Encanto
        </title>
      </Head>
      <Box
        component="main"
      >
        <Container maxWidth="xl">
          <Stack spacing={2}>
            <Stack
              direction="row"
              sx={{
                justifyContent: "space-between",
              }}
              spacing={2}
            >
              <Stack spacing={1}>
                <Stack direction={`row`} spacing={2} sx={{ alignItems: "center" }}>
                  <Typography variant="h4">
                    {tab === "resumo" ? "Estoque de Insumos" : ""}
                    {tab === "entradas" ? "Entrada de Insumos" : ""}
                    {tab === "saidas" ? "Saída de Insumos" : ""}
                  </Typography>
                  {load ?
                    <img src="/assets/loading.svg" width={40} height={40} />
                    :
                    <Fab
                      color="primary"
                      aria-label="add" size='small'
                      onClick={() => { }}
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

            </Stack>
            <Stack
              spacing={2}
              direction={`row`}
            >
              <Stack
                spacing={2}
                direction={"row"}
                width="50%"
              >
                {
                  botoesNavegacao.map((botao, index) => {
                    return <Button
                      key={`btn_nav${index}`}
                      variant='contained'
                      onClick={() => { setTab(botao.tab) }}
                      sx={{
                        backgroundColor: tab === botao.tab ? "primary.dark" : "grey"
                      }}
                    >
                      {botao.label}
                    </Button>
                  })
                }
              </Stack>
              <Stack
                spacing={2}
                direction="row-reverse"
                width="50%"
              >
                {tab === "entradas" ? <Button
                  key={`btn_entrada`}
                  variant='contained'
                  onClick={() => { setTabsEntrada("form") }}
                  startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
                >
                  Nova Entrada
                </Button> : <></>}
              </Stack>
            </Stack>
            <Divider color="#dbdbdb" sx={{ height: 3 }} />
            <TabsInsumos />
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
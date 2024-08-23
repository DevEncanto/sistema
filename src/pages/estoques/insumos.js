import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Divider, Container, Stack, Typography, Fab, Button, TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user_context/user_context';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { botoesNavegacao, insumos } from '../../componentes/tabela_estoque/data';
import { TabsInsumos } from '../../componentes/tabela_estoque/tabs';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { EstoqueContext } from '../../contexts/components_context/estoque_context';
import { DataContext } from '../../contexts/data_context/data_context';



const Page = () => {

  const { controle, gerenciarControle } = useContext(EstoqueContext)
  const { loadLocalStorage } = useContext(DataContext)
  const [load, setLoad] = useState(false)
  let e = { target: { value: "" } }


  useEffect(() => {
    loadLocalStorage()
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
                    {controle.tab === "resumo" ? "Estoque de Insumos" : ""}
                    {controle.tab === "entradas" ? "Entrada de Insumos" : ""}
                    {controle.tab === "saidas" ? "Saída de Insumos" : ""}
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
                      onClick={() => { gerenciarControle(botao.tab, "tab", false) }}
                      sx={{
                        backgroundColor: controle.tab === botao.tab ? "primary.dark" : "grey"
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
                {controle.tab === "entradas" && controle.tabsEntrada == "tabela" ? <Button
                  key={`btn_entrada`}
                  variant='contained'
                  onClick={() => { gerenciarControle("form", "tabsEntrada", false) }}
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
import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Divider, Container, Stack, Typography, Fab, Button, TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user_context/user_context';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { botoesNavegacao, insumos } from '../../componentes/insumos/data';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { EstoqueContext } from '../../contexts/components_context/estoque_context';
import { DataContext } from '../../contexts/data_context/data_context';
import { TabsInsumos } from '../../componentes/insumos/componentes/tabs';



const Page = () => {

  const { controleEstoque, funcoes } = useContext(EstoqueContext)
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
                    {controleEstoque.tab === "resumo" ? "Estoque de Insumos" : ""}
                    {controleEstoque.tab === "entradas" ? "Entrada de Insumos" : ""}
                    {controleEstoque.tab === "saidas" ? "Saída de Insumos" : ""}
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
                      onClick={() => { funcoes.gerenciarControle(botao.tab, "tab", false) }}
                      sx={{
                        backgroundColor: controleEstoque.tab === botao.tab ? "primary.dark" : "grey"
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
                {controleEstoque.tab === "entradas" && controleEstoque.tabsEntrada == "tabela" ? <Button
                  key={`btn_entrada`}
                  variant='contained'
                  onClick={() => { funcoes.gerenciarControle("cadastroEntradaInsumo", "tabsEntrada", false) }}
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
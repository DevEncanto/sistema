import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Divider, Container, Stack, Typography, Fab, Button, TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/contexts/user.context';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { botoesNavegacao, insumos } from '../../componentes/insumos/data';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { EstoqueContext } from '../../contexts/components_context/estoque_context';
import { DataContext } from '../../contexts/contexts/data.context';
import { TabsInsumos } from '../../componentes/insumos/componentes/tabs';



const Page = () => {

  const { controleEstoque, funcoes } = useContext(EstoqueContext)
  const { loadLocalStorage } = useContext(DataContext)
  const [load, setLoad] = useState(false)
  let e = { target: { value: "" } }


  useEffect(() => {
    funcoes.gerenciarControle("tabs", "resumo", false)
    loadLocalStorage()
  }, [])


  const redirecionamento = (tabs, object, targeted, tabela) => {
    const { tabsEntrada, tabsSaida, tab } = controleEstoque

    let navigate = false

    if (tab == "entradas" && tabsEntrada === "tabela") {
      navigate = true
    }

    if (tab == "saidas") {
      navigate = true
    }
    if (tab == "resumo") {
      navigate = true
    }
    if (navigate) {
      funcoes.gerenciarControle(tabela, "tabela", false)
      funcoes.gerenciarControle(tabs, object, targeted)
    }
  }

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
                {controleEstoque.navigate ?
                  botoesNavegacao.map((botao, index) => {
                    return <Button
                      key={`btn_nav${index}`}
                      variant='contained'
                      onClick={() => { redirecionamento(botao.tab, "tab", false, botao.tabela) }}
                      sx={{
                        backgroundColor: controleEstoque.tab === botao.tab ? "primary.dark" : "grey"
                      }}
                    >
                      {botao.label}
                    </Button>
                  }) :
                  <></>

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
                  onClick={() => { funcoes.gerenciarControle("cadastroEntradaInsumoI", "tabsEntrada", false) }}
                  startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
                >
                  Nova Entrada
                </Button> : <></>}
                {controleEstoque.tab === "saidas" && controleEstoque.tabsSaida == "tabela" ? <Button
                  key={`btn_entrada`}
                  variant='contained'
                  onClick={() => { funcoes.gerenciarControle("cadastroSaidaInsumoI", "tabsSaida", false) }}
                  startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
                >
                  Nova Saída
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
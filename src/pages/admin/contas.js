import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, TextField, Button, Fab } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user_context/user_context';
import { cadastrarContasSuaURL, changeBot, dadosAdmin } from '../../util/util-admin';
import { useRouter } from 'next/router';
import { TabelaContasSuaURL } from 'src/components/tabela-contas-sua-url';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { CadastroContasSuaURL } from 'src/components/contas/cadastro-contas-sua-url';
import { BarraPesquisa } from 'src/components/contas/barra-pesquisa';
import { VerificacaoSaldo } from 'src/components/contas/verificacao-saldo';

const Page = () => {
  
  const router = useRouter()
  const handleAdmin = async () => {
    await dadosAdmin(setUser, user?.usuario?.idUsuario, setLoad)
  }

  const { loadUser, user, setUser } = useContext(UserContext)
  const [gerenciador, setGerenciador] = useState("barra")
  const [conta, setConta] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [senhac, setSenhac] = useState("")
  const [mode, setMode] = useState("cadastro")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    loadUser()
    const loop = setInterval(async () => {
      if (user?.usuario?.idUsuario) {
        await dadosAdmin(setUser, user?.usuario?.idUsuario, setLoad, false, false)
      }
    }, 3000)
    return () => {
      clearInterval(loop)
    }
  }, [])

  const handleCadastro = async () => {
    await cadastrarContasSuaURL(email, senha, senhac, setMode, setUser, router, handleReset)
  }
  const handleReset = () => {
    setEmail("")
    setSenha("")
    setSenhac("")
  }

  return (
    <>
      <Head>
        <title>
          Contas Sua URL | Cherry Social
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
                    Contas Sua URL
                  </Typography>
                  {load ?
                    <img src="/assets/loading.svg" width={40} height={40} />
                    :
                    <Fab
                      color="primary"
                      aria-label="add" size='small'
                      onClick={handleAdmin}
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
            {gerenciador == "cadastroContas" ?
              <CadastroContasSuaURL
                setEmail={setEmail}
                email={email}
                setSenha={setSenha}
                senha={senha}
                setSenhac={setSenhac}
                senhac={senhac}
                mode={mode}
                handleCadastro={handleCadastro}
                setGerenciador={setGerenciador}
              />
              :
              <></>
            }
            {gerenciador == "barra" ?
              <BarraPesquisa
                conta={conta}
                setConta={setConta}
                setGerenciador={setGerenciador}
              />
              :
              <></>
            }
            {gerenciador == "verificarSaldo" ?
              <VerificacaoSaldo
                setGerenciador={setGerenciador}
                bot={user?.bot}
                setUser={setUser}
              />
              :
              <></>
            }
            <TabelaContasSuaURL
              contas={user?.contasSuaURL}
              conta={conta}
              maxHeight={420}
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
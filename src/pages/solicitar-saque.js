import Head from 'next/head';
import { Box, Container, Stack, Table, Typography, CardHeader, Paper, TableContainer } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect, useState } from 'react';
import { textoSaque } from 'src/components/texto';
import { FormularioSaque } from 'src/components/solicitacao-saque';
import { RespostaSaque } from 'src/components/resposta-saque';
import { useRouter } from 'next/router';
import { UserContext } from 'src/contexts/user-context';
import { modoDashboard } from 'src/util/util.set-mode-page';
import { atualizarDadosUsuario } from 'src/util/util-atualizar-dados';
import { SeletorBanco } from 'src/components/seletor-bancos';
import { sxCardScrollPersonalizada } from '../components/config-componentes/config-imagens-perfil';


const Page = () => {


  const { setMode, user, setUser, loadUser } = useContext(UserContext)
  const router = useRouter()
  const [valorSaque, setValorSaque] = useState("")
  const [pix, setPix] = useState("")
  const [recebedor, setRecebedor] = useState("")

  useEffect(() => {
    handleSetMode()
    setPix(user?.usuario?.pix)
    setRecebedor(user?.usuario?.recebedor)
  }, [])

  const handleSetMode = async () => {
    await loadUser()
    await modoDashboard(router, setMode)
    if (user?.usuario?.idUsuario) {
      await atualizarDadosUsuario(user?.usuario?.idUsuario, setUser, () => { }, router)
    }
  }
  const [estado, setEstado] = useState("saque")
  const [response, setResponse] = useState("loading")
  const [banco, setBanco] = useState("")
  const [url, setUrl] = useState("")

  return (
    <>
      <Head>
        <title>
          Solicitar Saque | Cherry Social
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
        <Container maxWidth="lg">
          <Stack spacing={0}>

            <Typography variant="h4">
              Solicitação de Saque
            </Typography>


            <CardHeader
              subheader="Leia com atenção!"
              title="Informações sobre os saques"
              sx={{
                marginTop: "-10px"
              }}
            />

            <Paper sx={{ width: '100%' }}>
              <TableContainer sx={{ maxHeight: 180, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                  <Stack
                    sx={{
                      paddingLeft: "3px"
                    }}
                  >
                    {
                      textoSaque.map((texto, index) => {
                        return (
                          <Typography
                            key={index}
                            variant='p'

                            sx={{
                              fontSize: "14px",
                              fontWeight: 600,
                              marginBottom: "1px",
                              marginLeft: "15px"
                            }}

                          >
                            {texto}
                          </Typography>
                        )
                      })
                    }
                  </Stack>
                </Table>
              </TableContainer>
            </Paper>


            <Stack
              sx={{ alignItems: estado == "saque" ? "left" : "center" }}
            >
              {estado == "saque"
                ? <FormularioSaque
                  setMode={setEstado}
                  setResponse={setResponse}
                  banco={banco}
                  url={url}
                  user={user}
                  pix={pix}
                  valorSaque={valorSaque}
                  setValorSaque={setValorSaque}
                  setPix={setPix}
                  recebedor={recebedor}
                  setRecebedor={setRecebedor}
                  router={router}
                />
                : <></>
              }
              {estado == "resposta"
                ? <RespostaSaque
                  setMode={setEstado}
                  response={response}
                />
                :
                <></>
              }
              {estado == "banco"
                ? <SeletorBanco
                  setEstado={setEstado}
                  setBanco={setBanco}
                  setUrl={setUrl}
                />
                :
                <></>
              }
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  )
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

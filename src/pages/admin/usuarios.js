import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Fab, Button, TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user-context';
import { TabelaUsuarios } from 'src/components/tabela-usuarios';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { CadastrarAvatar, dadosAdmin } from '../../util/util-admin';


const Page = () => {

  const handleAdmin = async () => {
    await dadosAdmin(setUser, user?.usuario?.idUsuario, setLoad)
  }
  const handleAvatar = async () => {
    await CadastrarAvatar(idUsuario, avatar, setMode, setAvatar)
  }

  const [mode, setMode] = useState("cadastro")
  const [usuario, setUsuario] = useState("")
  const [avatar, setAvatar] = useState("")
  const [cadAvatar, setCadAvatar] = useState(false)
  const { user, loadUser, setUser } = useContext(UserContext)
  const [idUsuario, setIdUsuario] = useState("")
  const [load, setLoad] = useState(false)

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <>
      <Head>
        <title>
          Cadastrados | Cherry Social
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
              sx={{
                justifyContent: "space-between"
              }}
              spacing={4}
            >
              <Stack spacing={1}>
                <Stack direction={`row`} spacing={2} sx={{ alignItems: "center" }}>
                  <Typography variant="h4">
                    Usuários Cadastrados
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
            {cadAvatar ?
              <Stack direction={`row`} spacing={1}>
                <Stack direction={`row`} sx={{ width: "80%", alignItems: "center" }}>
                  <TextField
                    fullWidth
                    label="Avatar Exclusivo"
                    name="exc-avatar"
                    onChange={e => { setAvatar(e.target.value) }}
                    type="text"
                    value={avatar}
                    autoComplete='off'
                  />
                </Stack>
                <Stack direction={`row`} sx={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
                  {mode == "cadastro" ?
                    <Button
                      variant='contained'
                      onClick={handleAvatar}
                    >
                      Cadastrar
                    </Button>
                    : <></>
                  }
                  {mode == "load"
                    ? <img src="/assets/loading.svg" width={50} height={50} />
                    : <></>
                  }
                  {mode == "sucess"
                    ? <img src="/assets/sucess.svg" width={45} height={45} />
                    : <></>
                  }
                  {mode == "error"
                    ? <img src="/assets/error.svg" width={45} height={45} />
                    : <></>
                  }
                  {mode == "alter"
                    ? <img src="/assets/sem-alteracao.png" width={45} height={45} />
                    : <></>
                  }
                </Stack>
                <Stack direction={`row`} sx={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
                  <Button
                    variant='contained'
                    onClick={() => { setCadAvatar(false) }}>
                    Fechar
                  </Button>
                </Stack>

              </Stack>
              : <></>
            }
            <TabelaUsuarios
              count={user?.usuarios?.length}
              items={user?.usuarios}
              setUser={setUser}
              setCadAvatar={setCadAvatar}
              cadAvatar={cadAvatar}
              setIdUsuario={setIdUsuario}
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
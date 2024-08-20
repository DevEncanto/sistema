import Head from 'next/head';
import {
  Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Card, CardContent, Avatar, Divider
  , CardActions, Button
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { DetalhesPerfil } from 'src/components/perfil/detalhes-perfil';
import { UserContext } from 'src/contexts/user-context';
import { useContext, useEffect, useState } from 'react';
import formatSaldo from 'src/utils/formatarSaldos';
import { ImagensPerfil } from 'src/components/perfil/imagens-perfil';
import { ContentPerfil } from 'src/components/perfil/content-perfil';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
import { ContentCodigo } from 'src/components/perfil/content-codigo';

const Page = () => {
  const [avatar, setAvatar] = useState("/default.png")
  const [modePage, setModePage] = useState("detalhes")
  const { user, loadUser, setMode, mode } = useContext(UserContext)
  const router = useRouter()


  useEffect(() => {
    loadUser()
    handleSetMode()
  }, [])

  const handleSetMode = async () => {
    await modoDashboard(router, setMode)
  }
  useEffect(() => {
    setAvatar(user?.usuario?.avatar)
  }, [user])

  const handleChangeAvatar = (avatar, mode) => {
    setAvatar(avatar)
    setModePage("detalhes")
  }

  return (
    <>
      <Head>
        <title>
          Perfil | Cherry Social
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
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Cherry Social
              </Typography>
            </div>
            <Stack
              direction={{ sm: "row" }}
              spacing={{ xp: 4, sm: 0 }}
            >
              <ContentPerfil
                router={router}
                nome={user?.usuario?.nome}
                avatar={avatar}
                qtdePerfis={user?.perfis?.length}
                saques={user?.saques?.length}
                saldo={formatSaldo(parseFloat(user?.usuario?.saldo))}
                codigoIndicacao={user?.usuario?.codigoIndicacao}
                changeMode={setModePage}
              />

              {modePage == "detalhes"
                ?
                <DetalhesPerfil
                  nomeCompleto={user?.usuario?.nomeCompleto}
                  Email={user?.usuario?.email}
                  idUsuario={user?.usuario?.idUsuario}
                  avatar={avatar}
                  Banco={user?.usuario?.banco}
                  Pix={user?.usuario?.pix}
                  Recebedor={user?.usuario?.recebedor}
                  codigoResgatado={user?.usuario?.codigoResgatado}
                />
                :
                <></>
              }
              {modePage == "imagem"
                ? <ImagensPerfil
                  changeAvatar={handleChangeAvatar}
                  mode={modePage}
                  avatares={user?.avatares}
                /> :
                <></>
              }
              {modePage == "codigo"
                ? <ContentCodigo /> :
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

import Head from 'next/head';
import { Box, Paper, Table, TableContainer, Unstable_Grid2 as Grid, Stack, Link, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user_context/user_context';
import { sxCardScrollPersonalizada } from '../components/config-componentes/config-imagens-perfil';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
const Page = () => {

  const tutoriais = [
    {
      titulo: "Grupo de Provas de Pagamento Cherry Social Telegram",
      link: "https://t.me/+k1wfCOCraCMwYWYx",
      img: "/avatars/avatar-telegram.png",
      obs: {
        isObs: true,
        text: "Recomendamos que entre em nosso grupo para receber provas dos nossos pagamentos!"
      }
    },
    {
      titulo: "Grupo de Avisos Cherry Social Telegram",
      link: "https://t.me/cherrysocialbrasil",
      img: "/avatars/avatar-telegram.png",
      obs: {
        isObs: true,
        text: "Recomendamos que entre em nosso grupo para que seja informado de novas atualizações/correções da plataforma!."
      }
    },
    {
      titulo: "Comunidade Cherry Social Telegram",
      link: "https://t.me/+pYyIRXaGKBMwMGUx",
      img: "/avatars/avatar-telegram.png",
      obs: {
        isObs: true,
        text: "Recomendamos que entre em nosso para interagir com os outros usuários!"
      }
    },
    ,
    {
      titulo: "Suporte Cherry Social Telegram",
      link: "t.me/suportecherrysocial",
      img: "/avatars/avatar-telegram.png",
      obs: {
        isObs: false,
        text: ""
      }
    },
    {
      titulo: "Suporte Cherry Social Instagram",
      link: "https://www.instagram.com/cherrysocial_?igsh=MWQ3d215cmhha2I5Ng==",
      img: "/avatars/avatar-instagram.png",
      obs: {
        isObs: false,
        text: ""
      }
    },
    {
      titulo: "Suporte Cherry Social WhatsApp",
      link: "",
      img: "/avatars/avatar-whatsapp.png",
      obs: {
        isObs: true,
        text: "Em breve a opção estará disponível!"
      }
    }
  ]
  const router = useRouter()
  const { loadUser, setMode } = useContext(UserContext)
  useEffect(() => {
    loadUser()
    handleSetMode()
  }, [])

  const handleSetMode = async () => {
    await modoDashboard(router, setMode)
  }
  return <>
    <Head>
      <title>
        Suporte | Cherry Social
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
          Canais de Suporte
        </Typography>
      </Stack>

      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 520, ...sxCardScrollPersonalizada }}>
          <Table stickyHeader aria-label="sticky table">
            {
              tutoriais.map((tutorial, index) => {
                return (
                  <Stack
                    key={index}
                    direction={`column`}
                    sx={{ marginLeft: "50px", marginTop: "20px" }}
                  >
                    <Link
                      sx={{ maxWidth: "200px", fontWeight: 600, color: "cereja.200", textDecoration: "none", fontWeight: 600 }}
                      href={tutorial.link}
                      target='_blank'
                      rel="noopener"
                    >
                      <img
                        className='imagem-auth'
                        alt=""
                        src={`/assets${tutorial.img}`}
                        width={75}
                        height={75}
                        style={{ borderRadius: "7px" }}
                      />
                    </Link>

                    <Typography
                      variant="p"
                      sx={{ fontWeight: 600, fontSize: "15pt", marginTop: "10px" }}
                    >
                      {`${tutorial.titulo}`}
                    </Typography>
                    <Stack

                      spacing={.5}
                      direction="row"
                    >
                      <Typography
                        sx={{ fontWeight: 600 }}
                      >
                        Link:
                      </Typography>
                      <Link
                        sx={{ fontWeight: 600, color: "cereja.200", textDecoration: "none", fontWeight: 600 }}
                        href={tutorial.link}
                        target='_blank'
                        rel="noopener"
                      >
                        <Typography>
                          {tutorial.link != "" ? "Clique aqui..." : ""}
                        </Typography>
                      </Link>
                    </Stack>
                    {tutorial.obs.isObs
                      ?
                      <Typography
                        sx={{ fontSize: '10pt', fontWeight: 600 }}
                      >
                        {`${tutorial.obs.text}`}
                      </Typography>
                      :
                      <>
                      </>
                    }
                  </Stack>
                )
              })
            }
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  </>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

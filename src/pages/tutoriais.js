import Head from 'next/head';
import { Box, Paper, Table, TableContainer, Unstable_Grid2 as Grid, Stack, Link, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/user_context/user_context';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
import { tutoriais } from 'src/utils/tutoriais';
import { sxCardScrollPersonalizada } from '../components/config-componentes/config-imagens-perfil';


const Page = () => {

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
        Tutoriais | Cherry Social
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
          Tutoriais
        </Typography>
      </Stack>
      <Paper sx={{ width: '100%' }}>
        <TableContainer sx={{ maxHeight: 480, ...sxCardScrollPersonalizada }}>
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
                      sx={{ fontWeight: 600, color: "cereja.200", textDecoration: "none", fontWeight: 600 }}
                      href={tutorial.link}
                      target='_blank'
                      rel="noopener"
                    >
                      <img
                        className='imagem-auth'
                        alt=""
                        src={`/assets${tutorial.img}`}
                        width={90}
                        height={60}
                        style={{ borderRadius: "7px" }}
                      />
                    </Link>

                    <Typography
                      variant="p"
                      sx={{ fontWeight: 600, fontSize: "15pt", marginTop: "10px" }}
                    >
                      {`Tutorial: ${tutorial.titulo}`}
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
                          {tutorial.link}
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

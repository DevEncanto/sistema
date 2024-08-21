import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, TextField, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user_context/user_context';
import { loadMapeamento, changeMapeamento } from '../../util/util-admin';
import { useRouter } from 'next/router';
;

const Page = () => {


  const router = useRouter()


  const { loadUser } = useContext(UserContext)
  const [usuario, setUsuario] = useState("")
  const [map, setMap] = useState([])


  useEffect(() => {
    loadUser()
    loadMapeamento(setMap)
    const loop = setInterval(async () => {
      await changeMapeamento(setMap, router)
    }, 1000)
    return () => {
      clearInterval(loop)
    }
  }, [])

  return (
    <>
      <Head>
        <title>
          DRE | Cherry Social
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
          {/* <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Stack direction={`row`} spacing={2} sx={{ alignItems: "center" }}>
                  <Typography variant="h4">
                    Demonstração de Resultado do Exercício
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Stack>
            <DemostracaoResultadoExercicio />
          </Stack> */}
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
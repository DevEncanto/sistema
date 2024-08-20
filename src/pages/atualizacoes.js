import Head from 'next/head';
import { Box, Stack,  Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/user-context';
import { atualizacoes } from 'src/utils/notas-atualizacao';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
import { Atualizacoes } from 'src/components/atualizacoes';

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
        Atualizações | Cherry Social
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
          Atualizações
        </Typography>
      </Stack>
      <Atualizacoes/>
      
    </Box>
  </>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

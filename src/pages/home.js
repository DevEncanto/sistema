import Head from 'next/head';
import { Box, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/user_context/user_context';
import { atualizacoes } from 'src/utils/notas-atualizacao';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';

const Page = () => {

  const router = useRouter()

  useEffect(() => {
    
  }, [])

  const handleSetMode = async () => {
    await modoDashboard(router, setMode)
  }
  return <>
    <Head>
      <title>
        Home | Encanto
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
      

    </Box>
  </>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

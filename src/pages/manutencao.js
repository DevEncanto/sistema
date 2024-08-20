import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Button } from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import { useRouter } from 'next/router';
import { ResponseManutencao } from 'src/components/manutencao/response-manutencao';

const Page = () => {

  const [motivo, setMotivo] = useState("")
  const [tempo, setTempo] = useState("")
  const router = useRouter()


  const handleNavigate = () => {
    router.push("/auth/login")
  }
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem("manutencaoPlat"))
    setMotivo(data?.motivo)
    setTempo(data?.tempo)
  }, [])

  return (
    <>
      <Head>
        <title>
          Cherry Social
        </title>
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <ResponseManutencao
            motivo={motivo}
            tempo={tempo}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;

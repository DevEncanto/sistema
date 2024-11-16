import Head from 'next/head';
import { Box, Stack, Container, Typography, Fab, SvgIcon, Grid, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { BsBox2Fill, BsQrCode } from 'react-icons/bs';
import { CorteCoracaoContext, CorteCoracaoProvider } from '../../contexts/contexts/corte.coracao.context';

const Page = () => {

    const router = useRouter()
    const [load, setLoad] = useState(false)
    const { cCorteCoracao, funcoes } = useContext(CorteCoracaoContext)
    const redirecionarEstoque = (url) => router.push(`/corte_coracoes/${url}`)


    const estoques = [
        {
            label: "Lotes de Fitas",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <BsBox2Fill />
                </SvgIcon>
            ),
            url: "lote_etiquetas"
        },
        {
            label: "Gerador de Etiquetas",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <BsQrCode />
                </SvgIcon>
            ),
            url: "gerador_etiquetas"
        }
    ]

    const handleAdmin = () => {

    }

    useEffect(() => {
        funcoes.gControleCorteCoracao("tab", "resumo", false)
    }, [])


    return <>
        <Head>
            <title>
                Corte de Corações | Encanto
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
                                    Corte de Corações
                                </Typography>
                                {/* {load ?
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
                                } */}
                            </Stack>
                        </Stack>

                    </Stack>
                    <Stack
                        spacing={1}
                    >
                        <Grid container rowSpacing={1} spacing={{ xs: 3, md: 5 }} columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{ padding: "50px 220px 0px 220px" }}
                        >
                            {estoques.map((estoque, index) => (
                                <Grid key={index}
                                    sx={{ marginBottom: "20px" }}
                                    spacing={5}
                                >
                                    <Button
                                        sx={{
                                            cursor: 'pointer',
                                            height: 120,
                                            width: 120,
                                            borderRadius: '10%',
                                            backgroundColor: "primary",
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: "10px"
                                        }}
                                        onClick={() => { redirecionarEstoque(estoque.url) }}
                                    >
                                        <Stack
                                            sx={{
                                                cursor: 'pointer',
                                                height: "100%",
                                                width: "100%",
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}

                                        >
                                            {estoque.icon}
                                            <Typography
                                                sx={{
                                                    cursor: 'pointer',
                                                    color: '#fff',
                                                    fontSize: '12pt'
                                                }}
                                            >
                                                {estoque.label}
                                            </Typography>
                                        </Stack>
                                    </Button>
                                </Grid>
                            ))}
                        </Grid>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    </>
}

Page.getLayout = (page) => (
    <DashboardLayout>
        <CorteCoracaoProvider>
            {page}
        </CorteCoracaoProvider>
    </DashboardLayout>
);

export default Page;

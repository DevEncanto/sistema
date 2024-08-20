import Head from 'next/head';
import { Box, Stack, Container, Typography, Fab, SvgIcon, Grid, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useRouter } from 'next/router';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { LuFuel } from "react-icons/lu";
import { HiCube } from "react-icons/hi2";
import { TiLeaf } from "react-icons/ti";
import { IoFastFood } from "react-icons/io5";
import { useEffect, useState } from 'react';

const Page = () => {

    const router = useRouter()
    const [load, setLoad] = useState(false)

    const redirecionarEstoque = (url) => router.push(`/estoques/${url}`)


    const estoques = [
        {
            label: "Ferramentas",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <HiMiniWrenchScrewdriver />
                </SvgIcon>
            ),
            url: "ferramentas"
        },
        {
            label: "Cantina",
            icon: (
                <SvgIcon fontSize="medium" color='white'>
                    <IoFastFood />
                </SvgIcon>
            ),
            url: "cantina"
        },
        {
            label: "Combustível",
            icon: <SvgIcon fontSize="medium" color='white'>
                <LuFuel />
            </SvgIcon>,
            url: "combustivel"
        },
        {
            label: "Materiais",
            icon: <SvgIcon fontSize="medium" color='white'>
                <HiCube />
            </SvgIcon>,
            url: "materiais"
        },
        {
            label: "Insumos",
            icon: <SvgIcon fontSize="medium" color='white'>
                <TiLeaf />
            </SvgIcon>,
            url: "insumos"
        }
    ]

    const handleAdmin = () => {

    }

    useEffect(() => {

    }, [])


    return <>
        <Head>
            <title>
                Estoques | Cherry Social
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
                                    Estoques
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
                    <Stack>
                        <Grid container rowSpacing={1} spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}
                            sx={{ padding: "50px 220px 0px 220px" }}
                        >
                            {estoques.map((estoque, index) => (
                                <Grid xs={2} sm={3} md={3} key={index}
                                    sx={{ marginBottom: "20px" }}
                                >
                                    <Button
                                        sx={{
                                            cursor: 'pointer',
                                            height: 120,
                                            width: 120,
                                            borderRadius: '10%',
                                            backgroundColor: "primary",
                                            alignItems: 'center',
                                            justifyContent: 'center'
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
        {page}
    </DashboardLayout>
);

export default Page;

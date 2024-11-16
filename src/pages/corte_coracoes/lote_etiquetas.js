import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Divider, Container, Stack, Typography, Fab, Button, TextField } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { DataContext } from '../../contexts/contexts/data.context';
import { CorteCoracaoContext, CorteCoracaoProvider } from '../../contexts/contexts/corte.coracao.context';
import { TabsCorteCoracao } from '../../componentes/corte_coracao/componentes/tabs';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { BsArrowLeft } from 'react-icons/bs';



const Page = () => {

    const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext)
    const { loadLocalStorage } = useContext(DataContext)
    const [load, setLoad] = useState(false)
    let e = { target: { value: "" } }


    useEffect(() => {
        // funcoes.gerenciarControle("tabs", "resumo", false)
        // loadLocalStorage()
    }, [])

    return (
        <>
            <Head>
                <title>
                    Insumos | Encanto
                </title>
            </Head>
            <Box
                component="main"
            >
                <Container maxWidth="xl">
                    <Stack spacing={2}>
                        <Stack
                            direction="row"
                            sx={{
                                justifyContent: "space-between",
                            }}
                            spacing={2}
                        >
                            <Stack 
                            
                            spacing={1}>
                                <Stack direction={`row`} spacing={2} sx={{ alignItems: "center" }}>
                                    <Typography variant="h4">
                                        Lotes de Etiquetas
                                    </Typography>
                                    {load ?
                                        <img src="/assets/loading.svg" width={40} height={40} />
                                        :
                                        <Fab
                                            color="primary"
                                            aria-label="add" size='small'
                                            onClick={() => { }}
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
                        <Stack
                            spacing={2}
                            direction={`row`}
                        >

                            <Stack
                                spacing={2}
                                direction="row-reverse"
                                width="100%"
                            >

                                {cCorteCoracao.tab !== "resumo" ? <Button
                                    key={`btn_entrada`}
                                    variant='contained'
                                    onClick={() => { funcoes.gControleCorteCoracao("resumo", "tab", false) }}
                                    startIcon={<BsArrowLeft height={20} width={20} fontWeight={600} />}
                                >
                                    Voltar
                                </Button> : <></>}
                                {cCorteCoracao.tab == "resumo" && cCorteCoracao.tabsCadastro == "tabela" ? <Button
                                    key={`btn_entrada`}
                                    variant='contained'
                                    onClick={() => { funcoes.gControleCorteCoracao("cadastro_lote", "tab", false) }}
                                    startIcon={<PlusIcon height={20} width={20} fontWeight={600} />}
                                >
                                    Novo Lote
                                </Button> : <></>}
                            </Stack>
                        </Stack>
                        <Divider color="#dbdbdb" sx={{ height: 3 }} />
                        <TabsCorteCoracao />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        <CorteCoracaoProvider>
            {page}
        </CorteCoracaoProvider>
    </DashboardLayout>
);

export default Page;
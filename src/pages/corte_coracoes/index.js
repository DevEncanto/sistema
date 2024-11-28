import Head from 'next/head';
import { Box, Stack, Container, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect,      } from 'react';
import { CorteCoracaoProvider } from '../../contexts/contexts/corte.coracao.context';
import { DataContext } from '../../contexts/contexts/data.context';
import { SubPagesCorteCoracao } from './_components/sub.pages.corte.coracao';
import { BotaoNovoLote } from './_components/botoes/botao.novo.lote';
import { BotaoVoltar } from './_components/botoes/botao.voltar';
import { BotaoFiltroEtiquetas } from './_components/botoes/botao.filtro.etiquetas';
import { BotaoFiltroListaEtiquetas } from './_components/botoes/botao.filtro.lista.etiquetas';

const Page = () => {

    const dataContext = useContext(DataContext)

    useEffect(() => {
        dataContext.funcoes.loadLocalStorage()
    }, [])


    return <>
        <Head>
            <title>
                Corte de Corações | Encanto
            </title>
        </Head>
        <Box
            component="main"
        >
            {/* {JSON.stringify(dataContext.dData.areas)} */}
            <Container maxWidth="xl">
                <Stack sx={{ width: "100%", height: "88vh" }}>
                    <Stack
                        direction="row"
                        sx={{
                            justifyContent: "space-between",
                        }}
                        spacing={4}
                    >
                        <Stack spacing={1}>
                            <Stack direction={`row`} spacing={2} sx={{ alignItems: "center" }}>
                                <Typography variant="h4" fontSize={25}>
                                    Corte de Corações
                                </Typography>
                            </Stack>
                        </Stack>
                        <Stack
                            direction={`row`}
                            spacing={1}
                        >
                            <BotaoNovoLote />
                            <BotaoFiltroEtiquetas />
                            <BotaoFiltroListaEtiquetas/>
                            <BotaoVoltar />
                        </Stack>

                    </Stack>
                    <Stack
                        sx={{ width: "100%", height: "100%" }}
                    >
                        <SubPagesCorteCoracao />
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

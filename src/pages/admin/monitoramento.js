import { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Stack, Typography, TextField, Button, Fab } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user_context/user_context';
import { GraficoProcessador } from 'src/components/grafico-processador';
import { ManutencaoProgramada, Memoria, Processador, StatusPlataforma } from 'src/components/abas-laterais';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { GraficoMemoria } from 'src/components/grafico-memoria';
import { ConfigManutencao } from 'src/components/config-manutencao';
import { monitoramentoServidor } from 'src/util/util-admin';
import { useRouter } from 'next/router';
import { dadosAdmin } from 'src/util/util-admin';
import { ProgramacaoManutencao } from 'src/components/programacao-manutencao';

const Page = () => {
    const handleAdmin = async () => {
        await dadosAdmin(setUser, user?.usuario?.idUsuario, setLoad)
    }
    const { user, loadUser, setUser } = useContext(UserContext)
    const [grafico, setGrafico] = useState("cpu")
    const [server, setServer] = useState({})
    const [load, setLoad] = useState(false)
    const router = useRouter()
    useEffect(() => {
        loadUser()
        const loop = setInterval(async () => {
            await monitoramentoServidor(setServer, router)
        }, 2000)
        return () => {
            clearInterval(loop)
        }
    }, [])


    const styles = {
        width: "100%",
        heigth: "100%",
        border: "#d9d9d9 solid 1px",
        padding: "10px",
        borderRadius: "10px"
    }

    return (
        <>
            <Head>
                <title>
                    Monitoramento | Cherry Social
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
                            justifyContent="space-between"
                            spacing={4}
                            marginBottom={5}
                        >
                            <Stack spacing={1}
                                direction={`row`}
                            >
                                <Typography variant="h4">
                                    Monitoramento do Servidor
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
                    <Stack sx={styles} direction="row">
                        <Stack sx={{ width: "35%" }} spacing={2}>
                            <Processador
                                server={server}
                                grafico={grafico}
                                setGrafico={setGrafico}
                            />
                            <Memoria
                                server={server}
                                grafico={grafico}
                                setGrafico={setGrafico}
                            />
                            <StatusPlataforma
                                manutencao={user?.manutencao}
                                server={server}
                                grafico={grafico}
                                setGrafico={setGrafico}
                            />
                            <ManutencaoProgramada
                                programacao={user?.manutencaoProgramada}
                                server={server}
                                grafico={grafico}
                                setGrafico={setGrafico}
                            />
                        </Stack>
                        <Divider />
                        <Stack sx={{
                            width: "65%"
                        }}>
                            {grafico == "cpu"
                                ? <GraficoProcessador
                                    width={`100%`}
                                    height={320}
                                    mode="fat"
                                    server={server}
                                />
                                : <></>
                            }
                            {grafico == "ram"
                                ? <GraficoMemoria
                                    width={`100%`}
                                    height={320}
                                    mode="fat"
                                    server={server}
                                />
                                : <></>
                            }
                            {grafico == "status-plataforma"
                                ? <ConfigManutencao />
                                : <></>
                            }
                            {grafico == "programacao"
                                ? <ProgramacaoManutencao />
                                : <></>
                            }

                        </Stack>
                    </Stack>

                </Container>
            </Box >
        </>
    );
};

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
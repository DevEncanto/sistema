import { useContext, useEffect, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Fab, Button } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { UserContext } from '../../contexts/user_context/user_context';
import { TabelaRotas } from 'src/components/tabela-rotas';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import ArrowDownOnSquareStackIcon from '@heroicons/react/24/solid/ArrowDownOnSquareStackIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { RestaurarBackup, SincronizarServidor, dadosAdmin } from '../../util/util-admin';
import { CadastroRotas } from 'src/components/cadastro-rotas';
import { useRouter } from 'next/router';

const Page = () => {
    const [mode, setMode] = useState("tabela")
    const [sync, setSync] = useState("sync")
    const [backup, setBackup] = useState("sync")
    const router = useRouter()
    const [load, setLoad] = useState(false)

    const handleAdmin = async () => {
        await dadosAdmin(setUser, user?.usuario?.idUsuario, setLoad)
    }

    const handleSincronizar = async () => {
        await SincronizarServidor(setSync, router)
    }
    const handleRestaurar = async () => {
        await RestaurarBackup(setBackup, router)
    }

    const { user, loadUser, setUser } = useContext(UserContext)
    useEffect(() => {
        loadUser()
    }, [])

    return (
        <>
            <Head>
                <title>
                    Rotas | Cherry Social
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
                                <Stack direction={`row`} spacing={2}>
                                    <Typography variant="h4">
                                        Rotas de Desafios
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
                                    <Stack
                                        direction={`row`}
                                        sx={{ width: "650px" }}>
                                        {mode == "tabela" ?
                                            <>
                                                <Stack sx={{ alignItems: "center", width: "35%", marginLeft: "95px" }}>
                                                    {sync == "sync" ?
                                                        <Button
                                                            variant="contained"
                                                            startIcon={<ArrowDownCircleIcon height={24} width={24} fontWeight={600} />}
                                                            onClick={handleSincronizar}
                                                        >
                                                            Sincronizar Servidor
                                                        </Button> :
                                                        <></>
                                                    }
                                                    {sync == "load"
                                                        ? <img src="/assets/loading.svg" width={40} height={40} />
                                                        : <></>
                                                    }
                                                    {sync == "sucess"
                                                        ? <img src="/assets/sucess.svg" width={40} height={40} />
                                                        : <></>
                                                    }
                                                    {sync == "error"
                                                        ? <img src="/assets/error.svg" width={40} height={40} />
                                                        : <></>
                                                    }
                                                    {sync == "alter"
                                                        ? <img src="/assets/sem-alteracao.png" width={40} height={40} />
                                                        : <></>
                                                    }
                                                </Stack>
                                                <Stack sx={{ alignItems: "center", width: "35%", }}>
                                                    {backup == "sync" ?
                                                        <Button
                                                            variant="contained"
                                                            startIcon={<ArrowDownOnSquareStackIcon height={24} width={24} fontWeight={600} />}
                                                            onClick={handleRestaurar}
                                                        >
                                                            Restaurar Backup
                                                        </Button> :
                                                        <></>
                                                    }
                                                    {backup == "load"
                                                        ? <img src="/assets/loading.svg" width={40} height={40} />
                                                        : <></>
                                                    }
                                                    {backup == "sucess"
                                                        ? <img src="/assets/sucess.svg" width={40} height={40} />
                                                        : <></>
                                                    }
                                                    {backup == "error"
                                                        ? <img src="/assets/error.svg" width={40} height={40} />
                                                        : <></>
                                                    }

                                                </Stack>
                                                <Stack sx={{ justifyContent: "center", width: "15%" }}>
                                                    <Button
                                                        variant="contained"
                                                        onClick={() => { setMode("cadastro") }}
                                                        startIcon={<PlusIcon height={24} width={24} fontWeight={600} />}
                                                    >
                                                        Rota
                                                    </Button>
                                                </Stack>
                                            </>
                                            : <Button
                                                onClick={() => { setMode("tabela") }}
                                                variant="contained"
                                                sx={{ marginLeft: "170px" }}

                                            >
                                                Cancelar
                                            </Button>
                                        }
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Stack>
                        {mode == "tabela" ? <TabelaRotas items={user?.rotas} setUser={setUser} /> : <></>}
                        {mode == "cadastro" ? <CadastroRotas setUser={setUser} setMode={setMode} count={user?.rotas?.length} /> : <></>}
                    </Stack>
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
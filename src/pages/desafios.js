import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/user-context';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
import { HeaderDesafios } from 'src/components/desafios/header-desafios';
import { GroupSubContasDesafios } from 'src/components/desafios/content-desafios';
import { atualizarDadosUsuario } from 'src/util/util-atualizar-dados';

const Page = () => {
    const { user, loadUser, setMode, setUser } = useContext(UserContext)
    const [load, setLoad] = useState(false)
    const router = useRouter()

    useEffect(() => {
        loadUser()
        handleSetMode()
    }, [])

    const handleSetMode = async () => {
        await modoDashboard(router, setMode)
    }
    const handleUpdate = async () => {
        await atualizarDadosUsuario(user?.usuario?.idUsuario, setUser, setLoad, router)
    }

    return (
        <>
            <Head>
                <title>
                    Desafios | Cherry Social
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
                <Container
                    maxWidth="lg"

                    sx={{
                        justifyContent: "center"
                    }}
                >
                    <HeaderDesafios
                        saldo={user?.usuario?.saldo}
                        ip={user?.usuario?.ip}
                        handleUpdate={handleUpdate}
                        load={load}
                    />
                    <GroupSubContasDesafios
                        loadUser={loadUser}
                        setUser={setUser}
                        user={user}
                        router={router}
                    />
                </Container>
            </Box >
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;

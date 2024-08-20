import Head from 'next/head';
import { Box, Container, Stack, Typography, CardHeader, Button, Link } from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import BanknotesIcon from '@heroicons/react/24/solid/BanknotesIcon'
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon'
import EyeIcon from '@heroicons/react/24/solid/EyeIcon'
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Page = () => {

    const MAX = 6
    const MIN = 1
    const router = useRouter()
    const [width, setWidth] = useState(1000)
    const [height, setHeigth] = useState(1000)
    const [img, setImg] = useState(1)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        let local = Cookies.get("auth_token")
        console.log(local)
        setRedirect(local == "" ? false : true)
        setWidth(window.innerWidth)
        setHeigth(window.innerHeight)
        setImg(Math.floor(Math.random() * (MAX - MIN + 1)) + MIN)
    }, [])


    const handleLogin = () => {
        router.push("/auth/login")
    }
    const handleAtualizacoes = () => {
        router.push("/atualizacoes")
    }

    const styleCard = {
        height: "100px",
        width: "100px",
        borderRadius: "50%",
        display: "flex",
        paddindLeft: "-50px",
        justifyContent: "center",
        alignItems: "center"
    }
    return (
        <>
            <Head>
                <title>
                    Cherry Social
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    padding: 0
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        justifyContent: "center",
                        width: "100%",
                    }}
                >

                    <Stack
                        direction={`row`}
                        sx={{
                            width: "100%",

                        }}
                    >
                        <Stack
                            direction={`row`}
                            spacing={2}
                            sx={{
                                width: "80%",
                                alignItems: "center",
                                height: "80px"
                            }}
                        >
                            <img
                                className='imagem-auth'
                                alt=""
                                src="/assets/logo_cherry.png"
                                width={46}
                                height={46}
                            />
                            <Typography
                                variant='h5'
                            >
                                Cherry Social
                            </Typography>
                        </Stack>
                        <Stack
                            direction={`row`}
                            sx={{
                                width: "20%",
                                alignItems: "center",
                                height: "80px",
                                justifyContent: 'center',
                                alignItems: "center"
                            }}
                        >
                            <Button
                                onClick={handleLogin}
                                variant="contained"
                                sx={{
                                    fontSize: "12pt",
                                    borderRadius: "50px",
                                    width: "140px",
                                    height: "45px",
                                    background: "#de3163",
                                    "&:hover": {
                                        background: "#bd0439"
                                    }
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    sx={{
                                        fontSize: "12pt",
                                    }}
                                >
                                    Login
                                </Typography>
                            </Button>
                        </Stack>
                    </Stack>
                    <Stack
                        spacing={3}
                        sx={{
                            width: "100%",
                            marginTop: "80px",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {redirect ?
                            <Link
                                sx={{ background: "none", "&:hover": { background: "none" }, textDecoration: "none" }}
                                href='https://www.cherrysocial.com.br/atualizacoes'
                            >
                                <Typography
                                    variant="p"
                                    sx={{ textAlign: "center", color: "cereja.100", fontWeight: 600 }}
                                >
                                    Fez login e não foi redirecionado(a)? Clique aqui para continuar
                                </Typography>
                            </Link>
                            :
                            <></>

                        }
                        <Typography
                            variant="h3"
                            sx={{ textAlign: "center" }}
                        >
                            Quer ganhar um extra de forma segura e sem burocracias?
                        </Typography>
                        <Typography
                            variant="p"
                            sx={{ textAlign: "center" }}
                        >
                            Assista anúncios e ganhe dinheiro! Aproveite nosso serviço para aumentar sua renda enquanto assiste anúncios online.
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <img
                            className='imagem-auth'
                            alt=""
                            src={`/assets/media-social-${img}.svg`}
                            style={{ height: `${width < 500 ? 350 : 500}px`, width: `${width < 500 ? 350 : 500}px` }}
                        />
                    </Stack>
                    <Stack
                        sx={{
                            width: "100%"
                        }}
                    >
                        <Stack
                            spacing={3}
                        >
                            <Typography
                                variant="h3"
                                sx={{ textAlign: "center" }}
                            >
                                Venha trabalhar com a gente!
                            </Typography>
                            <Typography
                                variant="p"
                                sx={{ textAlign: "center" }}
                            >
                                A CherrySocial revoluciona a interação online, permitindo que os usuários ganhem dinheiro ao assistir anúncios curtos. A plataforma transforma essa atividade em uma oportunidade lucrativa, tornando a visualização de anúncios mais recompensadora e engajadora.
                            </Typography>
                        </Stack>
                        <Stack
                            direction={{ sm: "row", xs: "column" }}
                            sx={{ marginTop: "50px", height: "300px", alignItems: "center" }}
                            spacing={4}
                        >
                            <Stack
                                direction={`column`}
                                sx={{ alignItems: "center", width: { sm: "30%", xs: "95%" } }}
                            >
                                <Stack>
                                    <div style={{ border: "15px solid #FFD2DA", ...styleCard }}>

                                        <BanknotesIcon
                                            height="40px"
                                            width="40px"
                                            color="#d62746"
                                        />
                                    </div>
                                </Stack>
                                <Stack spacing={2}
                                    sx={{
                                        boxShadow: "1px"
                                    }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ textAlign: "center", marginTop: "10px" }}
                                    >Renda Extra</Typography>
                                    <Typography
                                        variant="p"
                                        sx={{ textAlign: "justify", fontSize: "10pt", fontWeight: 600 }}
                                    >
                                        Trabalhe quando quiser e de onde quiser. Não há limites para seus
                                        ganhos, tudo depende da sua disposição!
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                direction={`column`}
                                sx={{ alignItems: "center", width: { sm: "30%", xs: "95%" } }}
                            >
                                <Stack>
                                    <div style={{ border: "15px solid #FFD8CD", ...styleCard }}>

                                        <LockClosedIcon
                                            height="40px"
                                            width="40px"
                                            color="#ff764d"
                                        />
                                    </div>
                                </Stack>
                                <Stack spacing={2}
                                    sx={{ boxShadow: "1px" }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ textAlign: "center", marginTop: "10px" }}
                                    >Segurança</Typography>
                                    <Typography
                                        variant="p"
                                        sx={{ textAlign: "justify", fontSize: "10pt", fontWeight: 600 }}
                                    >
                                        Garantimos total segurança dos seus dados. Sua privacidade é a nossa prioridade!
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                direction={`column`}
                                sx={{ alignItems: "center", width: { sm: "30%", xs: "95%" } }}
                            >
                                <Stack>
                                    <div style={{ border: "15px solid #C6FDF3", ...styleCard }}>

                                        <EyeIcon
                                            height="40px"
                                            width="40px"
                                            color="#3dccb2"
                                        />
                                    </div>
                                </Stack>
                                <Stack spacing={2}
                                    sx={{ boxShadow: "1px" }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ textAlign: "center", marginTop: "10px" }}
                                    >Transparência</Typography>
                                    <Typography
                                        variant="p"
                                        sx={{ textAlign: "justify", fontSize: "10pt", fontWeight: 600 }}
                                    >Somos totalmente transparentes e você pode ter acesso ao seu
                                        histórico de ações realizadas a qualquer momento.
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Stack
                                direction={`column`}
                                sx={{ alignItems: "center", width: { sm: "30%", xs: "95%" } }}
                            >
                                <Stack>
                                    <div style={{ border: "15px solid #E0E1FE", ...styleCard }}>

                                        <CurrencyDollarIcon
                                            height="40px"
                                            width="40px"
                                            color="#545aff"
                                        />
                                    </div>
                                </Stack>
                                <Stack spacing={2}
                                    sx={{ boxShadow: "1px", marginBottom: "50px" }}
                                >
                                    <Typography
                                        variant="h5"
                                        sx={{ textAlign: "center", marginTop: "10px" }}
                                    >Pagamentos</Typography>
                                    <Typography
                                        variant="p"
                                        sx={{ textAlign: "justify", fontSize: "10pt", fontWeight: 600 }}
                                    >
                                        Pagamento rápido e sem burocracia via pix em até 4 dias.
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                </Container>
            </Box>
        </>
    )
}
Page.getLayout = (page) => (
    <>
        {page}
    </>
);

export default Page;

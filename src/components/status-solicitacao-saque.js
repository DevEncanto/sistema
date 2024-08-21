import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/user_context/user_context';
import formatSaldo from '../utils/formatarSaldos';

export const SolicitacaoSaque = () => {
    return (
        <Stack
            sx={{ alignItems: "center", marginTop: "50px" }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                    width: { sm: "60%", xp: "90%" },
                    borderRadius: "15px",
                    minHeight: "230px",
                    justifyContent: "center"
                }}
            >
                <Stack
                    sx={{
                        maxHeight: "30%",
                        width: "100%",
                        padding: "10px",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={4}
                >
                    <img src="/assets/trofeu-icon.png"
                        width={60}
                        height={60}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "15pt" }}
                    >
                        Solicitação de Pagamento
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "70%",
                        width: "100%", padding: "7px"
                    }}
                    spacing={1}
                >
                    <Typography
                        variant="p"
                        sx={{ fontSize: "14pt", textAlign: "center" }}
                    >
                        Olá caro usuário, tudo bem? O seu pagamento está sendo solicitado!
                    </Typography>
                    <Typography
                        variant="p"
                        sx={{ fontSize: "14pt", textAlign: "center" }}
                    >
                        <img src="/assets/loading.svg" width={50} height={50} />
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "30%",
                        marginBottom: "10px",
                        width: "100%",
                        padding: "10px 20px ",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={2}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "12pt" }}
                    >
                        Cherry Social
                    </Typography>
                    <img src="/assets/logo_cherry.png"
                        width={30}
                        height={30}
                    />
                </Stack>
            </Stack>
        </Stack >
    )
}

export const ErroSaque = () => {
    return (
        <Stack
            sx={{ alignItems: "center", marginTop: "50px" }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                    width: { sm: "60%", xp: "90%" },
                    borderRadius: "15px",
                    minHeight: "230px",
                    justifyContent: "center"
                }}
            >
                <Stack
                    sx={{
                        maxHeight: "30%",
                        width: "100%",
                        padding: "10px",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={4}
                >
                    <img src="/assets/erro.png"
                        width={60}
                        height={60}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "15pt" }}
                    >
                        Falha na Solicitação
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "70%",
                        width: "100%", padding: "7px"
                    }}
                    spacing={1}
                >
                    <Typography
                        variant="p"
                        sx={{ fontSize: "14pt", textAlign: "center" }}
                    >
                        Olá caro usuário, tudo bem? Houve algum erro ao solitar o seu pagamento, entre em contato com o nosso suporte!
                    </Typography>
                    <Typography
                        variant="p"
                        sx={{ fontSize: "14pt", textAlign: "center" }}
                    >
                        <img src="/assets/loading.svg" width={50} height={50} />
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "30%",
                        marginBottom: "10px",
                        width: "100%",
                        padding: "10px 20px ",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={2}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "12pt" }}
                    >
                        Cherry Social
                    </Typography>
                    <img src="/assets/logo_cherry.png"
                        width={30}
                        height={30}
                    />
                </Stack>
            </Stack>
        </Stack >
    )
}

export const SucessoSaque = () => {

    return (
        <Stack
            sx={{ alignItems: "center", marginTop: "50px" }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                    width: { sm: "60%", xp: "90%" },
                    borderRadius: "15px",
                    minHeight: "230px",
                    justifyContent: "center"
                }}
            >
                <Stack
                    sx={{
                        maxHeight: "30%",
                        width: "100%",
                        padding: "10px",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={4}
                >
                    <img src="/assets/trofeu-icon.png"
                        width={60}
                        height={60}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "15pt" }}
                    >
                        Sucesso na Solicitação!
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "70%",
                        width: "100%", padding: "7px"
                    }}
                    spacing={1}
                >
                    <Typography
                        variant="p"
                        sx={{ fontSize: "14pt", textAlign: "center" }}
                    >
                        Olá caro usuário, tudo bem? O seu pagamento foi solicitado com sucesso!
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "30%",
                        marginBottom: "10px",
                        width: "100%",
                        padding: "10px 20px ",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={2}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "12pt" }}
                    >
                        Cherry Social
                    </Typography>
                    <img src="/assets/logo_cherry.png"
                        width={30}
                        height={30}
                    />
                </Stack>
            </Stack>
        </Stack >
    )
}

export const Banimento = () => {
    const { user, loadUser } = useContext(UserContext)
    useEffect(() => {
        loadUser()
    }, [])
    return (
        <Stack
            direction="row"
            spacing={1}>
            <img
                className='imagem-auth'
                alt=""
                src="/assets/banir-usuario.png"
                width={120}
                height={120}
            />
            <Stack
                direction="column"
                alignItems="center">
                <Typography
                    variant='h4'
                    marginLeft={2}>
                    {`O usuário ${user?.usuario?.nome} foi banido permanentemente!`}
                </Typography>
                <Typography
                    variant='h5'
                    marginLeft={2}
                    marginTop={2}
                    fontSize={20}
                >
                    Sua conta foi banida da plataforma por violar uma das sessões do nosso termo de uso!
                </Typography>
                <Typography
                    variant='p'
                    marginLeft={2}
                    marginTop={1}>
                    Motivo: Alteração indevida nos dados armazenados em cookies presentes em seu navegador!
                </Typography>

            </Stack>
        </Stack>
    )
}

export const SaqueMinimo = (props) => {
    const { minimo } = props
    return (
        <Stack
            sx={{ alignItems: "center", marginTop: "50px" }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                    width: { sm: "60%", xp: "90%" },
                    borderRadius: "15px",
                    minHeight: "230px",
                    justifyContent: "center"
                }}
            >
                <Stack
                    sx={{
                        maxHeight: "30%",
                        width: "100%",
                        padding: "10px",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={4}
                >
                    <img src="/assets/erro.png"
                        width={60}
                        height={60}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "15pt" }}
                    >
                        Saque Mínimo
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "70%",
                        width: "100%", padding: "7px"
                    }}
                    spacing={1}
                >
                    <Typography
                        variant="p"
                        sx={{ fontSize: "14pt", textAlign: "center" }}
                    >
                        {minimo == 15
                            ? `Olá caro usuário, tudo bem? Atualmente o seu saque mínimo é de R$ ${formatSaldo(minimo, 2)}!`
                            : `Olá caro usuário, tudo bem? Os seus dois primeiros saques são limitados à R$ 3.00, na sequência, o saque mínimo será R$ 15,00 sem limite de valor!`
                        }
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "30%",
                        marginBottom: "10px",
                        width: "100%",
                        padding: "10px 20px ",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={2}
                >
                    <Typography
                        variant="h5"
                        sx={{ fontSize: "12pt" }}
                    >
                        Cherry Social
                    </Typography>
                    <img src="/assets/logo_cherry.png"
                        width={30}
                        height={30}
                    />
                </Stack>
            </Stack>
        </Stack >
    )
}


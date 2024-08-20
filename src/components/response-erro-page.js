import { Stack, Typography } from "@mui/material"

export const ResponseErro = (props) => {
    const { motivo = "Manutenção dos Servidores", tempo = "Indeterminado" } = props
    return (
        <Stack
            sx={{ alignItems: "center" }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                    width: { sm: "100%", xp: "90%" },
                    borderRadius: "15px",
                    minHeight: "230px",
                    justifyContent: "center",
                    background: 'radial-gradient(50% 50% at 50% 50%, #234e94 0%, #1f2e6b 100%)'
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
                        sx={{ fontSize: { sm: "18pt", xp: "15pt" }, color: "#fff" }}
                    >
                        Erro de Conexão com o Servidor!
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
                        sx={{ fontSize: "15pt", textAlign: "center", color: "#fff" }}
                    >
                        Olá caro usuário, tudo bem? Aparentemente um dos nossos servidores está
                        apresentando instabilidades! 
                    </Typography>
                    <Typography
                        variant="p"
                        sx={{ fontSize: "15pt", textAlign: "center", color: "#fff" }}
                    >
                       Informe o seguinte código para o suporte: 404
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
                        sx={{ fontSize: "12pt", color: "#fff" }}
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
import { Stack, Typography } from "@mui/material"

export const ResponseVPN = (props) => {
    const { dados, user } = props
    return (
        dados?.VPN
            ? <Stack
                sx={{ alignItems: "center" }}
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
                        <img src="/assets/ip-icon.png"
                            width={60}
                            height={60}
                        />
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "15pt" }}
                        >
                            Endereço IP em uso!
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
                            Olá <Typography variant="p" sx={{ fontWeight: 600 }}>{user}</Typography>, tudo bem? Cada endereço IP só pode ser utilizado por um único usuário dentro de 24 horas,
                            crie novos slots de endereços IP no gerenciador acima, conecte-se a um nova rede Wi-fi, dados móveis ou VPN para realizar mais desafios!
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
            : <></>

    )
}
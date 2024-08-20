import { Stack, Typography } from "@mui/material"

export const ResponsePulo = (props) => {
    const { dados } = props
    return (
        dados?.pulo ?
            <Stack
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
                        <img src="/assets/pulo-icon.png"
                            width={60}
                            height={60}
                        />
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "15pt" }}
                        >
                            Esse IP não pode ser utilizado!
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
                            Olá caro usuário, tudo bem? Você pulou esse IP e ele só estará disponível após o servidor reiniciar os desafios, às 21:00 de cada dia!
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
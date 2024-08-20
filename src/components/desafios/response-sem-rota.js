import { Stack, Typography } from "@mui/material"

export const ResponseSemRota = (props) => {
    const { dados } = props
    return (
        dados?.semRota ?
            <Stack
                sx={{ alignItems: "center" }}
            >
                <Stack
                    sx={{
                        alignItems: "center",
                        boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                        width: { sm: "60%", xp: "90%" },
                        borderRadius: "15px",
                        minHeight: "240px",
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
                        <img src="/assets/puzzle.png"
                            width={60}
                            height={60}
                        />
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "15pt" }}
                        >
                            Nenhum desafio encontrado!
                        </Typography>
                    </Stack>
                    <Stack
                        sx={{
                            maxHeight: "10%",
                            width: "100%", padding: "10px"
                        }}
                    >

                    </Stack>
                    <Stack
                        sx={{
                            maxHeight: "80%",
                            width: "100%", padding: "10px"
                        }}
                        spacing={1}
                    >
                        <Typography
                            variant="p"
                            sx={{ fontSize: "14pt", textAlign: "center" }}
                        >
                            Olá caro usuário, tudo bem? No momento não há nenhum
                            desafio disponível na plataforma!
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
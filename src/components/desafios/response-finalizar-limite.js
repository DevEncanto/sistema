import { Button, Stack, Typography } from "@mui/material"
import { SeverityPill } from "../severity-pill"
export const ResponseFinalizarLimite = (props) => {
    const { dados, setPular, pular } = props
    return (
        dados?.finalizarLimite ?

            < Stack
                sx={{ alignItems: "center" }
                }
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
                        <img src="/assets/alert.png"
                            width={60}
                            height={60}
                        />
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "15pt" }}
                        >
                            Limite Diário
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
                            sx={{ fontSize: "12pt", textAlign: "center" }}
                        >
                            Olá caro usuário, tudo bem? Para utilizar um novo IP, finalize o limite diário do IP atual.
                            Caso queira/precise utilizar outro endereço IP, clique no botão abaixo e solicite um novo desafio!
                        </Typography>
                        <Typography
                            variant="p"
                            sx={{ fontSize: "12pt", textAlign: "center", fontWeight: 600 }}
                        >
                            OBS: Ao realizar essa ação, não poderá realizar desafios nesse IP até os desafios serem zerados!
                        </Typography>
                        <Stack
                            sx={{ alignItems: "center" }}
                        >
                            {!pular
                                ? <Button
                                    sx={{ width: "180px" }}
                                    onClick={() => setPular(true)}
                                >
                                    <Typography variant='p'>
                                        <SeverityPill
                                            sx={{ cursor: "pointer" }}
                                            color="white" isBackground={false}>
                                            PULAR IP
                                        </SeverityPill>
                                    </Typography>
                                </Button>
                                : <></>

                            }
                        </Stack>
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
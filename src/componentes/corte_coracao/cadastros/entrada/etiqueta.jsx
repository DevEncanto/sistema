import { Stack, Typography } from "@mui/material"
import { QRCodeCanvas } from "qrcode.react"

export const Etiqueta = (props) => {

    const { etiqueta } = props

    const sx = {
        borderRadius: "12px",
        width: "200px",
        height: "85px",
        margin: "6px",
        padding: "0",
        alignItems: "center",
        border: "2px solid #000",
        justifyContent: "center",
        // backgroundColor: "red"
    }

    return (
        <Stack
            sx={sx}
            direction={"row"}
        >
            <Stack
                sx={{
                    height: "100%",
                    width: "40%",
                    alignItems: "center",
                    justifyContent: "center",
                    // backgroundColor: 'blue',
                    padding: "20px"
                }}
            >
                <QRCodeCanvas value={JSON.stringify(etiqueta)} size={70} />
            </Stack>
            <Stack
                direction={`row`}
                sx={{
                    height: "100%",
                    width: "60%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Stack
                    sx={{ width: "70%", height: "100%" }}
                >
                    <Stack
                        sx={{ width: "100%" }}
                    >
                        <Stack
                            spacing={0}
                            sx={{ alignItems: "center", justifyContent: "center", height: "100%", marginTop: "-5px" }}
                        >
                            <Typography
                                variant="h5"
                                fontSize={65}
                            >
                                {etiqueta.semana}
                            </Typography>
                            <Typography
                                variant="h5"
                                fontSize={15}
                                sx={{ marginTop: "-10px" }}
                            >
                                SEMANA
                            </Typography>

                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        width: "30%",
                        height: "100%",
                        flexDirection: "column", // Mantém a disposição dos itens na vertical
                        justifyContent: "center", // Centraliza os itens na vertical
                        alignItems: "center", // Centraliza os itens na horizontal
                        gap: 2, // Adiciona espaçamento entre os itens
                    }}
                >
                    <Typography
                        variant="h5"
                        fontSize={15}
                        sx={{
                            transform: "rotate(90deg)", // Rotaciona o texto 90 graus
                            transformOrigin: "center", // Mantém o ponto de rotação no centro
                            // Alinha o texto após rotação
                            whiteSpace: "nowrap", // Impede que o texto se quebre
                        }}
                    >
                        Nº
                    </Typography>
                    <Typography
                        variant="h5"
                        fontSize={15}
                        sx={{
                            transform: "rotate(90deg)", // Rotaciona o texto 90 graus
                            transformOrigin: "center", // Mantém o ponto de rotação no centro
                            marginBottom: "8px",  // Alinha o texto após rotação
                            whiteSpace: "nowrap", // Impede que o texto se quebre
                        }}
                    >
                        {etiqueta.etiqueta}
                    </Typography>
                </Stack>
            </Stack>
        </Stack >
    )
}

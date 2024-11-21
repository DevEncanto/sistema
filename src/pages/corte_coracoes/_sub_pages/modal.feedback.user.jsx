import { Stack, Typography } from "@mui/material"
import { ImageStatusFeedback } from "../_components/image.status"
import { useContext } from "react"
import { CorteCoracaoContext } from "../../../contexts/contexts/corte.coracao.context"

const { ModalCorteCoracao } = require("../_components/modais/modal")

export const ModalFeedBack = () => {

    const { cCorteCoracao: { type, alert } } = useContext(CorteCoracaoContext)

    return (
        <Stack
            sx={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "red",
                width: "100%"
            }}
        >
            <ModalCorteCoracao
                width="420px"
                height="250px"
                header={false}
            >
                <Stack
                    spacing={2}
                    sx={{
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Stack
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "60%"
                        }}
                    >
                        <ImageStatusFeedback type={type} />
                    </Stack>
                    <Stack
                        sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            width: "100%",
                            height: "40%"
                        }}
                    >
                        <Typography
                            variant="h5"
                            fontSize={18}
                        >
                            {alert}
                        </Typography>
                    </Stack>

                </Stack>

            </ModalCorteCoracao>
        </Stack>
    )
}
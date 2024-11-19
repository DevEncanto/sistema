import { Stack, Typography } from "@mui/material"
import { ImageStatusFeedback } from "../_components/image.status"

const { ModalCorteCoracao } = require("../_components/modais/modal")

export const ModalFeedBack = (props) => {
    return (
        <ModalCorteCoracao>
            <Stack>
                <ImageStatusFeedback />
            </Stack>
            <Typography
                variant="h5"
                fontSize={18}
            >
                Cadastro Realizado com sucesso
            </Typography>
        </ModalCorteCoracao>
    )
}
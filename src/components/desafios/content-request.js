import { Stack } from "@mui/material"
import { ContentToken } from "./content-token"
import { ContentLink } from "./content-link"
import { RequestDesafios } from "./load-request"
import { ResponseSemRota } from "./response-sem-rota"
import { ResponseVPN } from "./response-vpn"
import { ResponseFinalizarLimite } from "./response-finalizar-limite"
import { ResponseGerenciador } from "./response-gerenciador"
import { ResponseLimite } from "./response-limite"
import { ResponsePulo } from "./response-pulo"

export const FeedbackForUser = (props) => {

    const { dados, req, setPular, user, pular } = props
    return (
        <Stack
            direction="row"
            spacing={5}
            sx={{
                marginTop: "5px",
                alignItems: "center",
                justifyContent: "center"
            }}
        >

            <Stack
                direction="column"
                spacing={2}
                alignItems="center"
            >
                <ContentToken dados={dados} />
                <ContentLink dados={dados} />
                <RequestDesafios req={req} />
                <ResponseSemRota dados={dados} />
                <ResponseVPN dados={dados} user={user} />
                <ResponseFinalizarLimite dados={dados} setPular={setPular} pular={pular} />
                <ResponseGerenciador dados={dados} />
                <ResponseLimite dados={dados} />
                <ResponsePulo dados={dados} />
            </Stack>
        </Stack>
    )
}
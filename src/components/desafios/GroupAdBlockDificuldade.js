import { Stack } from "@mui/material"
import { useDetectAdBlock } from "adblock-detect-react";
import { AdBlockDetected } from "./ad-block-detected";
import { Dificuldades } from "./dificuldades";
import { useState } from "react";
import { FeedbackForUser } from "./content-request";

export const GroupAdBlockDificuldade = (props) => {
    const { sub, user } = props
    const [dados, setDados] = useState({})
    const [req, setReq] = useState(false)
    const [pular, setPular] = useState(false)
    const adBlockDetected = useDetectAdBlock();
    return (
        <Stack
            direction="column"
            spacing={5}
            sx={{ justifyContent: "center" }}
        >
            {adBlockDetected
                ? <AdBlockDetected />
                : <Dificuldades
                    setReq={setReq}
                    setDados={setDados}
                    sub={sub}
                    pular={pular}
                    setPular={setPular}
                />
            }
            <FeedbackForUser
                dados={dados}
                req={req}
                setPular={setPular}
                user={user}
                pular={pular}
            />
        </Stack>
    )
}
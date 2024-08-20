import { Stack, Typography, Button } from "@mui/material"
import { useState } from "react"
import { CopyToClipboard } from 'react-copy-to-clipboard';
import delay from "src/utils/delay";

export const ContentToken = (props) => {
    
    const { dados } = props
    const [buttonText, setButtonText] = useState("Copiar")
    
    const handleCopy = async () => {
        setButtonText("Copiado")
        await delay(3000)
        setButtonText("Copiar")
    }

    return (
        <Stack direction="column" spacing={0} alignItems="center">
            {!!(dados?.token) ?
                <Stack
                    direction={`column`}
                    sx={{ justifyContent: "center" }}
                    spacing={1}
                >
                    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                        <Typography> Token de Confirmação: </Typography>
                        <Typography fontWeight={600}>{dados.token}</Typography>
                        <CopyToClipboard text={dados.token} onCopy={handleCopy}>
                            <Button variant="contained">
                                {buttonText}
                            </Button>
                        </CopyToClipboard>
                    </Stack>
                    <Typography textAlign="center" fontSize={12} fontWeight={600}> Copie o token antes de aceitar o desafio!</Typography>
                </Stack>
                : <></>
            }

        </Stack>
    )
}
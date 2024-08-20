import { useState } from "react"
import { SeverityPill } from "../severity-pill"
import { verificarSaldo } from "src/util/util-admin"

const { Stack, Typography, Button, TextField } = require("@mui/material")

export const VerificacaoSaldo = (props) => {

    const { bot, setGerenciador, setUser } = props
    const [inicio, setInicio] = useState(0)
    const [fim, setFim] = useState(0)
    const [message, setMessage] = useState("Inicio maior que o fim")
    const [mode, setMode] = useState("verificacao")

    const handleVerificarSaldo = async () => {
        if (inicio != NaN && fim != NaN) {
            await verificarSaldo(parseInt(inicio), parseInt(fim), setMode, setMessage, handleReset, setUser)
        }
    }

    const handleReset = () => {
        setInicio(0)
        setFim(0)
    }
    return (
        <Stack
            direction={`row`}
            sx={{ alignItems: "center" }}
        >
            <Stack>
                <Stack
                    direction={`row`}
                    spacing={1}
                    sx={{ alignItems: "center" }}
                >
                    <Typography>Status do bot: </Typography>
                    <Typography sx={{ fontWeight: 600 }}>{bot?.status}</Typography>
                </Stack>
                {bot?.status == "Desativado"
                    ? <Stack
                        direction={`row`}
                        spacing={1}
                        sx={{ alignItems: "center" }}
                    >
                        <Typography>Status da Última Verificação: </Typography>
                        <Typography sx={{ fontWeight: 600 }}>{bot?.ultimaVerificacao}</Typography>
                    </Stack>
                    :
                    <></>
                }
            </Stack>

            {bot?.status == "Desativado"
                ? <Stack
                    direction="row"
                    spacing={1}
                    sx={{ margin: "0 20px 0 60px", alignItems: "center" }}
                >
                    <TextField
                        sx={{ width: "130px", height: "50px" }}
                        label="Inicio"
                        name="exc-avatar"
                        onChange={e => { setInicio(e.target.value) }}
                        type="number"
                        value={inicio}
                        autoComplete='off'
                    />
                    <TextField
                        sx={{ width: "130px", height: "50px" }}
                        label="Fim"
                        name="exc-avatar"
                        onChange={e => { setFim(e.target.value) }}
                        type="number"
                        value={fim}
                        autoComplete='off'
                    />
                    {mode == "verificacao" ?
                        <Button
                            sx={{ height: "44px" }}
                            onClick={handleVerificarSaldo}
                        >
                            <SeverityPill
                                isBackground={false}
                                color={`white`}
                            >
                                Iniciar Verificação
                            </SeverityPill>
                        </Button> :
                        <></>
                    }
                    {mode == "load"
                        ? <img src="/assets/loading.svg" width={40} height={40} />
                        : <></>
                    }
                    {mode == "error"
                        ? <Stack
                            spacing={2}
                            direction={`row`}
                            sx={{ alignItems: "center" }}
                        >
                            <Typography
                                sx={{ fontWeight: 600, color: "red" }}>
                                {message}
                            </Typography>
                            <img src="/assets/error.svg" width={30} height={30} />
                        </Stack>
                        : <></>
                    }
                </Stack>
                :
                <Stack
                    sx={{ margin: "0 20px 0 60px", alignItems: "center" }}
                    direction={`row`}
                    spacing={1}
                >
                    <Typography>Status da Verificação: </Typography>
                    <Typography sx={{ fontWeight: 600 }}>{`Conta ${bot?.contaAtual}/${bot?.contaFinal}`}</Typography>
                </Stack>
            }
            <Button
                onClick={() => { setGerenciador("barra") }}
            >
                <SeverityPill
                    isBackground={false}
                    color={`white`}
                >
                    Fechar
                </SeverityPill>
            </Button>
        </Stack>
    )
}
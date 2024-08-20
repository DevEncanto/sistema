import { Stack, TextField, Button, Typography } from "@mui/material"
import { useContext, useState } from "react"
import { SeverityPill } from "./severity-pill"
import { Seletor } from "./Seletor"
import { cadastrarRecebimento } from "src/util/util-admin"
import { useRouter } from "next/router"
import { UserContext } from "src/contexts/user-context"

export const CadastroRecebimento = (props) => {

    const router = useRouter()
    const { setModeReceb } = props

    const { setUser } = useContext(UserContext)

    const [tipo, setTipo] = useState("RECEBIMENTO")
    const [valor, setValor] = useState("")
    const [origem, setOrigem] = useState("SUA URL")
    const [mode, setMode] = useState("cadastro")

    const handleTipo = (tipo) => {
        setTipo(tipo)
    }
    const handleOrigem = (origem) => {
        setOrigem(origem)
    }

    const cadastroRecebimento = async () => {
        await cadastrarRecebimento(tipo, origem, valor, router, setMode, setUser)
    }


    return (
        <Stack direction={`row`} spacing={1}>
            <Stack spacing={1} direction={`row`} sx={{ width: "80%", alignItems: "center" }}>

                <Stack
                    direction={`row`}>
                    <SeverityPill color={"primary"}>tipo de entrada: </SeverityPill>
                    <Seletor
                        label="Status"
                        itens={["APORTE", "RECEBIMENTO", "EMPRÉSTIMO", "DEVOLUÇÃO"]}
                        value={tipo}
                        handleChange={handleTipo}
                        isSeverityPill={true}
                        type={`neutral`}
                    />
                </Stack>
                <Stack
                    direction={`row`}>
                    <SeverityPill color={"primary"}>ORIGEM: </SeverityPill>
                    <Seletor
                        label="Origem"
                        itens={["SUA URL", "GABRIEL", "MARCOS"]}
                        value={origem}
                        handleChange={handleOrigem}
                        isSeverityPill={true}
                        type={`neutral`}
                    />
                </Stack>

                <TextField
                    fullWidth
                    label="Valor"
                    name="exc-avatar"
                    onChange={e => { setValor(e.target.value) }}
                    type="number"
                    value={valor}
                    autoComplete='off'
                />
            </Stack>
            <Stack direction={`row`} sx={{ width: "20%", alignItems: "center", justifyContent: "center" }}>
                {mode == "cadastro" ?
                    <Button
                        variant='contained'
                        onClick={cadastroRecebimento}
                    >
                        Cadastrar
                    </Button>
                    : <></>
                }
                {mode == "load"
                    ? <img src="/assets/loading.svg" width={50} height={50} />
                    : <></>
                }
                {mode == "vazio"
                    ? <Typography
                        sx={{ fontWeight: 600, color: "red" }}>
                        Campos Vazios
                    </Typography>
                    : <></>
                }
                {mode == "sucess"
                    ? <img src="/assets/sucess.svg" width={45} height={45} />
                    : <></>
                }
                {mode == "error"
                    ? <img src="/assets/error.svg" width={45} height={45} />
                    : <></>
                }
            </Stack>
            {mode != "senha"
                ?
                <Stack direction={`row`} sx={{ width: "10%", alignItems: "center", justifyContent: "center" }}>
                    <Button
                        variant='contained'
                        onClick={() => { setModeReceb("tabela") }}>
                        Fechar
                    </Button>
                </Stack>
                : <></>
            }
        </Stack>
    )
}
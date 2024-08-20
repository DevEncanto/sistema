import { useEffect, useState } from "react"
import { TabelaSubContas } from "../tabela-sub-contas"
import { GroupAdBlockDificuldade } from "./GroupAdBlockDificuldade"
import { Stack, Button } from "@mui/material"
import { SeverityPill } from "../severity-pill"
import { adicionarIp } from "src/util/util-desafios"

export const GroupSubContasDesafios = (props) => {
    const { items = [], user, setUser, router } = props
    const [mode, setMode] = useState("desafio")
    const [sub, setSub] = useState("")
    const [load, setLoad] = useState(false)
    const [filtro, setFiltro] = useState("VISIVEL")

    const handleAdicionarIP = async () => {
        await adicionarIp(
            user?.usuario?.idUsuario,
            user?.usuario?.nome,
            setLoad,
            setUser,
            router
        )
    }

    return (
        <Stack
            sx={{ justifyContent: "center" }}
        >
            <Stack
                sx={{ margin: "20px 0 20px" }}
            >
                {mode == "desafio"
                    ? <Button
                        sx={{ width: "200px" }}
                        onClick={() => { setMode("subcontas") }}
                    >
                        <SeverityPill
                            isBackground={false}
                            color="white"
                            sx={{ cursor: 'pointer' }}>
                            Gerenciar endereços IPs
                        </SeverityPill>
                    </Button>
                    : <Stack
                        spacing={2}
                        direction={`row`}
                    >
                        <Button
                            sx={{ width: "200px" }}
                            onClick={() => { setMode("desafio") }}
                        >
                            <SeverityPill
                                isBackground={false}
                                color="white"
                                sx={{ cursor: 'pointer' }}>
                                realizar desafios
                            </SeverityPill>
                        </Button>

                        {load ?
                            <img src="/assets/loading.svg"
                                style={{ marginLeft: "80px" }}
                                width={40}
                                height={40}
                            />
                            :
                            <Button
                                sx={{ width: "200px" }}
                                onClick={handleAdicionarIP}
                            >
                                <SeverityPill
                                    isBackground={false}
                                    color="white"
                                    sx={{ cursor: 'pointer' }}>
                                    ADICIONAR IP
                                </SeverityPill>
                            </Button>
                        }

                    </Stack>
                }
            </Stack>
            {mode == "desafio" ? <GroupAdBlockDificuldade sub={sub} setSub={setSub} user={user?.usuario?.nome} /> : <></>}
            {mode == "subcontas"
                ? <TabelaSubContas
                    maxHeight={320}
                    items={user?.subUsuarios}
                    limite={user?.limiteDesafios}
                    sub={sub}
                    setSub={setSub}
                    user={user}
                    setUser={setUser}
                    filtro={filtro}
                    setFiltro={setFiltro}
                />
                : <></>}
        </Stack>
    )
}
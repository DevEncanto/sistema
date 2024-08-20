import { Stack, Button, Typography, CardHeader } from "@mui/material"
import { solicitarDesafios } from "src/util/util-desafios"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "src/contexts/user-context"
import { useRouter } from "next/router"
import { SeverityPill } from "../severity-pill"
import { atualizarDadosUsuario } from "src/util/util-atualizar-dados"


export const Dificuldades = (props) => {

    const { user, loadUser, setUser } = useContext(UserContext)
    const { setReq, setDados, sub, pular, setPular } = props
    const router = useRouter()
    const [message, setMessage] = useState("")

    useEffect(() => {
        loadUser()
    }, [])

    const handleBuscarDesafio = async (dificuldade) => {
        loadUser()
        await solicitarDesafios(
            dificuldade,
            sub,
            user?.usuario?.idUsuario,
            user?.usuario?.nome,
            setDados,
            setReq,
            router,
            user?.usuario?.avatar,
            setMessage,
            setUser,
            pular
        )
        setPular(false)
        await atualizarDadosUsuario(user?.usuario?.idUsuario, setUser)
    }

    return (
        <Stack
            sx={{ alignItems: "center", height: "100px", marginTop: { xp: "0", sm: "-60px" } }}
        >
            <CardHeader
                subheader=""
                title="Selecione uma das opções abaixo!"
                sx={{
                    marginTop: "-5px"
                }}
            />
            <Stack
                spacing={{ xp: 2, sm: 4 }}
                direction={`row`}
            >
                <Button
                    variant="contained"
                    onClick={() => { handleBuscarDesafio("facil") }}
                    sx={{ width: { xp: "120px", sm: "150px" } }}
                >
                    <Stack direction="column">
                        <Typography variant='p'>
                            <SeverityPill
                                sx={{ cursor: "pointer" }}
                                color="white" isBackground={false}>
                                Desafio Fácil
                            </SeverityPill>
                        </Typography>
                    </Stack>
                </Button>
                <Button
                    variant="contained"
                    onClick={() => { handleBuscarDesafio("medio") }}
                    sx={{ width: { xp: "120px", sm: "150px" } }}
                >
                    <Stack direction="column">
                        <Typography variant='p'>
                            <SeverityPill
                                sx={{ cursor: "pointer" }}
                                color="white" isBackground={false}>
                                Desafio Médio
                            </SeverityPill>
                        </Typography>
                    </Stack>
                </Button>
                <Button
                    variant="contained"
                    onClick={() => { handleBuscarDesafio("dificil") }}
                    sx={{ width: { xp: "120px", sm: "150px" } }}
                >
                    <Stack direction="column">
                        <Typography variant='p'>
                            <SeverityPill
                                sx={{ cursor: "pointer" }}
                                color="white" isBackground={false}>
                                Desafio Difícil
                            </SeverityPill>
                        </Typography>
                    </Stack>
                </Button>
            </Stack>
            {!!(message)
                ? <Typography
                    sx={{ color: "red", fontWeight: 600, marginTop: "20px" }}
                >
                    {message}
                </Typography>
                : <></>
            }
        </Stack>
    )
}
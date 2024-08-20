import { Stack, Typography, TextField, Button } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import { ErroManutencao, SucessoManutencao, LoadingManutencao } from "./status-atualizacao-manutencao"
import { alterarStatusPlataforma } from "src/util/util-admin"
import { UserContext } from "src/contexts/user-context"

export const ConfigManutencao = () => {
    const { user, loadUser, setUser } = useContext(UserContext)
    const [motivo, setMotivo] = useState("")
    const [time, setTime] = useState("")
    const [modeON, setModeON] = useState("alterar")
    const [modeOFF, setModeOFF] = useState("alterar")

    useEffect(() => {
        loadUser()
    }, [])

    const handleFinalizarManutencao = async () => {
        const object = {
            emManutencao: false,
            motivo: "",
            tempo: ""
        }
        await alterarStatusPlataforma(object, setUser, setModeOFF)
    }
    const handleIniciarManutencao = async () => {
        const object = {
            emManutencao: true,
            motivo: motivo,
            tempo: time
        }
        await alterarStatusPlataforma(object, setUser, setModeON)
        setMotivo("")
        setTime("")
    }

    return (
        <Stack spacing={2} sx={{
            width: "65%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "200px",
            marginTop: "10px"
        }}>
            {user?.manutencao?.emManutencao ?
                <>
                    <>
                        {modeOFF == "alterar"
                            ? <Button
                                variant='contained'
                                sx={{ marginTop: "120px" }}
                                onClick={handleFinalizarManutencao}
                            >
                                Finalizar Manutenção
                            </Button>
                            : <></>}
                        {modeOFF == "load" ? <LoadingManutencao  /> : <></>}
                        {modeOFF == "error" ? <ErroManutencao /> : <></>}
                        {modeOFF == "sucess" ? <SucessoManutencao /> : <></>}
                    </>

                </>
                : <>
                    <Typography variant='h5'>Iniciar Manutenção</Typography>
                    {motivo === "" || time == ""
                        ? <Typography
                            variant='p'
                            sx={{
                                fontSize: "9pt",
                                fontWeight: 600,
                                color: "red"
                            }}
                        >Preencha todos os campos!</Typography>
                        : <></>
                    }
                    <TextField
                        fullWidth
                        label="Motivo"
                        name="motivo"
                        onChange={e => { setMotivo(e.target.value) }}
                        type="text"
                        value={motivo}
                        autoComplete=''
                    />
                    <TextField
                        fullWidth
                        label="Tempo Estimado"
                        name="time  "
                        onChange={e => { setTime(e.target.value) }}
                        type="text"
                        value={time}
                        autoComplete=''
                    />
                    {motivo != "" && time != ""
                        ? <>
                            {modeON == "alterar"
                                ? <Button
                                    variant='contained'
                                    onClick={handleIniciarManutencao}
                                >
                                    Iniciar Manutenção
                                </Button>
                                : <></>}
                            {modeON == "load" ? <LoadingManutencao /> : <></>}
                            {modeON == "error" ? <ErroManutencao /> : <></>}
                            {modeON == "sucess" ? <SucessoManutencao /> : <></>}
                        </>
                        : <></>

                    }
                </>
            }
        </Stack>
    )
}
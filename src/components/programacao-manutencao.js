import { Stack, Typography, TextField, Button } from "@mui/material"
import { useEffect, useState, useContext } from "react"
import { ErroManutencao, SucessoManutencao, LoadingManutencao } from "./status-atualizacao-manutencao"
import { alterarStatusPlataforma, programacaoPlataforma } from "src/util/util-admin"
import { UserContext } from "src/contexts/user-context"

export const ProgramacaoManutencao = () => {
    const { user, loadUser, setUser } = useContext(UserContext)
    const [motivo, setMotivo] = useState("")
    const [time, setTime] = useState("")
    const [data, setData] = useState("")
    const [horario, setHorario] = useState("")
    const [modeON, setModeON] = useState("alterar")
    const [modeOFF, setModeOFF] = useState("alterar")

    useEffect(() => {
        loadUser()
    }, [])

    const handleEncerrarProgramacao = async () => {
        const object = {
            programada: false,
            motivo: "",
            duracao: "",
            horario: "",
            data: ""
        }
        await programacaoPlataforma(object, setUser, setModeOFF)
    }
    const handleProgramarManutencao = async () => {
        const object = {
            programada: true,
            motivo: motivo,
            duracao: time,
            horario: horario,
            data: data
        }
        await programacaoPlataforma(object, setUser, setModeON)
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
            {user?.manutencaoProgramada?.programada ?
                <>
                    <>
                        {modeOFF == "alterar"
                            ? <Button
                                variant='contained'
                                sx={{ marginTop: "120px" }}
                                onClick={handleEncerrarProgramacao}
                            >
                                Desativar Programação
                            </Button>
                            : <></>}
                        {modeOFF == "load" ? <LoadingManutencao /> : <></>}
                        {modeOFF == "error" ? <ErroManutencao /> : <></>}
                        {modeOFF == "sucess" ? <SucessoManutencao /> : <></>}
                    </>

                </>
                : <>
                    <Typography variant='h5'>Programar Manutenção</Typography>
                    {motivo === "" || time == "" || horario == "" || data == ""
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
                    <TextField
                        fullWidth
                        label="Data"
                        name="motivo"
                        onChange={e => { setData(e.target.value) }}
                        type="text"
                        value={data}
                        autoComplete=''
                    />
                    <TextField
                        fullWidth
                        label="Horário"
                        name="time  "
                        onChange={e => { setHorario(e.target.value) }}
                        type="text"
                        value={horario}
                        autoComplete=''
                    />
                    {motivo != "" && time != ""
                        ? <>
                            {modeON == "alterar"
                                ? <Button
                                    variant='contained'
                                    onClick={handleProgramarManutencao}
                                >
                                    Programar Manutenção
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
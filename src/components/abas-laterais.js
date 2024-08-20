import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';

export const Processador = (props) => {
    const { server, grafico, setGrafico } = props
    const style = {
        background: grafico == "cpu" ? "#fab4c8" : "#ffffff",
        width: "80%",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer"
    }
    useEffect(() => {

    }, [server])
    return (
        <Stack direction={`row`}
            spacing={2}
            sx={style}
            onClick={() => { setGrafico("cpu") }}
        >
            <Stack>
                <img
                    className='imagem-auth'
                    alt=""
                    src="/assets/processador.png"
                    width={60}
                    height={60}
                />
            </Stack>
            <Stack direction={`column`}>
                <Typography>CPU</Typography>
                <Typography sx={{ fontSize: "12pt", fontWeight: 600 }}>{`${server?.processador?.uso == undefined ? 0 : parseFloat(server?.processador?.uso).toFixed(0)} %`}</Typography>
            </Stack>
        </Stack>
    )
}

export const Memoria = (props) => {
    const { server, grafico, setGrafico } = props
    const style = {
        background: grafico == "ram" ? "#fab4c8" : "#ffffff",
        width: "80%",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer"
    }

    return (
        <Stack
            direction={`row`}
            spacing={2}
            sx={style}
            onClick={() => { setGrafico("ram") }}
        >
            <Stack>
                <img
                    className='imagem-auth'
                    alt=""
                    src="/assets/memoria-ram.png"
                    width={60}
                    height={60}
                />
            </Stack>
            <Stack direction={`column`}>
                <Typography>Memória</Typography>
                <Typography sx={{ fontSize: "12pt", fontWeight: 600 }}>
                    {`
                    ${server?.memoria?.emUso == undefined ? `0.0` : parseFloat(server?.memoria?.emUso).toFixed(1)}/
                    ${server?.memoria?.total == undefined ? `0.0` : parseFloat(server?.memoria?.total).toFixed(1)} GB 
                    (${server?.memoria?.percEmUso == undefined ? `0` : parseFloat(server?.memoria?.percEmUso).toFixed(0)}%)
                    `}
                </Typography>
            </Stack>
        </Stack>
    )
}

export const StatusPlataforma = (props) => {
    const { manutencao, grafico, setGrafico } = props
    const style = {
        background: grafico == "status-plataforma" ? "#fab4c8" : "#ffffff",
        width: "80%",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer"
    }
    return (
        <Stack
            direction={`row`}
            spacing={2}
            sx={style}

            onClick={() => { setGrafico("status-plataforma") }}
        >
            <Stack sx={{ height: "100%", justifyContent: "center" }}>
                <img
                    className='imagem-auth'
                    alt=""
                    src="/assets/servidor.png"
                    width={60}
                    height={60}
                />
            </Stack>
            <Stack direction={`column`}>
                <Typography>Plataforma</Typography>
                <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>
                    Status: {manutencao?.emManutencao ? "Em manutenção" : "Ativa"}
                </Typography>
                {manutencao?.emManutencao
                    ?
                    <>
                        <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>Motivo: {manutencao?.motivo}</Typography>
                        <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>Tempo Estimado: {manutencao?.tempo}</Typography>
                    </>
                    : <></>
                }
            </Stack>
        </Stack>
    )
}


export const ManutencaoProgramada = (props) => {
    const { programacao, grafico, setGrafico } = props
    const style = {
        background: grafico == "programacao" ? "#fab4c8" : "#ffffff",
        width: "80%",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
        alignItems: "center"
    }
    return (
        <Stack
            direction={`row`}
            spacing={2}
            sx={style}

            onClick={() => { setGrafico("programacao") }}
        >
            <Stack sx={{ height: "100%", justifyContent: "center" }}>
                <img
                    className='imagem-auth'
                    alt=""
                    src="/assets/script.png"
                    width={60}
                    height={60}
                />
            </Stack>
            <Stack direction={`column`}>
                <Typography>Manut. Programadas</Typography>
                <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>
                    Status: {programacao?.programada ? "Agendada" : "Nenhuma"}
                </Typography>
                {programacao?.programada
                    ?
                    <>
                        <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>Motivo: {programacao?.motivo}</Typography>
                        <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>Tempo Estimado: {programacao?.duracao}</Typography>
                        <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>Data: {programacao?.data}</Typography>
                        <Typography sx={{ fontSize: "10pt", fontWeight: 600 }}>Horário: {programacao?.horario}</Typography>
                    </>
                    : <></>
                }
            </Stack>
        </Stack>
    )
}

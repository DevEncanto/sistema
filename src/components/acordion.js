import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Typography, Avatar, Stack, Divider, Paper, TableContainer } from '@mui/material';
import ExpandMoreIcon from '@heroicons/react/24/solid/ChevronUpIcon';
import { SeverityPill } from './severity-pill';
import formatSaldo from 'src/utils/formatarSaldos';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { useMemo } from 'react';

export const Acordion = (props) => {
    const { usuarios = [], usuario } = props
    const dificuldade = {
        medio: 'warning',
        facil: 'success',
        dificil: 'error'
    }

    const usuariosFiltrados = useMemo(() => {
        const buscaUsuario = usuario.toLowerCase()
        const filter = usuarios.filter((item) =>
            item.usuario.toLowerCase().includes(buscaUsuario))

        return buscaUsuario === "" ? usuarios : filter
    }, [usuario, usuarios])

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 422, ...sxCardScrollPersonalizada }}>
                {
                    usuariosFiltrados.map((item, index) => {
                        return (
                            <Accordion
                                key={`acordion${index}`}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Stack
                                        spacing={2}
                                        direction="row"
                                        sx={{ alignItems: "center" }}
                                    >
                                        <Avatar
                                            src={`/assets/avatars${item.avatar}`}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                        <Typography>{item?.usuario}</Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails
                                    sx={{ paddingLeft: "90px" }}
                                >
                                    <Stack direction={"row"} spacing={1}>
                                        <Typography>
                                            {`ID do usuário: `}

                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }} >{item?.idUsuario}</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={1}>
                                        <Typography>
                                            {`Token de Confirmação: `}

                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }} >{item?.token}</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={1}>
                                        <Typography>
                                            {`Desafios: `}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }} >{item?.desafios}</Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={1}>
                                        <Typography>
                                            {`Última Dificuldade: `}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }} >
                                            {
                                                item?.ultimaDificuldade == ""
                                                    ? <SeverityPill color={`primary`}>--</SeverityPill>
                                                    : <SeverityPill color={dificuldade[item?.ultimaDificuldade]}>{usuario?.ultimaDificuldade?.toUpperCase()}</SeverityPill>
                                            }
                                        </Typography>
                                    </Stack>
                                    <Stack direction={"row"} spacing={1} sx={{ marginBottom: "10px" }}>
                                        <Typography>
                                            {`Valor: `}
                                        </Typography>
                                        <Typography sx={{ fontWeight: 600 }} >{`R$ ${formatSaldo(item?.valor == undefined ? 0 : parseFloat(item?.valor), 2)}`}</Typography>
                                    </Stack>
                                    <Divider color="#e8e8e8" sx={{ height: 4 }} />
                                    <Stack>
                                        {
                                            item?.subcontas?.map((subconta, index) => {
                                                return (
                                                    <Accordion
                                                        key={`subAcordion${index}`}
                                                    >
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls="panel1a-content"
                                                            id="panel1a-header"
                                                        >
                                                            <Stack
                                                                spacing={2}
                                                                direction="row"
                                                                sx={{ alignItems: "center" }}
                                                            >
                                                                <Avatar
                                                                    src={`/assets/avatars${item?.avatar}`}
                                                                    sx={{ width: 56, height: 56 }}
                                                                />
                                                                <Typography>{`${item?.usuario}#${subconta?.idSubUsuario}`}</Typography>
                                                            </Stack>
                                                        </AccordionSummary>
                                                        <AccordionDetails
                                                            sx={{ paddingLeft: "90px" }}
                                                        >
                                                            <Stack direction={"row"} spacing={1}>
                                                                <Typography>
                                                                    {`ID do SubUsuário: `}

                                                                </Typography>
                                                                <Typography sx={{ fontWeight: 600 }} >{subconta?.idSubUsuario}</Typography>
                                                            </Stack>
                                                            <Stack direction={"row"} spacing={1}>
                                                                <Typography>
                                                                    {`Rota de Desafios: `}

                                                                </Typography>
                                                                <Typography sx={{ fontWeight: 600 }} >{subconta?.rota}</Typography>
                                                            </Stack>
                                                            <Stack direction={"row"} spacing={1}>
                                                                <Typography>
                                                                    {`Clicks na Rota: `}
                                                                </Typography>
                                                                <Typography sx={{ fontWeight: 600 }} >{subconta?.clicks}</Typography>
                                                            </Stack>
                                                            <Stack direction={"row"} spacing={1}>
                                                                <Typography>
                                                                    {`Desafios: `}
                                                                </Typography>
                                                                <Typography sx={{ fontWeight: 600 }} >{subconta?.desafios}</Typography>
                                                            </Stack>
                                                            <Stack direction={"row"} spacing={1}>
                                                                <Typography>
                                                                    {`IP: `}
                                                                </Typography>
                                                                <Typography sx={{ fontWeight: 600 }} >{subconta?.ip}</Typography>
                                                            </Stack>
                                                            <Stack direction={"row"} spacing={1}>
                                                                <Typography>
                                                                    {`Status: `}
                                                                </Typography>
                                                                <Typography sx={{ fontWeight: 600 }} >{subconta?.status == "PL" ? "Pulada" : "Disponível"}</Typography>
                                                            </Stack>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                )
                                            })
                                        }
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                }
            </TableContainer>
        </Paper>


    )
}

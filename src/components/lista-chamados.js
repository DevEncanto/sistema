import { Paper, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button, Stack } from '@mui/material';
import formatSaldo from 'src/utils/formatarSaldos';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';
import { alterarChamado, pagarEstornarSaque } from 'src/util/util-admin';
import ChatBubbleLeftRightIcon from '@heroicons/react/24/solid/ChatBubbleOvalLeftEllipsisIcon';
import { useEffect } from 'react';
import { formatarIDChamado } from 'src/utils/formatador-id-chamado';
import { formatarData } from 'src/utils/formatar-datas-createdAt';


export const ListaChamados = (props) => {
    const { items = [], setView, setUser, setChamadoSelecionado, user, setChat, type = "user" } = props;
    const style = { textAlign: "center" }
    useEffect(() => {

    }, [user])
    const statusChamado = {
        PENDENTE: 'warning',
        FINALIZADO: 'success'
    }

    const handleAlterarStatusChamado = async (idChamado, status) => {
        await alterarChamado(idChamado, status, setUser)
    }



    const handleChat = (chamado) => {
        setChamadoSelecionado(chamado)
        setView("chat")
        setChat(true)
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 480, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={style}>
                                ID Chamado
                            </TableCell>
                            <TableCell sx={style}>
                                Data
                            </TableCell>
                            <TableCell sx={style}>
                                Motivo
                            </TableCell>
                            <TableCell sx={style}>
                                Status
                            </TableCell>
                            <TableCell sx={style}>
                                ação
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {items.map((chamado, index) => {

                            return (
                                <TableRow
                                    hover
                                    key={index}

                                >
                                    <TableCell sx={style}>
                                        {formatarIDChamado(chamado?.idChamado?.toString())}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        {formatarData(chamado?.createdAt)}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        {chamado?.motivo}
                                    </TableCell>

                                    <TableCell sx={style}>
                                        <SeverityPill color={statusChamado[chamado?.status]}>
                                            {chamado?.status}
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell sx={style}>

                                        <Button
                                            sx={{ background: "none" }}
                                            onClick={() => { handleChat(chamado) }}
                                        >
                                            <ChatBubbleLeftRightIcon />
                                        </Button>
                                        {type == "admin" && chamado.status == "PENDENTE"
                                            ? <Button
                                                variant='contained'
                                                sx={{ marginLeft: "30px" }}
                                                onClick={() => { handleAlterarStatusChamado(chamado?.idChamado, "FINALIZADO") }}
                                            >
                                                Finalizar
                                            </Button>
                                            : <></>
                                        }
                                        {type == "admin" && chamado.status == "FINALIZADO"
                                            ? <Button
                                                variant='contained'
                                                sx={{ marginLeft: "30px" }}
                                                onClick={() => { handleAlterarStatusChamado(chamado?.idChamado, "PENDENTE") }}
                                            >
                                                Reabrir
                                            </Button>
                                            : <></>
                                        }
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );

};




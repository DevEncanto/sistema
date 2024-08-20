import { Paper, Stack, TableContainer, Button, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';
import formatSaldo from "../utils/formatarSaldos"
import { formatarData } from 'src/utils/formatar-datas-createdAt';
import { useMemo } from 'react';
import { alterarRecebimento } from 'src/util/util-admin';

export const Recebimentos = (props) => {
    const { items = [], recebimento = "", setUser } = props;
    const style = { textAlign: "center" }

    const tipoLancamento = {
        "À RECEBER": 'warning',
        "RECEBIDO": 'success',
        CANCELADO: 'error'
    }

    const handleAlterarStatusRecebimento = async (idRecebimento, status, descricao) => {
        await alterarRecebimento(idRecebimento, status, setUser, descricao)
    }

    const recebimentosFiltrados = useMemo(() => {

        const buscarRecebimento = recebimento == "TODOS" ? "" : recebimento.toLowerCase()
        const filter = items.filter((item) =>
            item.status.toLowerCase().includes(buscarRecebimento))

        return buscarRecebimento === "" ? items : filter
    }, [recebimento, items])

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 275, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={style}>
                                id
                            </TableCell>
                            <TableCell sx={style}>
                                data
                            </TableCell>
                            <TableCell sx={style}>
                                valor
                            </TableCell>
                            <TableCell sx={style}>
                                descrição
                            </TableCell>
                            <TableCell sx={style}>
                                Status
                            </TableCell>
                            <TableCell sx={style}>
                                Ações
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {recebimentosFiltrados.map((recebimento, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`saque${index}`}

                                >
                                    <TableCell sx={style}>
                                        {recebimento.idRecebimento}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        {formatarData(recebimento.createdAt)}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill
                                            isBackground={true}
                                            color={tipoLancamento[recebimento.status]}
                                        >
                                            {`R$ ${formatSaldo(parseFloat(recebimento.valor), 2)}`}
                                        </SeverityPill>

                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill
                                            isBackground={false}
                                            color={`neutral`}
                                        >
                                            {`${recebimento.tipo} - ${recebimento.origem} `}
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill
                                            isBackground={true}
                                            color={tipoLancamento[recebimento.status]}
                                        >
                                            {recebimento.status}
                                        </SeverityPill>

                                    </TableCell>
                                    <TableCell sx={style}>
                                        {recebimento.status == "À RECEBER"
                                            ? <Stack
                                                direction={`row`}
                                                spacing={2}
                                                sx={{ alignItems: "center", justifyContent: "center" }}
                                            >
                                                <Button
                                                    sx={{ height: "30px", cursor: "pointer", width: "90px", fontSize: "12px" }}
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => {
                                                        handleAlterarStatusRecebimento(
                                                            recebimento.idRecebimento,
                                                            "RECEBIDO",
                                                            `${recebimento.tipo} - ${recebimento.origem}`
                                                        )
                                                    }}
                                                >
                                                    CONFIRMAR
                                                </Button>
                                                <Button
                                                    sx={{ height: "30px", cursor: "pointer", width: "90px", fontSize: "12px" }}
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        handleAlterarStatusRecebimento(
                                                            recebimento.idRecebimento,
                                                            "CANCELADO",
                                                            `${recebimento.tipo} - ${recebimento.origem}`
                                                        )
                                                    }}
                                                >
                                                    CANCELAR
                                                </Button>
                                            </Stack>
                                            : <></>}

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

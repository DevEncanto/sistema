import { Paper, TableContainer, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';
import formatSaldo from "../utils/formatarSaldos"
import { pagarEstornarSaque } from 'src/util/util-admin';
import { formatarData } from 'src/utils/formatar-datas-createdAt';
import { parse } from 'path';

export const FluxoCaixa = (props) => {
    const { items = [], setUser, maxHeight } = props;
    const style = { textAlign: "center" }
    let saldo = 0
    const tipoLancamento = {
        ENTRADA: 'success',
        SAIDA: 'error',
        LANC: 'neutral',
        SALDO: 'primary'
    }
    const handleAlterarStatusSaque = async (idSaque, idUsuario, valor, status) => {
        await pagarEstornarSaque(idSaque, status, valor, idUsuario, setUser, "user")
    }
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={style}>
                                id lançamento
                            </TableCell>
                            <TableCell sx={style}>
                                data
                            </TableCell>
                            <TableCell sx={style}>
                                entrada
                            </TableCell>
                            <TableCell sx={style}>
                                saida
                            </TableCell>
                            <TableCell sx={style}>
                                descrição
                            </TableCell>
                            <TableCell sx={style}>
                                saldo do caixa
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {items.map((lancamento, index) => {
                            saldo += lancamento.entrada
                                ? parseFloat(lancamento.entrada)
                                : parseFloat(lancamento.saida) * -1
                            return (
                                <TableRow
                                    hover
                                    key={`saque${index}`}

                                >
                                    <TableCell sx={style}>
                                        {lancamento.idLancamento}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        {lancamento.dataEntrada
                                            ? formatarData(lancamento.dataEntrada)
                                            : formatarData(lancamento.dataSaida)
                                        }

                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill color={tipoLancamento['ENTRADA']}>
                                            {lancamento.entrada
                                                ? `R$ ${formatSaldo(lancamento.entrada, 2)}`
                                                : ""
                                            }
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill color={tipoLancamento['SAIDA']}>
                                            {lancamento.saida
                                                ? `R$ ${formatSaldo(lancamento.saida, 2)}`
                                                : ""
                                            }
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill color={tipoLancamento['LANC']}>
                                            {lancamento.descricao}
                                        </SeverityPill>
                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill color={tipoLancamento['SALDO']}>
                                            {`R$ ${formatSaldo(saldo, 2)}`}
                                        </SeverityPill>

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

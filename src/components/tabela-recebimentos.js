import { Paper, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button, Stack } from '@mui/material';
import formatSaldo from 'src/utils/formatarSaldos';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';
import { pagarEstornarSaque } from 'src/util/util-admin';

export const TabelaRecebimentos = (props) => {
    const { items = [], selected = [], setUser, maxHeight = 480 } = props;
    const style = { textAlign: "center" }   
    const statusConta = {
        PENDENTE: 'warning',
        PAGO: 'success',
        CANCELADO: 'error',
    }

    const handleAlterarStatusSaque = async (idSaque, idUsuario, valor, status) => {
        await pagarEstornarSaque(idSaque, status, valor, idUsuario, setUser)
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={style}>
                                ID Recebimento
                            </TableCell>
                            <TableCell sx={style}>
                                Data
                            </TableCell>
                            <TableCell sx={style}>
                                Valor
                            </TableCell>
                            <TableCell sx={style}>
                                Status
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {items.map((saque, index) => {

                            return (
                                <TableRow
                                    hover
                                    key={`saquetab${index + 1}`}

                                >

                                    <TableCell sx={style}>

                                        {saque.nome}

                                    </TableCell>
                                    <TableCell sx={style}>
                                        {saque.data}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        {saque.pix}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        {saque.banco}
                                    </TableCell>
                                    {/* <TableCell sx={style}>
                                        {saque.recebedor}
                                    </TableCell> */}
                                    <TableCell sx={style}>
                                        R$ {formatSaldo(saque.valor, 2)}
                                    </TableCell>
                                    <TableCell sx={style}>
                                        <SeverityPill color={statusConta[saque.status]}>
                                            {saque.status}
                                        </SeverityPill>
                                    </TableCell>

                                    <TableCell sx={{ alignItems: "center" }}>
                                        {saque.status == "PENDENTE"
                                            ? <Stack
                                                direction={`column`}
                                                spacing={2}
                                                sx={{ alignItems: "center", justifyContent: "center" }}
                                            >
                                                <Button
                                                    sx={{ width: "100px" }}
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => {
                                                        handleAlterarStatusSaque(
                                                            saque.idSaque,
                                                            saque.idUsuario,
                                                            saque.valor,
                                                            "PAGO"
                                                        )
                                                    }}
                                                >
                                                    PAGAR
                                                </Button>
                                                <Button
                                                    sx={{ width: "100px" }}
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => {
                                                        handleAlterarStatusSaque(
                                                            saque.idSaque,
                                                            saque.idUsuario,
                                                            saque.valor,
                                                            "CANCELADO"
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




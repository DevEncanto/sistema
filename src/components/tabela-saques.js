import { Paper, Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Button, Stack } from '@mui/material';
import formatSaldo from 'src/utils/formatarSaldos';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';

export const TabelaSaques = (props) => {

    const { items = [], handleModal, maxHeight = 480 } = props;
    const style = { textAlign: "center" }

    const statusConta = {
        PENDENTE: 'warning',
        PAGO: 'success',
        CANCELADO: 'error',
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={style}>
                                Usuário
                            </TableCell>
                            <TableCell sx={style}>
                                Data
                            </TableCell>
                            <TableCell sx={style}>
                                PIX
                            </TableCell>
                            <TableCell sx={style}>
                                Banco
                            </TableCell>
                            <TableCell sx={style}>
                                Valor
                            </TableCell>
                            <TableCell sx={style}>
                                status
                            </TableCell>
                            <TableCell sx={style}>
                                Ações
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
                                                    sx={{ height: "30px", cursor: "pointer", width: "80px", fontSize: "11px" }}
                                                    variant="contained"
                                                    color="success"
                                                    onClick={() => { handleModal(saque, "realizarPag") }}
                                                >
                                                    PAGAR
                                                </Button>
                                                <Button
                                                    sx={{ height: "30px", cursor: "pointer", width: "80px", fontSize: "11px" }}
                                                    variant="contained"
                                                    color="error"
                                                    onClick={() => { handleModal(saque, "cancelarPag") }}
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




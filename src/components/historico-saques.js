import { Paper,TableContainer, Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';
import formatSaldo from "../utils/formatarSaldos"
import { pagarEstornarSaque } from 'src/util/util-admin';

export const HistoricoSaques = (props) => {
    const { items = [], setUser } = props;
    const style = { textAlign: "center" }

    const statusSaque = {
        PENDENTE: 'warning',
        PAGO: 'success',
        CANCELADO: 'error'
    }
    const handleAlterarStatusSaque = async (idSaque, idUsuario, valor, status) => {
        await pagarEstornarSaque(idSaque, status, valor, idUsuario, setUser, "user")
    }
    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 480, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={style}>
                                Data
                            </TableCell>
                            <TableCell sx={style}>
                                Valor
                            </TableCell>
                            <TableCell sx={style}>
                                Chave Pix
                            </TableCell>
                            <TableCell sx={style}>
                                Banco
                            </TableCell>
                            <TableCell sx={style}>
                                Recebedor
                            </TableCell>
                            <TableCell sx={style}>
                                Status
                            </TableCell>
                            <TableCell sx={style}>
                                Ação
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                    {items.map((saque, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            key={`saque${index}`}
    
                                        >
                                            <TableCell sx={style}>
                                                {saque.data}
                                            </TableCell>
                                            <TableCell sx={style}>
    
                                                {`R$ ${formatSaldo(parseFloat(saque.valor))}`}
    
                                            </TableCell>
                                            <TableCell sx={style}>
                                                {saque.pix}
                                            </TableCell>
                                            <TableCell sx={style}>
                                                {saque.banco}
                                            </TableCell>
                                            <TableCell sx={style}>
                                                {saque.recebedor}
                                            </TableCell>
                                            <TableCell sx={style}>
                                                <SeverityPill color={statusSaque[saque.status]}>
                                                    {saque.status}
                                                </SeverityPill>
                                            </TableCell>
                                            <TableCell sx={style}>
                                                {saque.status == "PENDENTE" ?
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
                                                    </Button> : <>  </>
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

import formatSaldo from 'src/utils/formatarSaldos';
import { useMemo } from 'react';
import {
    Paper,
    Avatar,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@mui/material';

import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';

export const ListaRanking = (props) => {
    const { items = [], usuario } = props;
    const sx = { textAlign: "center" }

    const usuariosFiltrados = useMemo(() => {
        const buscaUsuario = usuario.toLowerCase()
        const filter = items.filter((item) =>
            item.usuario.toLowerCase().includes(buscaUsuario))

        return buscaUsuario === "" ? items : filter
    }, [usuario, items])

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 480, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Posição
                            </TableCell>
                            <TableCell sx={sx}>

                            </TableCell>
                            <TableCell sx={sx}>
                                Usuário
                            </TableCell>
                            <TableCell sx={sx}>
                                Desafios
                            </TableCell>
                            <TableCell sx={sx}>
                                Valor
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {usuariosFiltrados.map((customer, index) => {

                            return (
                                <TableRow
                                    hover
                                    key={index}
                                >
                                    <TableCell >
                                        {`${index + 1}º`}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        <Avatar
                                            src={`/assets/avatars/${customer.avatar}`}
                                            sx={{ width: 56, height: 56 }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ ...sx, fontWeight: 600 }}>
                                        {customer.usuario}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {customer.desafios}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {typeof (customer.valor) == "string"
                                            ? ""
                                            : `R$ ${formatSaldo(customer.valor, 3)}`
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

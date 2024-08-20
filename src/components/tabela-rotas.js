import {
    Box, Card, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Button, Stack, Paper
} from '@mui/material';
import { SeverityPill } from 'src/components/severity-pill';
import formatSaldo from 'src/utils/formatarSaldos';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';

import { routes } from './config-componentes/config-rotas';
import { Fragment } from 'react';
export const TabelaRotas = (props) => {
    const { items = [], selected = [], setUser } = props;
    const style = { textAlign: "center" }
    const statusConta = {
        medio: 'warning',
        facil: 'success',
        dificil: 'error'
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 450, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={style}>
                                Rota
                            </TableCell>
                            <TableCell sx={style}>
                                Dificuldade
                            </TableCell>
                            <TableCell sx={style}>
                                Link
                            </TableCell>
                            <TableCell sx={style}>
                                Redirecionamento
                            </TableCell>
                            <TableCell sx={style}>
                                Valor
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {
                            items.map((item, index) => {
                                return (
                                    <Fragment key={`div${index}`}>
                                        {
                                            routes.map((route, index) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        key={`row${index}`}
                                                    >
                                                        <TableCell sx={style}>

                                                            {item.nRota}

                                                        </TableCell>
                                                        <TableCell sx={style}>
                                                            <SeverityPill color={statusConta[route.dificuldade]}>
                                                                {route.dificuldade}
                                                            </SeverityPill>
                                                        </TableCell>
                                                        <TableCell sx={style}>
                                                            {item[route.nome]}
                                                        </TableCell>
                                                        <TableCell sx={style}>
                                                            {route.rota}
                                                        </TableCell>
                                                        <TableCell sx={style}>
                                                            R$ {formatSaldo(parseFloat(route.valor), 3)}
                                                        </TableCell>

                                                    </TableRow>
                                                )

                                            })
                                        }
                                    </Fragment>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}








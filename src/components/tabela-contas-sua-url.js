import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button,
    Stack
} from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';

import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import NoSymbolIcon from '@heroicons/react/24/solid/NoSymbolIcon'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'
import { SeverityPill } from 'src/components/severity-pill';
import { alterarStatus } from 'src/util/util-admin';
import { useMemo } from 'react';
import formatSaldo from 'src/utils/formatarSaldos';

export const TabelaContasSuaURL = (props) => {
    const { contas = [], conta = "", maxHeight = 400 } = props;
    const sx = { textAlign: "center" }

    const contasFiltradas = useMemo(() => {
        const buscaConta = conta.toLowerCase()
        const filter = contas.filter((item) =>
            item.email.toLowerCase().includes(buscaConta))

        return buscaConta === "" ? contas : filter
    }, [conta, contas])

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={sx}>
                                ID Conta
                            </TableCell>
                            <TableCell sx={sx}>
                                E-mail
                            </TableCell>
                            <TableCell sx={sx}>
                                Saldo
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {contasFiltradas.map((conta) => {
                            return (
                                <TableRow
                                    hover
                                    key={conta.idConta}
                                >
                                    <TableCell sx={sx}>
                                        {conta.idConta}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {conta.email}

                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {`R$ ${formatSaldo(conta.saldo, 2)}`}
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

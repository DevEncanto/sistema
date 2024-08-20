import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Fab,
    Stack
} from '@mui/material';
import { sxCardScrollPersonalizada } from '../../components/config-componentes/config-imagens-perfil';

import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import NoSymbolIcon from '@heroicons/react/24/solid/NoSymbolIcon'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'
import { SeverityPill } from 'src/components/severity-pill';
import { alterarStatus } from 'src/util/util-admin';
import { useContext, useMemo } from 'react';
import { celulasEntradas, celulasParcelas, entradaInsumos, insumos } from './data';
import { UserContext } from '../../contexts/user-context';
import formatSaldo from '../../utils/formatarSaldos';


export const TabelaParcelas = (props) => {

    const sx = { textAlign: "center" }
    const { formularioEntrada, parcelar, maxHeight = 200, minHeight = 200 } = useContext(UserContext)


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, minHeight: minHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasParcelas.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {formularioEntrada.parcelamentos.map((parcela, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`parcela_${index + 1}`}
                                >
                                    <TableCell sx={sx}>
                                        {parcela.id_parcela}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {parcela.vencimento}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {`R$ ${formatSaldo(parcela.valor)}`}
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

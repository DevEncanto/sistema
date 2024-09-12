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
import { sxCardScrollPersonalizada } from '../../../components/config-componentes/config-imagens-perfil';

import ArrowPathIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import NoSymbolIcon from '@heroicons/react/24/solid/NoSymbolIcon'
import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'
import { SeverityPill } from 'src/components/severity-pill';
import { alterarStatus } from 'src/util/util-admin';
import { useContext, useMemo } from 'react';
import { celulasEntradas, celulasParcelas, entradaInsumos, insumos } from '../data';
import { UserContext } from '../../../contexts/user_context/user_context';
import formatSaldo from '../../../utils/formatarSaldos';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';


export const TabelaParcelas = (props) => {

    const sx = { textAlign: "center" }

    const {size} = props
    const { dados } = useContext(EstoqueContext)


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: size, minHeight: size, ...sxCardScrollPersonalizada }}>
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
                        {dados.entrada_insumo.parcelamentos.map((parcela, index) => {
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

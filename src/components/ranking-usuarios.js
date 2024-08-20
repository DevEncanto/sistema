
import formatSaldo from '../utils/formatarSaldos';

import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Avatar } from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
export const RankingUsuarios = (props) => {

    const { items = [], title } = props;
    const sx = {
        textAlign: "center"
    }

    const percentuais = (index) => {
        switch (index) {
            case 0: return 10;
            case 1: return 9;
            case 2: return 8;
            case 3: return 7;
            case 4: return 6;
            case 5: return 5;
            case 6: return 4;
            case 7: return 3;
            case 8: return 2;
            case 9: return 1;
            default: 0
        }
    }


    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 320, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell>
                                Posição
                            </TableCell>
                            <TableCell>

                            </TableCell>
                            <TableCell sx={sx}>
                                Usuário
                            </TableCell>
                            {/* <TableCell sx={sx}>
                                Desafios
                            </TableCell> */}
                            <TableCell sx={sx}>
                                Valor
                            </TableCell>
                            <TableCell sx={sx}>
                                Prêmio(%)
                            </TableCell>
                            <TableCell sx={sx}>
                                Valor do Prêmio
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {items.map((customer, index) => {

                            return (
                                <TableRow
                                    hover
                                    key={index}
                                >
                                    <TableCell >
                                        {`${index + 1}º`}
                                    </TableCell>
                                    <TableCell>
                                        <Avatar
                                            src={`/assets/avatars/${customer.avatar}`}
                                            sx={{ width: 45, height: 45 }}
                                        />
                                    </TableCell>
                                    <TableCell sx={{ ...sx, fontWeight: 600 }}>
                                        {customer.usuario}
                                    </TableCell>
                                    {/* <TableCell sx={sx}>
                                        {customer.desafios}
                                    </TableCell> */}
                                    <TableCell sx={sx}>
                                        {typeof (customer.valor) == "string"
                                            ? ""
                                            : `R$ ${formatSaldo(customer.valor, 3)}`
                                        }
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {percentuais(index) > 0 ? `${percentuais(index)}%` : ""}
                                    </TableCell>

                                    <TableCell sx={sx}>
                                        {percentuais(index) > 0 ? `R$ ${formatSaldo((customer.valor * percentuais(index) / 100), 2)}` : ""}
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


import formatSaldo from '../utils/formatarSaldos';
import { formatarData } from 'src/utils/formatar-datas-createdAt';
import { SeverityPill } from './severity-pill';
import { Paper, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Avatar, Typography } from '@mui/material';
import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
export const HistoricoAcoesUsuarios = (props) => {

    const { items = [], title } = props;
    const sx = {
        textAlign: "center",
        fontSize: "10px",
        fontWeight: 600
    }

    const color = (item) => {
        if (item.includes("SAQUE")) {
            item = "saque"
        }
        let string = ""
        switch (item) {
            case 'facil': string = "warning"; break;
            case 'medio': string = "success"; break;
            case 'dificil': string = "error"; break;
            case 'ranking': string = "primary"; break;
            case 'indicacao': string = "platform"; break;
            case 'saque': string = "purple"; break;
        }
        return string
    }


    const textItem = (desafio) => {
        let string = ""
        switch (desafio) {
            case 'facil': string = "DESAFIO FÁCIL"; break;
            case 'medio': string = "DESAFIO MÉDIO"; break;
            case 'dificil': string = "DESAFIO DIFÍCIL"; break;
            case 'ranking': string = "RANKING PREMIADO"; break;
            case 'indicacao': string = "INDICAÇÃO PREMIADA"; break;
            default:
                string = desafio
        }
        return string
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 200, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table"
                    sx={{ background: "#000" }}
                >
                    <TableHead>
                        <TableRow key={`header`}>
                            <TableCell sx={{ ...sx, fontSize: "5px" }}>
                                Data
                            </TableCell>
                            <TableCell sx={sx}>
                                TIPO DE GANHO
                            </TableCell>
                            <TableCell sx={sx}>
                                valor
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
                                    <TableCell sx={sx}>
                                        {formatarData(customer?.createdAt)}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        <SeverityPill
                                            color={color(customer.desafio)}
                                            sx={{ fontSize: "10px" }}
                                        >
                                            {textItem(customer.desafio)}
                                        </SeverityPill>


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


import {

    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper, TableContainer,
} from '@mui/material';

import { sxCardScrollPersonalizada } from './config-componentes/config-imagens-perfil';
import { SeverityPill } from 'src/components/severity-pill';
import { Acordion } from './acordion';

export const ListaMapeamento = (props) => {
    const {
        items = [],
        title
    } = props;
    const dificuldade = {
        MEDIO: 'warning',
        FACIL: 'success',
        DIFICIL: 'error'
    }
    return (
        <Acordion />
        // <Paper sx={{ width: '100%' }}>
        //     <TableContainer sx={{ maxHeight: 480, ...sxCardScrollPersonalizada }}>
        //         <Table stickyHeader aria-label="sticky table">
        //             <TableHead>
        //                 <TableRow>
        //                     <TableCell>
        //                         ID USUÁRIO
        //                     </TableCell>
        //                     <TableCell>
        //                         USUÁRIO
        //                     </TableCell>
        //                     <TableCell>
        //                         ROTA
        //                     </TableCell>
        //                     <TableCell>
        //                         TOKEN
        //                     </TableCell>
        //                     <TableCell>
        //                         CLICKS
        //                     </TableCell>
        //                     <TableCell>
        //                         DIFICULDADE SELECIONADA
        //                     </TableCell>
        //                 </TableRow>
        //             </TableHead>
        //             <TableBody >
        //                 {items.map((customer, index) => {

        //                     return (
        //                         <TableRow
        //                             hover
        //                             key={index}
        //                         >
        //                             <TableCell>
        //                                 {customer.idUsuario}
        //                             </TableCell>
        //                             <TableCell>
        //                                 {customer.usuario}
        //                             </TableCell>
        //                             <TableCell>
        //                                 {customer.rota}
        //                             </TableCell>
        //                             <TableCell>
        //                                 {customer.token == "" ? "(Vazio)" : customer.token}
        //                             </TableCell>
        //                             <TableCell>
        //                                 {customer.clicks}
        //                             </TableCell>
        //                             <TableCell>


        //                             </TableCell>
        //                         </TableRow>
        //                     );
        //                 })}
        //             </TableBody>
        //         </Table>
        //     </TableContainer>
        // </Paper>
    );
}
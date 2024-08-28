import {
    Paper,
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
} from '@mui/material';
import { sxCardScrollPersonalizada } from '../../../components/config-componentes/config-imagens-perfil';

import { celulasEstoques, celulasLote } from '../data';
import { useContext, useEffect } from 'react';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';
import { DataContext } from '../../../contexts/data_context/data_context';

export const TabelaLotes = (props) => {

    const { gerenciarControle, funcoes } = useContext(EstoqueContext)
    const { controle, saveLocalStorage } = useContext(DataContext)
    const { maxHeight = 350 } = props
    const sx = { textAlign: "center" }

    useEffect(() => {
        saveLocalStorage()
    }, [])


    const selecionarLote = (lote, id_lote) => {
        let eLote = { target: { value: lote } }
        let eIndex = { target: { value: id_lote } }
        funcoes.gerenciarDadosEstoque("estoque", "lote", eLote)
        funcoes.gerenciarDadosEstoque("estoque", "id_lote", eIndex)
        funcoes.gerenciarControle("cadastroEstoque", "tabsEntrada", false)
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasLote.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {controle.lotes.map((lote, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`insumo${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {lote.id_lote}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {lote.nome}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        <Button
                                            sx={{
                                                fontSize: "13px"
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { selecionarLote(lote.nome, lote.id_lote) }}
                                        >
                                            Selecionar
                                        </Button>

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

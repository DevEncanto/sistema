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

import { celulasEstoques } from '../data';
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


    const selecionarEstoque = (estoque, id_estoque) => {
        let eEstoque = { target: { value: estoque } }
        let eIndex = { target: { value: id_estoque } }
        funcoes.gerenciarDadosEstoque("entrada_insumo", "estoque", eEstoque)
        funcoes.gerenciarDadosEstoque("entrada_insumo", "id_estoque", eIndex)
        gerenciarControle("cadastroEntradaInsumo", "tabsEntrada", false)
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasEstoques.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {controle.estoques.map((estoque, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`insumo${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {estoque.id_estoque}
                                    </TableCell>
                                    <TableCell sx={sx}>
                                        {estoque.nome}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        <Button
                                            sx={{
                                                fontSize: "13px"
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { selecionarEstoque(estoque.nome, estoque.id_estoque) }}
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

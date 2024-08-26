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
import { sxCardScrollPersonalizada } from '../../../components/config-componentes/config-imagens-perfil';

import { categoriasInsumos, celulasCategoriaInsumos } from '../data';
import { DataContext } from '../../../contexts/data_context/data_context';
import { useContext } from 'react';
import { EstoqueContext } from '../../../contexts/components_context/estoque_context';

export const TabelaCategoriaInsumos = (props) => {

    const sx = { textAlign: "center" }

    const { controle } = useContext(DataContext)
    const { gerenciarControle, funcoes } = useContext(EstoqueContext)

    const selecionarCategoria = (categoria, id_categoria_insumo) => {
        let eCategoria = { target: { value: categoria } }
        let eIndex = { target: { value: id_categoria_insumo } }
        funcoes.gerenciarDadosEstoque("insumo", "categoria", eCategoria)
        funcoes.gerenciarDadosEstoque("insumo", "id_categoria_insumo    ", eIndex)
        gerenciarControle("cadastroInsumo", "tabsEntrada", false)
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 350, ...sxCardScrollPersonalizada }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow key={`header`}>
                            {celulasCategoriaInsumos.map((celula, index) => {
                                return <TableCell sx={sx} key={index}>
                                    {celula}
                                </TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {controle.categorias_insumos.map((categoria, index) => {
                            return (
                                <TableRow
                                    hover
                                    key={`categoria${index}`}
                                >
                                    <TableCell sx={sx}>
                                        {categoria.id_categoria_insumo}
                                    </TableCell>
                                    <TableCell sx={sx}>

                                        {categoria.nome}

                                    </TableCell>
                                    <TableCell
                                        sx={sx}
                                    >
                                        <Button
                                            sx={{
                                                fontSize: "12px",
                                                padding: 1
                                            }}
                                            key={`btn_entrada`}
                                            variant='contained'
                                            onClick={() => { selecionarCategoria(categoria.nome, categoria.id_categoria_insumo) }}
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
        </Paper >
    );
};

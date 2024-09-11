import { TabelaEstoque } from "../tabelas/tabelas_estoque"

const { ModalEstoque } = require("./modal")

export const ModalCategoriaInsumo = () => {
    
    return (
        <ModalEstoque
            title={"Categoria dos Insumos"}
            destino={"cadastroInsumo"}
            width="520px"
        >
            <TabelaEstoque tabela="categorias_insumos"/>
        </ModalEstoque>
    )
}
import { TabelaCategoriaInsumos } from "../tabelas/tabela_categoria_insumos"
import { TabelaEstoques } from "../tabelas/tabela_estoques"
import { TabelaInsumos } from "../tabelas/tabela_insumos"

const { ModalEstoque } = require("./modal")

export const ModalTabelaEstoques = () => {
    return (
        <ModalEstoque
            title={"Estoques"}
            destino={"cadastroEntradaInsumo"}
            width="520px"
        >
            <TabelaEstoques maxHeight={380}/>
        </ModalEstoque>
    )
}
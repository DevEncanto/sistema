import { TabelaCategoriaInsumos } from "../tabelas/tabela_categoria_insumos"
import { TabelaInsumos } from "../tabelas/tabela_insumos"

const { ModalEstoque } = require("./modal")

export const ModalCategoriaInsumo = () => {
    return (
        <ModalEstoque
            title={"Categoria dos Insumos"}
            destino={"cadastroInsumo"}
            width="520px"
        >
            <TabelaCategoriaInsumos maxHeight={380}/>
        </ModalEstoque>
    )
}
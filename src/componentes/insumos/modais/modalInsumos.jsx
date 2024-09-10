import { TabelaInsumos } from "../tabelas/tabela_insumos"

const { ModalEstoque } = require("./modal")

export const ModalTabelaInsumos = () => {
    return (
        <ModalEstoque
            title={"Insumos"}
            destino={"cadastroEntradaInsumo"}
            width="520px"
        >
            <TabelaInsumos maxHeight={380}/>
        </ModalEstoque>
    )
}
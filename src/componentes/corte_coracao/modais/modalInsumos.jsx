import { TabelaInsumos } from "../tabelas/CONFIG_tabela_insumos"

const { ModalEstoque } = require("./modal")

export const ModalTabelaInsumos = () => {
    return (
        <ModalEstoque
            title={"Insumos"}
            destino={"cadastroEntradaInsumoI"}
            width="520px"
        >
            <TabelaInsumos maxHeight={380}/>
        </ModalEstoque>
    )
}
import { TabelaInsumos } from "../tabelas/tabela_insumos"

const { ModalEstoque } = require("./modal")

export const ModalTabelaInsumos = () => {
    return (
        <ModalEstoque
            title={"Insumos"}
            destino={"form"}
            width="520px"
        >
            <TabelaInsumos />
        </ModalEstoque>
    )
}
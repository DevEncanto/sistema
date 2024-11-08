import { TabelaEstoques } from "../tabelas/configuradas/tabela_estoques"

const { ModalEstoque } = require("./modal")

export const ModalTabelaEstoques = () => {
    return (
        <ModalEstoque
            title={"Estoques"}
            destino={"cadastroEntradaInsumoI"}
            width="580px"
        >
            <TabelaEstoques maxHeight={380}/>
        </ModalEstoque>
    )
}
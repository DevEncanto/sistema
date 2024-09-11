import { TabelaLotes } from "../tabelas/configuradas/tabela_lotes"

const { ModalEstoque } = require("./modal")

export const ModalTabelaLotes = () => {
    return (
        <ModalEstoque
            title={"Estoques"}
            destino={"cadastroEstoques"}
            width="520px"
        >
            <TabelaLotes maxHeight={380}/>
        </ModalEstoque>
    )
}
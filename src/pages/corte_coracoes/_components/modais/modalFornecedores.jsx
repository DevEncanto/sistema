import { TabelaFornecedores } from "../tabelas/configuradas/tabela_fornecedores"
import { TabelaEstoque } from "../tabelas/tabelas_estoque"

const { ModalEstoque } = require("./modal")

export const ModalTabelaFornecedores = () => {
    return (
        <ModalEstoque
            title={"Fornecedores Cadastrados"}
            destino={"cadastroEntradaInsumoI"}
            width="580px"
        >
            <TabelaEstoque tabela="fornecedores" maxHeight={380} />
        </ModalEstoque>
    )
}
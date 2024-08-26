import { TabelaFornecedores } from "../tabelas/tabela_fornecedores"

const { ModalEstoque } = require("./modal")

export const ModalTabelaFornecedores = () => {
    return (
        <ModalEstoque
            title={"Fornecedores Cadastrados"}
            destino={"cadastroFornecedores"}
            width="580px"
        >
            <TabelaFornecedores maxHeight={380}/>
        </ModalEstoque>
    )
}
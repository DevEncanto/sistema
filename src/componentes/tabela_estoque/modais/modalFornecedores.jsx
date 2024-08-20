import { TabelaFornecedores } from "../tabela_fornecedores"

const { ModalEstoque } = require("./modal")

export const ModalTabelaFornecedores = () => {
    return (
        <ModalEstoque
            title={"Fornecedores Cadastrados"}
            destino={"form"}
            width="580px"
        >
            <TabelaFornecedores maxHeight={380}/>
        </ModalEstoque>
    )
}
import { useContext } from "react"
import { TabelaEstoque } from "../tabelas/tabelas_estoque"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"
import { config_tables } from "../tabelas/configuracoes/config_tabela"

const { ModalEstoque } = require("./modal")

export const ModalTabelas = () => {

  const { controleEstoque } = useContext(EstoqueContext)

  return (
    <ModalEstoque
      {...config_tables[controleEstoque.tabela].modal}
    >
      <TabelaEstoque/>
    </ModalEstoque>
  )
}
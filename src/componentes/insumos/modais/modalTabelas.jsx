import { useContext } from "react"
import { TabelaCategoriaInsumos } from "../tabelas/tabela_categoria_insumos"
import { TabelaInsumos } from "../tabelas/tabela_insumos"
import { TabelaEstoque } from "../tabelas/tabelas_estoque"
import { EstoqueContext } from "../../../contexts/components_context/estoque_context"
import { config_tables } from "../tabelas/config_tabela"

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
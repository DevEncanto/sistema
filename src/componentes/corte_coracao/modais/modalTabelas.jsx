import { useContext } from "react"
import { CorteCoracaoContext } from "../../../contexts/corte.coracao.context"
import { config_tables } from "../../insumos/tabelas/configuracoes/config_tabela"

const { ModalEstoque } = require("./modal")

export const ModalTabelas = () => {

  const { cCorteCoracao } = useContext(CorteCoracaoContext)

  return (
    <ModalEstoque
      {...config_tables[cCorteCoracao.tabela].modal} 
    >
      <TabelaEstoque/>
    </ModalEstoque>
  )
}
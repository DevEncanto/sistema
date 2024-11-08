import { useContext, useEffect } from "react";
import { sxCardScrollPersonalizada } from "../../../components/config-componentes/config-imagens-perfil";
import { DataContext } from "../../../contexts/data_context/data_context";
import formatSaldo from "../../../utils/formatarSaldos";
import { config_tables } from "./configuracoes/config_tables";
import { CorteCoracaoContext } from "../../../contexts/corte.coracao.context";

const { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, listItemButtonClasses } = require("@mui/material");

export const TabelasCorteCoracao = ({ tabela, maxHeight = 350, dados = [], minHeigth = 0 }) => {
  const { controle, saveLocalStorage } = useContext(DataContext);
  const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext);
  const { header, body, sx } = config_tables[tabela ? tabela : cCorteCoracao.tabela];

  const data = tabela ? dados : controle[body.prop]

  useEffect(() => {

  }, []);


  const RenderContent = (props) => {
    const { content, item } = props

    let component = ""

    switch (content.type) {
      case "text":
        component = item[content.content]
        break;
      case "component":
        component = content.content(
          funcoes,
          body.functions[content.function],
          body.functions.gerarParametros(item, content.params)
        )
        break;
      case "componentExt":

        const data = content.params.map((p) => {
          return { [p]: item[p] }
        })
        component = content.content(data)
        break;
      case "moeda":
        component = `R$ ${formatSaldo(item[content.content] ? item[content.content] : 0, 2)}`
        break;
      case "number":
        component = formatSaldo(item[content.content] ? item[content.content] : 0, 2)
        break;
      case "blank":
        component = ""
        break
    }

    return component
  }

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ minHeight: minHeigth, maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map((celula, index) => (
                <TableCell sx={sx} key={index} colSpan={celula === "AÇÕES" ? 2 : 1}>
                  {celula}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow hover key={`${body.key}${index}`}>
                {body.contents.map((content, indexb) => (
                  <TableCell sx={sx} key={indexb}>
                    <RenderContent content={content} item={item} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

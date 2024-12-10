import { cloneElement, useContext, useEffect } from "react";
import { config_tables } from "../configuracoes/config_tables"
import { sxCardScrollPersonalizada } from "../../../../../components/config-componentes/config-imagens-perfil";
import { DataContext } from "../../../../../contexts/contexts/data.context";
import { CorteCoracaoContext } from "../../../../../contexts/contexts/corte.coracao.context";
import formatSaldo from "../../../../../utils/formatarSaldos";
import { SeverityPill } from "../../../../../components/severity-pill";
import { logger } from "../../../../../utils/logger";
const { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, listItemButtonClasses, Tooltip } = require("@mui/material");

export const TabelasCorteCoracao = ({ tabela, maxHeight = 350, dados = [], minHeigth = 0 }) => {
  const { dData } = useContext(DataContext);
  const { funcoes, cCorteCoracao } = useContext(CorteCoracaoContext);
  const { header, body, sx } = config_tables[tabela ? tabela : cCorteCoracao.tabela];

  const data = tabela ? dados : dData[body?.prop]

  useEffect(() => {

  }, [cCorteCoracao]);


  const RenderContent = (props) => {
    const { content, item, index } = props

    let component = ""

    switch (content.type) {
      case "text":
        component = item[content.content]
        break;

      case "colorText":

        const color = content.colors[item[content.content]]
      
        component =
          <SeverityPill
            isSeverityPill={content.isSeverityPill}
            color={color}>
            {item[content.content]}
          </SeverityPill>
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
      case "arrayComponent":
        const comps = content.components.map((Component, indexb) => {
          let data = {}
          content.params[indexb].forEach((param) => {
            if (param === "index") {
              data = { ...data, index: index }
            } else {
              data = { ...data, [param]: item[param] }
            }
          })
          return cloneElement(Component, data)
        })
        component = content.content(comps)
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
                <Tooltip title={celula.tooltip} placement="top" arrow>
                  <TableCell sx={sx} key={index} colSpan={celula === "AÇÕES" ? 2 : 1}>
                    {celula.title}
                  </TableCell>
                </Tooltip>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow hover key={`${body.key}${index}`}>
                {body.contents.map((content, indexb) => (
                  <TableCell sx={sx} key={indexb}>
                    <RenderContent content={content} item={item} index={item.id_media_cacho} />
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

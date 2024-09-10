import { useContext, useEffect } from "react";
import { sxCardScrollPersonalizada } from "../../../components/config-componentes/config-imagens-perfil";
import { config_tables } from "./config_tabela";
import { DataContext } from "../../../contexts/data_context/data_context";
import { EstoqueContext } from "../../../contexts/components_context/estoque_context";

const { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, listItemButtonClasses } = require("@mui/material");

export const TabelaEstoque = ({ tabela, maxHeight = 350 }) => {
  const { controle, saveLocalStorage } = useContext(DataContext);
  const { funcoes, controleEstoque } = useContext(EstoqueContext);
  const { header, body, sx } = config_tables[controleEstoque.tabela];

  useEffect(() => {
    saveLocalStorage();
  }, [saveLocalStorage]);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: maxHeight, ...sxCardScrollPersonalizada }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {header.map((celula, index) => (
                <TableCell sx={sx} key={index}>
                  {celula}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {controle[body.prop].map((item, index) => (
              <TableRow hover key={`${body.key}${index}`}>
                {body.contents.map((content, indexb) => (
                  <TableCell sx={sx} key={indexb}>
                    {content.type === "text"
                      ? item[content.content]
                      : content.content(
                        funcoes,
                        body.functions[content.function],
                        body.functions.gerarParametros(item, content.params)
                      )
                    }
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

import { Button, Stack, Typography } from "@mui/material"
import { ModalCorteCoracao } from "../modal"
import { CorteCoracaoContext } from "../../../../../contexts/contexts/corte.coracao.context"
import { useContext, useMemo, useState } from "react"
import { TabelasCorteCoracao } from "../../tabelas/tabelas.corte_coracao"
import { DataContext } from "../../../../../contexts/contexts/data.context"
import { logger } from "../../../../../utils/logger"

export const SelecionarStatus = () => {
  const [save, setSave] = useState(false)
  const { funcoes, dCorteCoracao } = useContext(CorteCoracaoContext)
  const { dData } = useContext(DataContext)

  // Backup com cópia profunda
  const [backup] = useState(() => JSON.parse(JSON.stringify(dCorteCoracao.filtro_lista_etiquetas.status)))

  const hasSelected = useMemo(() => {
    return dCorteCoracao.filtro_lista_etiquetas.status.some(item => item.selected)
  }, [dCorteCoracao.filtro_lista_etiquetas.status])

  const handleSelecionarTudo = () => {
    let array = [...dCorteCoracao.filtro_lista_etiquetas.status]
    array.forEach(item => { item.selected = true })
    funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "status", array, false)
  }

  const handleRemoverTudo = () => {
    let array = [...dCorteCoracao.filtro_lista_etiquetas.status]
    array.forEach(item => { item.selected = false })
    funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "status", array, false)
  }

  const closeClick = () => {
    if (!save) {
      funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "status", backup, false)
    }
  }

  const handleSaveClick = () => {
    setSave(true)
    logger(dCorteCoracao.filtro_lista_etiquetas.status)
    funcoes.gControleCorteCoracao("tab3", "tab", false)
  }

  return (
    <ModalCorteCoracao
      title={"Filtro de Status"}
      destino={"tab3"}
      width="400px"
      tabela="lotes_etiquetas"
      closeClick={closeClick}
    >
      {/* {JSON.stringify(backup)} */}
      <Stack
        sx={{ width: "100%", height: "100%" }}
        spacing={1}
      >
        <Stack spacing={1}>
          <TabelasCorteCoracao maxHeight={330} dados={dData.status} tabela={`status_filtro`} />
          <Stack
            direction={`row`}
            sx={{ alignItems: "center", justifyContent: "center" }}
            spacing={1}
          >
            <Button variant="contained"
              onClick={handleSelecionarTudo}
            >
              <Typography variant="overline" fontSize={10}>
                Selecionar Tudo
              </Typography>
            </Button>
            <Button variant="contained"
              onClick={handleRemoverTudo}
            >
              <Typography variant="overline" fontSize={10}>
                Remover Tudo
              </Typography>
            </Button>
            {hasSelected && <Button
              variant="contained"
              sx={{ backgroundColor: hasSelected ? "green" : "gray" }}
              onClick={handleSaveClick}
            >
              <Typography variant="overline" fontSize={10}>
                Salvar
              </Typography>
            </Button>}
          </Stack>
        </Stack>
      </Stack>
    </ModalCorteCoracao>
  )
}

import { Button, Stack, Typography } from "@mui/material"
import { ModalCorteCoracao } from "../modal"
import { CorteCoracaoContext } from "../../../../../contexts/contexts/corte.coracao.context"
import { useContext, useMemo, useState } from "react"
import { TabelasCorteCoracao } from "../../tabelas/tabelas.corte_coracao"
import { DataContext } from "../../../../../contexts/contexts/data.context"
import { logger } from "../../../../../utils/logger"

export const SelecionarAreas = () => {
  const [save, setSave] = useState(false)
  const { funcoes, dCorteCoracao } = useContext(CorteCoracaoContext)
  const { dData } = useContext(DataContext)

  // Backup com cópia profunda
  const [backup] = useState(() => JSON.parse(JSON.stringify(dCorteCoracao.filtro_lista_etiquetas.areas)))

  const hasSelected = useMemo(() => {
    return dCorteCoracao.filtro_lista_etiquetas.areas.some(item => item.selected)
  }, [dCorteCoracao.filtro_lista_etiquetas.areas])

  const handleSelecionarTudo = () => {
    let array = [...dCorteCoracao.filtro_lista_etiquetas.areas]
    array.forEach(item => { item.selected = true })
    funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", array, false)
  }

  const handleRemoverTudo = () => {
    let array = [...dCorteCoracao.filtro_lista_etiquetas.areas]
    array.forEach(item => { item.selected = false })
    funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", array, false)
  }

  const closeClick = () => {
    if (!save) {
      funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", backup, false)
    }
  }

  const handleSaveClick = () => {
    setSave(true)
    logger(dCorteCoracao.filtro_lista_etiquetas.areas)
    funcoes.gControleCorteCoracao("tab3", "tab", false)
  }

  return (
    <ModalCorteCoracao
      title={"Filtro de Áreas"}
      destino={"tab3"}
      width="400px"
      tabela="lotes_etiquetas"
      closeClick={closeClick}
    >
      <Stack
        sx={{ width: "100%", height: "100%" }}
        spacing={1}
      >
        <Stack spacing={1}>
          <TabelasCorteCoracao maxHeight={330} dados={[{ id_area: 0, nome: "SEM ÁREA" }, ...dData.areas]} tabela={`areas_filtro`} />
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

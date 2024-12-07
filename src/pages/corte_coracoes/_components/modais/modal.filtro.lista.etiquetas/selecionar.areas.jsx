import { Button, Stack, TextField, Typography } from "@mui/material"
import { ModalCorteCoracao } from "../modal"
import { CorteCoracaoContext } from "../../../../../contexts/contexts/corte.coracao.context"
import { useContext, useEffect, useMemo, useState } from "react"
import { TabelasCorteCoracao } from "../../tabelas/tabelas.corte_coracao"
import { DataContext } from "../../../../../contexts/contexts/data.context"
import { logger } from "../../../../../utils/logger"

export const SelecionarAreas = () => {

  const [save, setSave] = useState(false)
  const { funcoes, dCorteCoracao } = useContext(CorteCoracaoContext)
  const { dData } = useContext(DataContext)

  useEffect(() => {
    const areas_filtro = dData.areas.map(area => ({ area: area.nome, selected: true }))
    funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", areas_filtro, false)
  }, [])

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
      const areas_filtro = dData.areas.map(area => ({ area: area.nome, selected: true }))
      funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", areas_filtro, false)
    }
  }

  const handleSaveClick = () => {
    setSave(true)
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
        <Stack
          spacing={1}
        >
          <TabelasCorteCoracao maxHeight={330} dados={dData.areas} tabela={`areas_filtro`} />
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
    </ModalCorteCoracao >
  )
}
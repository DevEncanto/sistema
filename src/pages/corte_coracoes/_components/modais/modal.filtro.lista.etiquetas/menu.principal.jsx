import { Button, Stack, TextField, Typography } from "@mui/material"
import { ModalCorteCoracao } from "../modal"
import { CorteCoracaoContext } from "../../../../../contexts/contexts/corte.coracao.context"
import { useContext, useEffect, useMemo, useState } from "react"
import { TabelasCorteCoracao } from "../../tabelas/tabelas.corte_coracao"
import { DataContext } from "../../../../../contexts/contexts/data.context"
import { logger } from "../../../../../utils/logger"

export const MenuPrincipal = () => {

  const [filtro, setFiltro] = useState("")
  const { funcoes, cCorteCoracao, dCorteCoracao } = useContext(CorteCoracaoContext)
  const { dData } = useContext(DataContext)

  useEffect(() => {
    const areas_filtro = dData.areas.map(area => ({ area: area.nome, selected: true }))
    logger(areas_filtro)
    funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", areas_filtro, false)
  }, [])

  const handleFiltrar = () => {
    funcoes.gControleCorteCoracao(filtro, "filtro", false)
    funcoes.gControleCorteCoracao("tab4", "tab", false)
    setFiltro("")
  }

  const handleOpenAreas = () => {
    funcoes.gControleCorteCoracao("tab9", "tab", false)
    funcoes.gControleCorteCoracao("resumo_filtro", "return", false)
  }


  const hasSelected = useMemo(() => {
    return dCorteCoracao.filtro_lista_etiquetas.areas.some(item => item.selected)
  }, [dCorteCoracao.filtro_lista_etiquetas.areas])

  const body = () => {
    return (
      <>

      </>
    )
  }

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

  return (
    <ModalCorteCoracao
      title={"Filtros Lista Etiquetas"}
      width="400px"
      tabela="lotes_etiquetas"
      destino="tab6"
    >
      <Stack
        sx={{ width: "100%", height: "100%" }}
        spacing={1}
      >
        <Stack direction={`row`}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Stack
            sx={{ width: "70%", padding: "0 10px" }}
          >
            <Typography variant="overline" fontSize={15}>
              áreas
            </Typography>
            <Typography variant="overline" fontSize={11}>
              {`[${dCorteCoracao.filtro_lista_etiquetas.areas
                .filter(area => area.selected)
                .map(area => area.area)
                .join(', ')}]`}
            </Typography>
          </Stack>
          <Stack
            sx={{ width: "30%", padding: "0 10px", alignItems: "center", justifyContent: "center" }}
          >
            <Button variant="contained"
              onClick={handleOpenAreas}
            >
              <Typography variant="overline" fontSize={11}>
                selecionar
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Stack direction={`row`}
          sx={{ backgroundColor: "red", alignItems: "center", justifyContent: "center" }}
        >
          <Stack
            sx={{ backgroundColor: "orange", width: "70%", padding: "0 10px" }}
          >
            <Typography variant="overline" fontSize={15}>
              STATUS
            </Typography>
            <Typography variant="overline" fontSize={11}>
              {`[${dCorteCoracao.filtro_lista_etiquetas.status.join(', ')}]`}
            </Typography>
          </Stack>
          <Stack
            sx={{ width: "30%", padding: "0 10px" }}
          >
            <Button variant="contained">
              <Typography variant="overline" fontSize={11}>
                selecionar
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Stack
          spacing={.5}
          direction={"row"}
          sx={{ marginBottom: "30px" }}
        >
          <Button
            variant="contained"
            onClick={handleFiltrar}
          >
            Limpar Filtros
          </Button>
          <Button
            variant="contained"
            onClick={handleFiltrar}
          >
            Filtrar
          </Button>
        </Stack>
      </Stack>
    </ModalCorteCoracao >
  )
}
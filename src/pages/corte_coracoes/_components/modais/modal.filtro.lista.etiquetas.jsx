import { Button, Stack, TextField, Typography } from "@mui/material"
import { ModalCorteCoracao } from "./modal"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { useContext, useEffect, useMemo, useState } from "react"
import { TabelasCorteCoracao } from "../tabelas/tabelas.corte_coracao"
import { DataContext } from "../../../../contexts/contexts/data.context"

export const MenuFiltroListaEtiquetas = () => {

  const [filtro, setFiltro] = useState("")
  const { funcoes, cCorteCoracao, dCorteCoracao } = useContext(CorteCoracaoContext)
  const { dData } = useContext(DataContext)

  useEffect(() => {
    const areas_filtro = dData.areas.map(area => ({ area: area.nome, selected: true }))
    funcoes.dControleCorteCoracaoComplex("filtro_lista_etiquetas", "areas", areas_filtro, false)
  }, [])

  const handleFiltrar = () => {
    funcoes.gControleCorteCoracao(filtro, "filtro", false)
    funcoes.gControleCorteCoracao("resumo_lotes_etiquetas", "tab", false)
    setFiltro("")
  }

  const handleOpenAreas = () => {
    funcoes.gControleCorteCoracao("filtro_areas", "tabFiltroListaEtiqueta", false)
    funcoes.gControleCorteCoracao("resumo_filtro", "return", false)
  }


  const hasSelected = useMemo(() => {
    return dCorteCoracao.filtro_lista_etiquetas.areas.some(item => item.selected)
  }, [dCorteCoracao.filtro_lista_etiquetas.areas])

  const body = () => {


    return (
      <>
        <Stack direction={`row`}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Stack
            sx={{ backgroundColor: "orange", width: "70%", padding: "0 10px" }}
          >
            <Typography variant="overline" fontSize={15}>
              áreas
            </Typography>
            <Typography variant="overline" fontSize={11}>
              {`[${dCorteCoracao.filtro_lista_etiquetas.areas.map(area => area.nome).join(', ')}]`}
            </Typography>
          </Stack>
          <Stack
            sx={{ width: "30%", padding: "0 10px" }}
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

  const filtro_areas = () => {

    return (
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
          >
            <Typography variant="overline" fontSize={10}>
              Salvar
            </Typography>
          </Button>}
        </Stack>
      </Stack>
    )
  }

  return (
    <ModalCorteCoracao
      title={"Filtros Lista Etiquetas"}
      destino={"resumo_lotes_etiquetas"}
      width="400px"
      tabela="lotes_etiquetas"
    >
      <Stack
        sx={{ width: "100%", height: "100%" }}
        spacing={1}
      >
        {cCorteCoracao.tabFiltroListaEtiqueta === "resumo_filtro" && body()}
        {cCorteCoracao.tabFiltroListaEtiqueta === "filtro_areas" && filtro_areas()}
      </Stack>
    </ModalCorteCoracao >
  )
}
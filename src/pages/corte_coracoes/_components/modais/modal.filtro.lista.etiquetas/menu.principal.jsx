import { Button, Divider, Stack, Typography } from "@mui/material"
import { ModalCorteCoracao } from "../modal"
import { CorteCoracaoContext } from "../../../../../contexts/contexts/corte.coracao.context"
import { useContext, useEffect, useState } from "react"

export const MenuPrincipal = () => {

  const [filtro, setFiltro] = useState("")
  const { funcoes, dCorteCoracao } = useContext(CorteCoracaoContext)

  useEffect(() => {

  }, [])

  const handleFiltrar = () => {
    funcoes.gControleCorteCoracao(filtro, "filtro", false)
    funcoes.gControleCorteCoracao("tab11", "tab", false)
    setFiltro("")
  }

  const handleOpenAreas = () => {
    funcoes.gControleCorteCoracao("tab9", "tab", false)
  }
  const handleOpenStatus = () => {
    funcoes.gControleCorteCoracao("tab10", "tab", false)
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
        <Divider color="#c9c9c9" sx={{ height: 2 }} />
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
        <Divider color="#c9c9c9" sx={{ height: 2 }} />
        <Stack direction={`row`}
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Stack
            sx={{ width: "70%", padding: "0 10px" }}

          >
            <Typography variant="overline" fontSize={15}>
              STATUS
            </Typography>
            <Typography variant="overline" fontSize={11}>
              {`[${dCorteCoracao.filtro_lista_etiquetas.status
                .filter(status => status.selected)
                .map(status => status.status)
                .join(', ')}]`}
            </Typography>
          </Stack>
          <Stack
            sx={{ width: "30%", padding: "0 10px" }}
          >
            <Button variant="contained"
              onClick={handleOpenStatus}
            >
              <Typography variant="overline" fontSize={11}>
                selecionar
              </Typography>
            </Button>
          </Stack>

        </Stack>
        <Divider color="#c9c9c9" sx={{ height: 2 }} />
        <Stack
          spacing={.5}
          direction={"row"}
          sx={{ marginBottom: "30px", alignItems: "center", justifyContent: "center" }}
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
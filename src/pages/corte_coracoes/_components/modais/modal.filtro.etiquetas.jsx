import { Button, Stack, TextField, Typography } from "@mui/material"
import { ModalCorteCoracao } from "./modal"
import { CorteCoracaoContext } from "../../../../contexts/contexts/corte.coracao.context"
import { useContext, useState } from "react"

export const MenuFiltroEtiquetas = () => {

  const [filtro, setFiltro] = useState("")
  const { funcoes } = useContext(CorteCoracaoContext)
  
  const handleFiltrar = () => {
      funcoes.gControleCorteCoracao(filtro, "filtro", false)
      funcoes.gControleCorteCoracao("gerador_etiquetas", "tab", false)
      setFiltro("")
  }


  return (
    <ModalCorteCoracao
      title={"Filtros de Etiquetas"}
      destino={"gerador_etiquetas"}
      width="520px"
    >
      <Stack
        sx={{ alignItems: "center" }}
      >
        <Typography textAlign={"left"} fontSize={16} fontWeight={600}>
          Informe as etiquetas no seguinte formato:
        </Typography>
        <Stack
          sx={{ margin: "20px 0" }}
        >
          <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
            (1-30): Para filtrar intervalos
          </Typography>
          <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
            (3): Para filtrar somente a etiqueta "3"
          </Typography>
          <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
            (1-4,6): Para filtrar intervalos e etiquetas individuais
          </Typography>
          <Typography textAlign={"left"} fontSize={14} fontWeight={600}>
            Separar intervalos e etiquetas por vírgula (,)
          </Typography>
        </Stack>
        <TextField
          sx={{ width: "80%", marginBottom: "15px" }}
          label="Intervalo de Etiquetas"
          name="usuario"
          onChange={(e) => { setFiltro(e.target.value) }}
          type="text"
          value={filtro}
        />

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
    </ModalCorteCoracao>
  )
}
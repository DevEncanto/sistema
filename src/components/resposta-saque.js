import { Box } from '@mui/material';
import {
  ErroSaque,
  SolicitacaoSaque,
  Banimento,
  SucessoSaque,
  SaqueMinimo
} from './status-solicitacao-saque';


export const RespostaSaque = (props) => {
  const { response } = props
  return (
    <Box sx={{
      width: "100%",
      height: 220,
      marginTop: "15px",
      marginBottom: "-7px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {response === "loading" ? <SolicitacaoSaque /> : <></>}
      {response === "erro" ? <ErroSaque /> : <></>}
      {response === "sucesso" ? <SucessoSaque /> : <></>}
      {response === "banimento" ? <Banimento /> : <></>}
      {response === "saque3" ? <SaqueMinimo minimo={5} /> : <></>}
      {response === "saque15" ? <SaqueMinimo minimo={15} /> : <></>}
    </Box>
  )
};
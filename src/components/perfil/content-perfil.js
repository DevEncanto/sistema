import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  Stack
} from '@mui/material';

import Cookies from 'js-cookie';
import CopyToClipboard from 'react-copy-to-clipboard';
import delay from 'src/utils/delay';
import { useState } from 'react';

export const ContentPerfil = (props) => {
  const [text, setText] = useState("Clique para copiar o seu código de indicação!")

  const handleCopy = async (text) => {
    setText(`${text} Copiado!`)
    await delay(3000)
    setText("Clique para copiar o seu código/link de indicação!")
  }

  const { avatar, nome, saques, saldo, codigoIndicacao, changeMode, router } = props
  const handleTrocarSenha = () => {
    Cookies.set("auth_token", "")
    router.push('/auth/trocar-senha')
  }
  const link = `https://www.cherrysocial.com.br/auth/register/${codigoIndicacao}`
  return (
    <Card
      sx={{ minWidth: { xp: "100%", sm: "50%" } }}
    >
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src={avatar == undefined ? "/assets/avatars/default.png" : `/assets/avatars${avatar}`}
            sx={{
              height: 160,
              mb: 1,
              width: 160
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {nome}
          </Typography>
          <Stack
            sx={{ alignItems: "center", marginTop: "20px" }}
          >
            <CopyToClipboard text={codigoIndicacao} onCopy={() => { handleCopy("Código") }}>
              <Typography
                sx={{ fontSize: "22px", cursor: "pointer" }}
                gutterBottom
                variant="h5"
              >

                {codigoIndicacao}
              </Typography>
            </CopyToClipboard>
            <CopyToClipboard text={link} onCopy={() => { handleCopy("Link") }}>
              <Typography
                sx={{ fontSize: { sm: "14px", xp: "12px" }, cursor: "pointer" }}
                gutterBottom
                variant="h5"
              >

                {link}
              </Typography>
            </CopyToClipboard>
            <Typography
              sx={{ fontSize: "11px" }}
              gutterBottom
              variant="h5"
            >
              {text}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
      <Divider />


      <Stack
        spacing={1}
        sx={{ alignItems: "center", padding: "0 10%" }}
      >
        <Button
          fullWidth
          variant="contained"
          onClick={() => { changeMode("imagem") }}
        >
          Alterar avatar
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => { handleTrocarSenha() }}
        >
          Alterar senha
        </Button>
        <Button
          fullWidth
          variant="contained"
          onClick={() => { changeMode("codigo") }}
        >
          Resgatar Código
        </Button>
      </Stack>
    </Card>
  )
}

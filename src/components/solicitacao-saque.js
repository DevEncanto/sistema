import { useCallback, useState, useContext, useEffect } from 'react';
import { Button, Card, Avatar, CardActions, CardContent, CardHeader, Divider, Stack, TextField, Typography } from '@mui/material';
import { UserContext } from '../contexts/contexts/user.context';
import formatSaldo from '../utils/formatarSaldos';
import delay from "../utils/delay"
import { saque } from '../util/util-saque';
import { useRouter } from 'next/router';
import { SeverityPill } from './severity-pill';

export const FormularioSaque = (props) => {

  const { loadUser } = useContext(UserContext)

  const {
    setMode,
    setResponse,
    banco,
    url,
    user,
    pix,
    valorSaque,
    setValorSaque,
    setPix,
    setRecebedor,
    recebedor,
    router
  } = props
  useEffect(() => {
    loadUser()
  }, [])

  useEffect(() => {
    setPix(user?.usuario?.pix)
    setRecebedor(user?.usuario?.recebedor)
  }, [user])

  const [message, setMessage] = useState("")


  const handleMessage = async (text = "Saque mínimo de R$ 25,00!!") => {
    setMessage(text)
    await delay(3500)
    setMessage("")
  }

  const handleSaque = async () => {
    if (pix == "" || banco == "" || recebedor == "") {
      return await handleMessage("Preencha todos os campos!")
    }
    if (parseFloat(valorSaque) > user?.usuario?.saldo) {
      return await handleMessage("Saldo insuficiente!")
    }
    if (parseFloat(valorSaque) < 0 || valorSaque == "") {
      return await handleMessage("Digite um valor para o saque!")
    }
    await saque(
      user.usuario.idUsuario,
      parseFloat(valorSaque),
      setMode,
      setResponse,
      user.usuario.saldo,
      router,
      pix,
      banco,
      recebedor
    )
  }

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <Divider />
        <Stack>
          <CardHeader
            subheader=
            {!!(!message)
              ?
              <Typography
                variant='p'
                fontSize={"10.5pt"}
              >
                {
                  user?.usuario?.saldo === undefined
                    ? "Saldo Atual: R$ 0,00"
                    : `Saldo Atual: R$ ${formatSaldo(user?.usuario?.saldo)}`
                }
              </Typography>
              :
              <Typography
                variant='p'
                sx={{
                  marginBottom: "-5px",
                  fontWeight: 600,
                  color: "red",
                  fontSize: "10.5pt"
                }}
              >
                {message}
              </Typography>
            }
            title="Valor do Saque: "
          />
        </Stack>
        <Divider />
        <CardContent>
          <Stack
            spacing={1}
            sx={{ maxWidth: 700 }}
          >
            <Stack direction="column" spacing={2} sx={{ width: "100%" }}>
              <Stack direction={`row`} spacing={2} sx={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label="Valor do Saque (R$)"
                  name="saque"
                  onChange={e => { setValorSaque(e.target.value) }}
                  type="number"
                  value={valorSaque}
                  autoComplete=''
                />
                <TextField
                  fullWidth
                  label="Chave Pix"
                  name="pix"
                  onChange={e => { setPix(e.target.value) }}
                  type="text"
                  value={pix}
                />
              </Stack>
              <Stack direction={{ sm: `row`, xp: "column" }} spacing={2} sx={{ width: "100%" }}>

                {banco == "" ?
                  <Button
                    variant='contained'
                    onClick={() => { setMode("banco") }}
                  >
                    <SeverityPill
                      color={"white"}
                      isBackground={false}
                      sx={{ "&:hover": { cursor: "pointer" }, fontSize: { sm: "12px", xp: "10px " } }}
                    >
                      Selecionar Banco
                    </SeverityPill>
                  </Button>
                  :
                  <Stack
                    spacing={2}
                    sx={{ alignItems: "center", cursor: "pointer", minWidth: "230px" }}
                    direction={`row`}
                    onClick={() => { setMode("banco") }}
                  >
                    <Avatar
                      src={`/assets/avatars${url}`}
                      sx={{ width: 56, height: 56, cursor: "pointer" }}
                    />
                    <SeverityPill
                      color={`neutral`}
                      isBackground={false}
                      sx={{ cursor: "pointer" }}
                    >
                      {banco}
                    </SeverityPill>
                  </Stack>
                }

                <TextField
                  fullWidth
                  label="Recebedor"
                  name="recebedor"
                  onChange={e => { setRecebedor(e.target.value) }}
                  type="text"
                  value={recebedor}
                />
              </Stack>

            </Stack>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'flex-end', marginTop: { sm: '-80px' } }}>
          {
            parseFloat(user?.usuario?.saldo) >= 20
              ? <Button
                variant="contained"
                color="success"
                onClick={handleSaque}
              >
                Sacar
              </Button>
              :
              <Button
                variant="contained"
                color="error"
                onClick={handleSaque}
              >
                Sacar
              </Button>
          }
        </CardActions>
      </Card>
    </form>
  );
};

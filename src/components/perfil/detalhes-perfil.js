import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { ErroPerfil, LoadingPerfil, SucessoPerfil } from '../status-atualização-perfil';
import { atualizarDadosPerfil } from 'src/util/util-perfil';
import { useRouter } from 'next/router';

export const DetalhesPerfil = (props) => {
  const {
    nomeCompleto = "",
    Email = "",
    idUsuario,
    avatar,
    Banco = "",
    Pix = "",
    Recebedor = "",
    codigoResgatado = ""
  } = props
  const router = useRouter()

  const [nome, setNome] = useState("")
  const [pix, setPix] = useState("")
  const [banco, setBanco] = useState("")
  const [recebedor, setRecebedor] = useState("")
  const [mode, setMode] = useState("salvar")
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );
  useEffect(() => {
    setNome(nomeCompleto)
    setPix(Pix)
    setRecebedor(Recebedor)
    setBanco(Banco)
  }, [])
  useEffect(() => {

  }, [nome, avatar])

  const handleAtualizarPerfil = async () => {
    await atualizarDadosPerfil(idUsuario, avatar, nome, setMode, pix, banco, recebedor, router)
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card
        sx={{ minWidth: { xp: "100%", sm: "50%" } }}
      >
        <CardHeader
          subheader="As informações podem ser editadas"
          title="Perfil"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: 0 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText={nome == "" ? "Digite o seu nome completo!" : ""}
                  label="Nome"
                  name="firstName"
                  onChange={(e) => { nome.length == 150 ? setNome(nome) : setNome(e.target.value) }}
                  value={nome}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="E-mail"
                  name="email"
                  onChange={() => { }}
                  value={Email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Chave Pix"
                  name="pix"
                  onChange={() => { }}
                  value={pix}

                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Banco"
                  name="pix"
                  onChange={() => { }}
                  value={banco}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Nome do Recebedor"
                  name="pix"
                  onChange={() => { }}
                  value={recebedor}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Código Resgatado"
                  name="pix"
                  onChange={() => { }}
                  value={codigoResgatado}
                />
              </Grid>
            </Grid>

          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          {mode == "salvar"
            ? <Button
              variant="contained"
              onClick={handleAtualizarPerfil}>Salvar</Button>
            : <></>}
          {mode == "load" ? <LoadingPerfil /> : <></>}
          {mode == "error" ? <ErroPerfil /> : <></>}
          {mode == "sucess" ? <SucessoPerfil /> : <></>}
        </CardActions>
      </Card>
    </form >
  );
};


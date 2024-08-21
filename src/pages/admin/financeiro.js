import Head from 'next/head';
import { Box, Container, Unstable_Grid2 as Grid, Stack, Fab, Typography, Button, Divider } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user_context/user_context';
import formatSaldo from '../../utils/formatarSaldos';
import ArrowUpTrayIcon from '@heroicons/react/24/solid/ArrowUpTrayIcon';
import ArrowDownTrayIcon from '@heroicons/react/24/solid/ArrowDownTrayIcon';
import CurrencyDollarIcon from '@heroicons/react/24/solid/CurrencyDollarIcon';
import { TabelaSaques } from 'src/components/tabela-saques';
import ArrowDownCircleIcon from '@heroicons/react/24/solid/ArrowPathIcon';
import { CartaoEstatistica } from 'src/components/cartao-estatisticas';
import { useRouter } from 'next/router';
import { modoDashboard } from 'src/util/util.set-mode-page';
import { SeverityPill } from 'src/components/severity-pill';
import { Seletor } from 'src/components/Seletor';
import { FluxoCaixa } from 'src/components/fluxo-caixa';
import { Recebimentos } from 'src/components/recebimentos';
import { dadosAdmin, pagarEstornarSaque } from 'src/util/util-admin';
import { CadastroRecebimento } from 'src/components/cadastro-recebimentos';
import { ModalAlterarSaque } from 'src/components/financeiro/alterar-status-saque';

const Page = () => {
  const [filtro, setFiltro] = useState("TODOS")
  const router = useRouter()
  const [section, setSection] = useState("resumo")
  const [load, setLoad] = useState(false)
  const [saldo, setSaldo] = useState(0)
  const [modeReceb, setModeReceb] = useState("tabela")
  const [modePag, setModePag] = useState("tabela")
  const [pagamento, setPagamento] = useState({})
  const [recebimento, setRecebimento] = useState("TODOS")

  const { user, loadUser, setUser, setMode, mode } = useContext(UserContext)
  useEffect(() => {
    loadUser()
    handleSetMode()
  }, [])
  const handleChange = async (filtro) => {
    setFiltro(filtro)
  }
  const handleRecebimento = async (receb) => {
    setRecebimento(receb)
  }
  const handleAdmin = async () => {
    await dadosAdmin(setUser, user?.usuario?.idUsuario, setLoad)
  }
  const handleSetMode = async () => {
    await modoDashboard(router, setMode)
  }
  const handleAlterarStatusSaque = async (status) => {
    setModePag("tabela")
    await pagarEstornarSaque(
      pagamento.idSaque,
      status,
      pagamento.valor,
      pagamento.idUsuario,
      setUser,
      "admin",
      pagamento.usuario
    )
  }


  const handleModal = (pagamento, modePag) => {
    setModePag(modePag)
    setPagamento(pagamento)
  }
  const handleFechar = () => {
    setModePag("tabela")
  }

  const handleSection = (section) => {
    setSection(section)
  }

  const saquesFiltrados = filtro == "TODOS"
    ? user?.saques
    : user?.saques?.filter((saque) => { return saque.status == filtro })

  return <>
    <Head>
      <title>
        Home | Cherry Social
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        marginTop: "-60px"
      }}
    >
      <Stack
        direction="row"
        spacing={9}
        sx={{ alignItems: "center", marginLeft: "20px", marginBottom: "5px" }}
      >
        <Typography variant="h4"
          sx={{ fontSize: { sm: "10pt", md: "24pt" } }}
        >
          Financeiro
        </Typography>
        {load ?
          <img src="/assets/loading.svg" width={40} height={40} />
          :
          <Fab
            color="primary"
            aria-label="add" size='small'
            onClick={handleAdmin}
            sx={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ArrowDownCircleIcon height={25} width={25} fontWeight={600} />
          </Fab>
        }
        <Stack
          sx={{ alignItems: "center" }}
          direction={{ sm: "row" }}
          spacing={2}
        >
          <Button
            onClick={() => { handleSection("resumo") }}
            sx={{
              width: "130px",
              background: section == "resumo" ? "cereja.100" : "grey",
              "&:hover": { background: section == "resumo" ? "cereja.200" : "#7a7a7a" }
            }}
          >
            <SeverityPill
              isBackground={false}
              color={"white"}
              sx={{
                "&:hover": { cursor: "pointer" }
              }}
            >
              Resumos
            </SeverityPill>
          </Button>
          <Button
            onClick={() => { handleSection("fluxo") }}
            sx={{
              width: "130px",
              background: section == "fluxo" ? "cereja.100" : "grey",
              "&:hover": { background: section == "fluxo" ? "cereja.200" : "#7a7a7a" }
            }}
          >
            <SeverityPill
              isBackground={false}
              color={"white"}
              sx={{
                "&:hover": { cursor: "pointer" }
              }}
            >
              Fluxo de Caixa
            </SeverityPill>
          </Button>
          <Button
            onClick={() => { handleSection("receb") }}
            sx={{
              width: "130px",
              background: section == "receb" ? "cereja.100" : "grey",
              "&:hover": { background: section == "receb" ? "cereja.200" : "#7a7a7a" }
            }}
          >
            <SeverityPill
              isBackground={false}
              color={"white"}
              sx={{
                "&:hover": { cursor: "pointer" }
              }}
            >
              Recebimentos
            </SeverityPill>
          </Button>
          <Button
            onClick={() => { handleSection("pag") }}
            sx={{
              width: "130px",
              background: section == "pag" ? "cereja.100" : "grey",
              "&:hover": { background: section == "pag" ? "cereja.200" : "#7a7a7a" }
            }}
          >
            <SeverityPill
              isBackground={false}
              color={"white"}
              sx={{
                "&:hover": { cursor: "pointer" }
              }}
            >
              Pagamentos
            </SeverityPill>
          </Button>
        </Stack>
      </Stack>
      <Typography variant='p' sx={{ fontSize: 12, marginLeft: "230px", fontWeight: 600, marginTop: "10px" }}>
        {!load ? "Atualizar dados!" : ""}
      </Typography>
      <Container maxWidth="xl">
        <Stack
          sx={{ margin: "10px 0 20px" }}
          direction={{ sm: "row" }}
        >
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
            difference={20}
            title={`Saldo do caixa`}
            color={`cereja.100`}
            icon={<CurrencyDollarIcon />}
            value={`R$ ${user?.financeiro?.saldoCaixa == undefined ? "0.00" : formatSaldo(user?.financeiro?.saldoCaixa, 3)}`}
          />
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
            difference={20}
            title={`À receber`}
            color={`success.main`}
            icon={<ArrowDownTrayIcon />}
            value={`R$ ${user?.financeiro?.valorRecebimentos == undefined ? "0.00" : formatSaldo(user?.financeiro?.valorRecebimentos, 3)}`}
          />
          <CartaoEstatistica
            sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
            difference={20}
            title={`A pagar`}
            color={`red`}
            icon={<ArrowUpTrayIcon />}
            value={`R$ ${user?.financeiro?.valorSaques == undefined ? "0.00" : formatSaldo(user?.financeiro?.valorSaques, 3)}`}
          />
        </Stack>
        {section === "resumo" ?
          <>
            <Stack
              sx={{ margin: "10px 0 20px" }}
              direction={{ sm: "row" }}
            >
              <CartaoEstatistica
                sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
                difference={20}
                title={`Saldo sua url`}
                color={`cereja.100`}
                icon={<CurrencyDollarIcon />}
                value={`R$ ${user?.financeiro?.saldoSuaURL == undefined ? "0.00" : formatSaldo(user?.financeiro?.saldoSuaURL, 3)}`}
              />
              <CartaoEstatistica
                sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
                difference={20}
                title={`faturamento`}
                color={`success.main`}
                icon={<ArrowDownTrayIcon />}
                value={`R$ ${user?.financeiro?.valorRecebimentos == undefined ? "0.00" : formatSaldo(user?.financeiro?.valorRecebimentos, 3)}`}
              />
              <CartaoEstatistica
                sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
                difference={20}
                title={`custos`}
                color={`red`}
                icon={<ArrowUpTrayIcon />}
                value={`R$ ${user?.financeiro?.valorSaques == undefined ? "0.00" : formatSaldo(user?.financeiro?.valorSaques, 3)}`}
              />
            </Stack>
            <Stack
              sx={{ margin: "10px 0 20px" }}
              direction={{ sm: "row" }}
            >
              <CartaoEstatistica
                sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
                difference={20}
                title={`saldo usuários`}
                color={`cereja.100`}
                icon={<CurrencyDollarIcon />}
                value={`R$ ${user?.financeiro?.saldoUsuarios == undefined ? "0.00" : formatSaldo(user?.financeiro?.saldoUsuarios, 3)}`}
              />
              <CartaoEstatistica
                sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
                difference={20}
                title={`aportes`}
                color={`success.main`}
                icon={<ArrowDownTrayIcon />}
                value={`R$ ${user?.financeiro?.valorRecebimentos == undefined ? "0.00" : formatSaldo(user?.financeiro?.valorRecebimentos, 3)}`}
              />
              <CartaoEstatistica
                sx={{ width: { sm: "280px" }, marginLeft: "20px", height: "120px" }}
                difference={20}
                title={`lucro`}
                color={`red`}
                icon={<ArrowUpTrayIcon />}
                value={`R$ ${user?.financeiro?.valorSaques == undefined ? "0.00" : formatSaldo(user?.financeiro?.valorSaques, 3)}`}
              />
            </Stack>
          </>
          : <></>

        }
        <Divider color="#e8e8e8" sx={{ height: 2 }} />
        {section == "resumo" ?
          <></>
          : <></>

        }
        {section == "pag" ?
          <Stack>
            <Stack
              sx={{ marginBottom: "12px" }}
              direction="row"
              spacing={2}
            >
              {modePag == "tabela"
                ? <>
                  <SeverityPill color={"primary"}>Status do saque: </SeverityPill>
                  <Seletor
                    label="Status"
                    itens={["TODOS", "CANCELADO", "PENDENTE", "PAGO"]}
                    value={filtro}
                    handleChange={handleChange}
                    isSeverityPill={true}
                  />
                </>
                : <></>
              }
            </Stack>
            {modePag == "tabela" ? <TabelaSaques
              items={saquesFiltrados}

              maxHeight={295}
              handleModal={handleModal}
            />
              : <></>
            }
            {modePag == "cancelarPag"
              ?
              <ModalAlterarSaque
                status={"CANCELADO"}
                pagamento={pagamento}
                handleFechar={handleFechar}
                handleAlterarStatus={handleAlterarStatusSaque}
              />
              : <></>
            }
            {modePag == "realizarPag"
              ?
              <ModalAlterarSaque
                status={"PAGO"}
                pagamento={pagamento}
                handleFechar={handleFechar}
                handleAlterarStatus={handleAlterarStatusSaque}
              />
              : <></>
            }
          </Stack>
          : <></>}
        {section == "fluxo" ?
          <Stack>
            <Stack
              sx={{ marginBottom: "12px" }}
              direction="row"
              spacing={2}

            >
            </Stack>
            <FluxoCaixa items={user?.fluxocaixa} maxHeight={325} />
          </Stack>
          : <></>}
        {section == "receb" ?
          <Stack>
            <Stack
              sx={{ margin: "10px 0 12px 0", alignItems: "center" }}
              direction="row"
              spacing={2}>
              {modeReceb == "tabela" ?
                <>

                  <SeverityPill color={"primary"}>Status do recebimento: </SeverityPill>
                  <Seletor
                    label="Status"
                    itens={["TODOS", "À RECEBER", "RECEBIDO", "CANCELADO"]}
                    value={recebimento}
                    handleChange={handleRecebimento}
                    isSeverityPill={true}
                  />
                  <Button
                    onClick={() => { setModeReceb("cadastro") }}
                  >
                    <SeverityPill
                      isBackground={false}
                      color={"white"}
                      sx={{
                        "&:hover": { cursor: "pointer" },
                      }}
                    >
                      Novo Recebimento
                    </SeverityPill>
                  </Button>
                </>
                : <></>
              }
            </Stack>
            {modeReceb == "tabela"
              ? <Recebimentos
                setUser={setUser}
                recebimento={recebimento}
                items={user?.recebimentos}
              />
              :
              <CadastroRecebimento
                setModeReceb={setModeReceb}
              />
            }
          </Stack>
          : <></>}
      </Container>
    </Box >
  </>
}

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

import { Stack, Typography, Avatar, Button } from "@mui/material"
import formatSaldo from "src/utils/formatarSaldos"
import { bancos } from "src/utils/bancos"
import { SeverityPill } from "../severity-pill"
export const ModalAlterarSaque = (props) => {
    const { pagamento, handleFechar, handleAlterarStatus, status } = props
    let [data] = bancos.filter((banco) => { return banco.banco == pagamento.banco })
    return (
        <Stack
            sx={{ alignItems: "center" }}
        >
            <Stack
                sx={{
                    alignItems: "center",
                    boxShadow: "0px 5px 16px 0px rgba(0,0,0,0.4)",
                    width: { sm: "60%", xp: "90%" },
                    borderRadius: "15px",
                    minHeight: "230px",
                    justifyContent: "center"
                }}
            >
                <Stack
                    sx={{
                        maxHeight: "30%",
                        width: "100%",
                        padding: "10px",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={4}
                >
                    <img src={`/assets/${status == "PAGO" ? "pix-icon.png" : "alert.png"}`}
                        width={60}
                        height={60}
                    />
                    <Typography
                        variant="h5"
                        sx={{ fontSize: { sm: "15pt", xp: "13pt" } }}
                    >
                        {status == "PAGO" ? "Pagamento de Usuário" : "Cancelamento de Pagamento"}
                    </Typography>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "70%",
                        width: "100%", padding: "7px",
                        alignItems: "center"
                    }}
                    spacing={1}
                >
                    <Typography
                        variant="p"
                        sx={{ fontSize: { sm: "14pt", xp: "12pt" }, textAlign: "center", fontWeight: 600 }}
                    >
                        {`Deseja mesmo ${status == "PAGO" ? "realizar" : "cancelar"} o seguinte pagamento?`}
                    </Typography>
                    <Stack
                        sx={{ background: "#bd0439", padding: "10px", borderRadius: "8px" }}
                    >
                        <Typography
                            variant="p"
                            sx={{ fontSize: { sm: "12pt", xp: "11pt" }, color: "#fff", fontWeight: 600 }}
                        >
                            {`Usuário: ${pagamento.nome}`}
                        </Typography>
                        <Typography
                            variant="p"
                            sx={{ fontSize: { sm: "12pt", xp: "11pt" }, color: "#fff", fontWeight: 600 }}
                        >
                            {`Valor: R$ ${formatSaldo(pagamento.valor, 2)}`}
                        </Typography>
                        <Typography
                            variant="p"
                            sx={{ fontSize: { sm: "12pt", xp: "11pt" }, color: "#fff", fontWeight: 600 }}
                        >
                            {`Pix: ${pagamento.pix}`}
                        </Typography>
                        <Typography
                            variant="p"
                            sx={{ fontSize: { sm: "12pt", xp: "11pt" }, color: "#fff", fontWeight: 600 }}
                        >
                            {`Recebedor: ${pagamento.recebedor}`}
                        </Typography>
                        <Stack
                            spacing={2}
                            direction={`row`}
                            sx={{ alignItems: "center" }}
                        ><Typography
                            variant="p"
                            sx={{ fontSize: { sm: "12pt", xp: "11pt" }, color: "#fff", fontWeight: 600 }}
                        >
                                {`Banco: ${data?.banco}`}
                            </Typography>

                            <Avatar
                                src={`/assets/avatars${data?.avatar}`}
                                sx={{ width: 30, height: 30 }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <Stack
                    sx={{
                        maxHeight: "30%",
                        width: "100%",
                        padding: "10px 20px ",
                        alignItems: "center"
                    }}
                    direction={`row`}
                    spacing={2}
                >
                    <Stack
                        spacing={2}
                        direction={`row`}
                        sx={{ width: "80%", alignItems: "center" }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontSize: "12pt" }}
                        >
                            Cherry Social
                        </Typography>
                        <img src="/assets/logo_cherry.png"
                            width={30}
                            height={30}
                        />
                    </Stack>
                    <Stack
                        direction={`row`}
                        spacing={2}
                        sx={{ width: "50%" }}
                    >
                        <Button
                            sx={{ height: "30px", cursor: "pointer", width: "80px" }}
                            onClick={() => { handleAlterarStatus(status) }}
                        >
                            <SeverityPill
                                sx={{ cursor: "pointer", fontSize: { sm: "12px", xp: "10px" } }}
                                color={"white"}
                                isBackground={false}
                            >
                               {`${status == "PAGO" ? "pagar" : "cancelar"}`}
                            </SeverityPill>
                        </Button>
                        <Button
                            sx={{ height: "30px", cursor: "pointer", width: "80px" }}
                            onClick={() => { handleFechar() }}
                        >
                            <SeverityPill
                                sx={{ cursor: "pointer", fontSize: { sm: "12px", xp: "10px" } }}
                                color={"white"}
                                isBackground={false}
                            >
                                Fechar
                            </SeverityPill>
                        </Button>
                    </Stack>

                </Stack>
            </Stack >
        </Stack >
    )
}
import { api } from "./api"

const solicitarSaque = async (idUsuario, valor, saldoClient, pix, banco, recebedor) => {
    const { data } = await api.post("/solicitar-saque", {
        idUsuario: idUsuario,
        valor: valor,
        saldoClient: saldoClient,
        pix: pix,
        banco: banco,
        recebedor: recebedor
    })
    return data
}

export { solicitarSaque }
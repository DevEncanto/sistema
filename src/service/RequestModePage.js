import { api } from "./api"

const solicitarModoDashaboard = async () => {
    const { data } = await api.get("/modo-dashboard")
    return data
}

export { solicitarModoDashaboard } 
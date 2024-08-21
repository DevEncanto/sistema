import { solicitarModoDashaboard } from "../service/RequestModePage"
import Cookies from "js-cookie"


const modoDashboard = async (router, setMode) => {

    console.log("useLayoutEffect")
    const response = await solicitarModoDashaboard()
    // try {
    //     const response = await solicitarModoDashaboard()
    //     setMode(response.mode)
    //     switch (response.status) {
    //         case 601:
    //             Cookies.set("auth_token", "")
    //             router.push("/auth/login")
    //             break
    //         case 702:
    //             Cookies.set("auth_token", "")
    //             window.localStorage.setItem("manutencaoPlat", JSON.stringify({
    //                 motivo: response.motivo,
    //                 tempo: response.tempo
    //             }))
    //             router.push("/manutencao")
    //             break
    //     }
    // } catch (error) {
    //     Cookies.set("auth_token", "")
    //     router.push("/erro")
    // }
}

export { modoDashboard }    
import { apiInstagram } from "./api"

const verificarBio = async (usuario) => {
    const response = await apiInstagram.get(`/${usuario}/?__a=1&__d=1`)
    // const response = fetch(`https://instagram.com/${usuario}/?__a=1&__d=1`, {
    //     mode: "no-cors",
    //     headers: {
    //         "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    //     }
    // }).then(res => res.json())
    return ""
}

export { verificarBio }
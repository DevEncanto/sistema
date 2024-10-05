import Cookies from "js-cookie"
import delay from "../utils/delay"
import { api } from "./api"

const validarToken = async () => {
    const { data } = await api.get("/validacao_token")
    return data
}

const loginUsuario = async (iniciarControle, saveLocalStorage, controle, gerenciarControle, statusLogin) => {
    if (controle.usuario === "" || controle.senha === "") {
        await statusLogin("Preencha todos os campos!", "error")
        return
    }

    try {
        gerenciarControle(true, "load", false)

        const response = await api.post("/login_usuario", {
            acesso: controle.usuario,
            senha: controle.senha
        })

        await delay(1200)
        gerenciarControle(false, "load", false)
        const type = response.data.status == 200 ? "sucess" : "error"

        await statusLogin(response.data.message, type)

        console.log(response.data)

        if (response.data.status === 200) {
            iniciarControle(response.data.dados)
            saveLocalStorage(response.data.dados)
            api.defaults.headers['Authorization'] = `Bearer ${response.token}`
            Cookies.set("auth_token", response.data.token)
            controle.router.push("/estoques")
            return
        }
        gerenciarControle(false, "load", false)

    } catch (error) {
        await statusLogin("Falha ao realizar o login!", "error")
    }
}



export {
    validarToken,
    loginUsuario
}
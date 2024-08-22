import Cookie from "js-cookie"
import { loginUsuario, buscarUsuario } from "src/service/RequestAuth"
import delay from "src/utils/delay"
import { api } from "../service/api"
import { dadosAdmin } from "./util-admin"

const login = async (usuario, senha, setMessage, setAlert, router, iniciarControle, setLoad) => {
    if (!usuario || !senha) {
        setAlert("error")
        setMessage("Preencha todos os campos!")
        await delay(4500)
        setMessage("")
    } else {
        try {
            
            setLoad(true)
            const response = await loginUsuario(usuario, senha)
            iniciarControle(response.dados)
            await delay(1200)
            setAlert(response.view)
            setMessage(response.message)
            setLoad(false)
            await delay(2000)
            setMessage("")
            if (response.status == 702) {
                return router.push("/manutencao")
            }

            if (response?.status == 200) {
                api.defaults.headers['Authorization'] = `Bearer ${response.token}`
               
                window.localStorage.setItem("dados", JSON.stringify(response))
                Cookie.set("auth_token", response.token)
                router.push("/estoques")
                console.log("REDIRECT 2")
                // if (response?.tipoUsuario === "USER") {
                //     router.push("/atualizacoes")
                // } else {
                //     window.localStorage.removeItem("user")
                //     await dadosAdmin(setUser, dataUser?.usuario?.idUsuario, setLoad, true)
                //     router.push("/admin/usuarios")
                // }
            }
        } catch (error) {
            console.log(error)
            router.push("/manutencao")
        }
    }
}


export {
    login
}
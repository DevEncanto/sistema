import { UsuariosRepository } from "../repositorys/usuarios.repository"
import delay from "../utils/delay"
import { api } from "./api"
import { AxiosClientAPI } from "./api/axios.client.api"

export class UsuariosService {
    constructor(userContext, dataContext) {
        this.userContext = userContext
        this.dataContext = dataContext
    }

    static build(userContext, dataContext) {
        return new UsuariosService(userContext, dataContext)
    }

    async login() {

        const { controle, gerenciarControle, statusLogin, router } = this.userContext
        const { iniciarControle, saveLocalStorage } = this.dataContext

        console.log(controle.usuario, controle.senha)
        const axiosAPI = new AxiosClientAPI()
        const aRepository = UsuariosRepository.build(axiosAPI.api)

        if (controle.usuario === "" || controle.senha === "") {
            await statusLogin("Preencha todos os campos!", "error")
            return
        }

        try {
            gerenciarControle(true, "load", false)
            const response = await aRepository.login(controle.usuario, controle.senha)
            const {data, status} = response
            
            console.log(data, status)


            await delay(1000)
            gerenciarControle(false, "load", false)

            await statusLogin(data.message, status == 200 ? "green" : "error")
            if (status) {

                axiosAPI.setBearerToken(data.token)
                axiosAPI.setCookieAuthToken(data.token)
                router.push("/home")
            }
            gerenciarControle(false, "load", false)
        } catch (error) {
            gerenciarControle(false, "load", false)
            await statusLogin("Uma falha no sistema foi detectada!", "error")
            console.log(error)
        }
    }
}
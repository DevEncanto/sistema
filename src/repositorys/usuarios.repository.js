export class UsuariosRepository {

    static ERROR_CLIENT = "É necessário informar um cliente!"

    constructor(client) { }

    static build(client) {
        return client ? new UsuariosRepository(client) : new Error(this.ERROR_CLIENT)
    }

    async login(usuario, senha) {
        const url = "/usuarios/login"
        return await this.client.post(url, { usuario, senha })
    }
}
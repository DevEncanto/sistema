export class LotesEtiquetasRepository {

    static ERROR_CLIENT = "É necessário informar um cliente!"

    constructor(client) {
        this.client = client
    }

    static build(client) {
        return client ? new LotesEtiquetasRepository(client) : new Error(this.ERROR_CLIENT)
    }

    async create(lote_etiqueta) {
        const url = "/lote_etiquetas/create"
        return this.client.post(url, { ...lote_etiqueta })
    }

    async update() {

    }

    async delete() {

    }
    async findOne() {

    }

    async finAll() {

    }
}
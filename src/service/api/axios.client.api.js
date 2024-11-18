import axios from 'axios'
import cookie from 'js-cookie'
import { logger } from '../../utils/logger'

export class AxiosClientAPI {

    api
    token
    cookie
    baseURL
    apiKey

    constructor() {
        this.cookie = cookie
        this.api = axios.create({
            baseURL: "http://localhost:4000", // Pode ser alterado conforme seu servidor
        })
        this.token = cookie.get("auth_token") // Lê o token de um cookie normal (não HttpOnly)
        if (this.token) {
            this.setBearerToken(this.token)
        }
        this.apiKey = "jQ3k7H2m5N6p8R9t0S1uV2wX3yZ4a5b6c7d8e9f0g1h2i3j4k5l6m7n8o9p0q1r2s3t4u5v6w7x8y9z0A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6"
    }

    setBearerToken(token) {
        this.api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    // Método para definir um cookie com HttpOnly no servidor
    async setCookieAuthToken(token, creationTimestamp, expirationTimestamp, logout = false) {
        try {
            const data = {
                apiKey: this.apiKey,
                token,
                creationTimestamp,
                expirationTimestamp,
                logout
            }
            const response = await this.api.post('http://localhost:3000/api/set-cookie', data)
            if (response.status === 200) {
                return true
            }
            return false
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

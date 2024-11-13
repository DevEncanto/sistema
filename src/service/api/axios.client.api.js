import axios from 'axios'
import cookie from 'js-cookie'

export class AxiosClientAPI {

    api
    token
    cookie

    constructor() {
        this.cookie = cookie
        this.api = axios.create({
            baseURL: "http://localhost:4000"
        })
        this.token = cookie.get("auth_token")
        if (this.token) {
            this.setBearerToken(this.token)
        }
    }

    setBearerToken(token) {
        this.api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    setCookieAuthToken(token) {
        this.cookie.set("auth_token", token)
    }
}

import axios from 'axios'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

export class AxiosClientAPI {

    static api
    static token
    static cookie
    static router

    constructor() {
        this.cookie = cookie
        this.router = useRouter()
    }

    static build() {
        this.token = cookie.get("auth_token")
        this.api = axios.create({
            baseURL: "http://localhost:4000"
        })
        if (this.token) {
            this.setBearerToken(this.token)
        }
        return this.api
    }

    setBearerToken(token) {
        this.api.defaults.headers['Authorization'] = `Bearer ${token}`
    }

    setCookieAuthToken(token) {
        this.cookie.set("auth_token", token)
    }

    setPushRoute(route) {
        this.router.push(route)
    }
}
import axios from 'axios'
import Cookie from 'js-cookie'

const token = Cookie.get("auth_token")
const mode = "local"
const api = axios.create({
    baseURL: mode == "nuvem" ? "https://encanto-service.online/api/" : "http://localhost:4000/api"
})


if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}
export { api }
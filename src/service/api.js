import axios from 'axios'
import Cookie from 'js-cookie'

const token = Cookie.get("auth_token")
const mode = "nuvem"
const api = axios.create({
    baseURL: mode == "nuvem" ? "https://encanto-service.online/api/" : "http://localhost:4000/api"
})

const apiInstagram = axios.create({
    baseURL: "https://www.instagram.com"
})

apiInstagram.defaults.headers.get['Access-Control-Allow-Origin'] = "*"


if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`
}
export { api, apiInstagram }
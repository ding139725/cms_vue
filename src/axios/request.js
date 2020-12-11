import axios from 'axios'
const service = axios.create({
    baseURL: "http://127.0.0.1:7001/api",
    timeout: 5000
})
service.interceptors.request.use(
    config => {
        if (localStorage.getItem("token")) {
            config.headers['token'] = sessionStorage.getItem("token")
        }
        return config
    }
)

export default service;
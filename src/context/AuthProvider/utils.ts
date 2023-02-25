import api from "../../services/api";


export async function LoginRequest (email: string, password: string) {
    const response = await api.post('/api/auth-admin/login', { email: email, password: password})
    api.defaults.headers.Authorization = `Bearer ${response.data.token}`
    // console.debug("retorno", response)
}
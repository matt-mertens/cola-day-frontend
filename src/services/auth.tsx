import axios, { AxiosInstance } from 'axios';

export const authApiClient = async (): Promise<AxiosInstance> => {
    let accessToken = localStorage.getItem('accessToken')

    return axios.create({
        baseURL: `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PREFIX}`,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const authApi = {
    auth: {
        async signUp(email: string, password: string) {
            return (await authApiClient()).post('/auth/signup', { email, password })
        },
        async signIn(email: string, password: string) {
            return (await authApiClient()).post(`/auth/signin`, { email, password })
        },
    },
    user: {
        async getAuthenticatedUser() {
            return (await authApiClient()).get('/auth/user/me')
        },
        async getUser(id: string) {
            return (await authApiClient()).get(`/auth/user/${id}`)
        }
    }
}
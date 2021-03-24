import axios, { AxiosInstance } from 'axios';

export const authApiClient = async (): Promise<AxiosInstance> => {
    return axios.create({
        baseURL: `${process.env.REACT_APP_API_HOST}${process.env.REACT_APP_API_PREFIX}`,
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
        async getUser() {
            return (await authApiClient()).get('/auth/user/me')
        }
    }
}
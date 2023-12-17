import axios, { AxiosInstance } from 'axios';

export class AuthService {
    private readonly httpClient: AxiosInstance;
    constructor(baseURL: string) {
        this.httpClient = axios.create({
            baseURL
        });
    }

    async login(email: string, password: string) {
        const { data } = await this.httpClient.post('/auth/login', {
            email,
            password
        });
        const { token } = data;
        return token;
    }

    async register(account_name: string, email: string, name: string, password: string) {
        const { data } = await this.httpClient.post('/auth/register', {
            account_name,
            email,
            name,
            password
        });
        return data;
    }
}

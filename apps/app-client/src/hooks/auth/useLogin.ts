import { authService } from '../../services';
import { setCookie } from 'typescript-cookie';

export const useLogin = () => {
    const login = async (username: string, password: string) => {
        const token = await authService.login(username, password);
        if (token) {
            setCookie('authToken', token);
        }
        return token;
    };

    return { login };
};

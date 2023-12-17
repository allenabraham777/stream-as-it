import { authService } from '../../services';

export const useRegister = () => {
    const register = async (account: string, email: string, name: string, password: string) => {
        return await authService.register(account, email, name, password);
    };

    return { register };
};

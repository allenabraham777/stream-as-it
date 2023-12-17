import { removeCookie } from 'typescript-cookie';

export const useLogout = () => {
    const logout = () => {
        removeCookie('authToken');
    };
    return { logout };
};

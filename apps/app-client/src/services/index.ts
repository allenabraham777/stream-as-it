import { AuthService } from './auth.service';

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/authentication`;

export const authService = new AuthService(BASE_URL);

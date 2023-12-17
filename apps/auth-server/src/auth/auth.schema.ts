import { z } from 'zod';

export const CreateUserSchema = z.object({
    account_name: z.string(),
    email: z.string().email(),
    name: z.string(),
    password: z.string()
});

export const LoginUserSchema = z.object({
    email: z.string(),
    password: z.string()
});

import { z } from 'zod';

export const CreateUserSchema = z.object({
  account_name: z.string(),
  email: z.string().email(),
  username: z.string(),
  password: z.string(),
});

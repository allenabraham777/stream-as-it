import { z } from 'zod';

export const CreateStreamSchema = z.object({
  stream_title: z.string(),
  stream_description: z.string(),
});

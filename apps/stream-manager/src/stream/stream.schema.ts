import { z } from 'zod';

export const CreateStreamSchema = z.object({
    stream_title: z.string(),
    stream_description: z.string()
});

export const CreateStreamKeySchema = z.object({
    stream_url: z.string(),
    stream_key: z.string(),
    platform: z.string(),
    video_id: z.string().optional()
});

export const UpdateStreamKeySchema = z.object({
    stream_url: z.string(),
    stream_key: z.string(),
    video_id: z.string().optional()
});

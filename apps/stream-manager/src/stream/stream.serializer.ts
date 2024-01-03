import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class StreamSerializer {
    @Expose()
    readonly id: number;

    @Expose()
    readonly stream_title: string;

    @Expose()
    readonly stream_description: string;

    @Expose()
    readonly user_id: number;

    @Expose()
    readonly account_id: number;

    @Expose()
    @Type(() => StreamKeySerializer)
    readonly stream_keys: StreamKeySerializer[];

    constructor(partial: Partial<StreamSerializer>) {
        Object.assign(this, partial);
    }
}

@Exclude()
export class StreamKeySerializer {
    @Expose()
    readonly id: number;

    @Expose()
    readonly stream_id: number;

    @Expose()
    readonly platform: string;

    @Expose()
    readonly stream_url?: string;

    @Expose()
    readonly stream_key: string;

    @Expose()
    readonly video_id?: string | null;

    constructor(partial: Partial<StreamKeySerializer>) {
        Object.assign(this, partial);
    }
}

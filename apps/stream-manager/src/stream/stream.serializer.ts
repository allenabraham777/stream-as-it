import { Exclude, Expose } from 'class-transformer';

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

    constructor(partial: Partial<StreamSerializer>) {
        Object.assign(this, partial);
    }
}

import { Column, Entity, ManyToOne, RelationId, Unique } from 'typeorm';
import { Account } from './account.entity';
import { AbstractEntity } from '../abstract.entity';
import { Stream } from './stream.entity';

@Entity()
@Unique(['stream_id', 'platform'])
export class StreamKey extends AbstractEntity<StreamKey> {
    @RelationId((stream: Stream) => stream.id)
    stream_id: number;

    @Column()
    platform: string;

    @Column()
    stream_key: string;

    @Column()
    stream_url?: string;

    @Column()
    video_id?: string;

    @RelationId((account: Account) => account.id)
    account_id: number;

    @ManyToOne(() => Stream)
    stream: Stream[];

    @ManyToOne(() => Account)
    account: Account;
}

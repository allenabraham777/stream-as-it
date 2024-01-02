import { Column, Entity, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { Account } from './account.entity';
import { AbstractEntity } from '../abstract.entity';
import { Stream } from './stream.entity';

@Entity()
@Unique(['stream', 'platform'])
export class StreamKey extends AbstractEntity<StreamKey> {
    @Column()
    platform: string;

    @Column()
    stream_key: string;

    @Column({ nullable: true })
    stream_url?: string;

    @Column({ nullable: true })
    video_id?: string;

    @Column()
    stream_id: number;

    @Column()
    account_id: number;

    @ManyToOne(() => Stream, (stream) => stream.stream_keys)
    @JoinColumn({ name: 'stream_id' })
    stream: Stream;

    @ManyToOne(() => Account, (account) => account.stream_keys)
    @JoinColumn({ name: 'account_id' })
    account: Account;
}

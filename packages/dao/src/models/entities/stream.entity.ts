import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { AbstractEntity } from '../abstract.entity';
import { StreamKey } from './streamKey.entity';

@Entity()
export class Stream extends AbstractEntity<Stream> {
    @Column()
    stream_title: string;

    @Column()
    stream_description: string;

    @Column({ default: false })
    is_live: boolean;

    @Column()
    user_id: number;

    @Column()
    account_id: number;

    @OneToMany(() => StreamKey, (streamKey) => streamKey.stream)
    stream_keys: StreamKey[];

    @ManyToOne(() => User, (user) => user.streams)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => Account, (account) => account.streams)
    @JoinColumn({ name: 'account_id' })
    account: Account;
}

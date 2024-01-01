import { Column, Entity, OneToMany } from 'typeorm';

import { User } from './user.entity';
import { AbstractEntity } from '../abstract.entity';
import { Stream } from './stream.entity';
import { StreamKey } from './streamKey.entity';

@Entity()
export class Account extends AbstractEntity<Account> {
    @Column({ unique: true })
    account_name: string;

    @OneToMany(() => User, (user) => user.account)
    users: User[];

    @OneToMany(() => Stream, (stream) => stream.account)
    streams: Stream[];

    @OneToMany(() => StreamKey, (streamKey) => streamKey.account)
    stream_keys: StreamKey[];
}

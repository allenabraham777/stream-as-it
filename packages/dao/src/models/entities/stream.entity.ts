import { Column, Entity, JoinTable, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { User } from './user.entity';
import { Account } from './account.entity';
import { AbstractEntity } from '../abstract.entity';
import { StreamKey } from './streamKey.entity';

@Entity()
export class Stream extends AbstractEntity<Stream> {
    @RelationId((user: User) => user.id)
    user_id: number;

    @RelationId((account: Account) => account.id)
    account_id: number;

    @Column()
    stream_title: string;

    @Column()
    stream_description: string;

    @Column({ default: false })
    is_live: boolean;

    @OneToMany(() => StreamKey, (streamKey) => streamKey.stream)
    @JoinTable()
    stream_keys: StreamKey[];

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Account)
    account: Account;
}

import { Entity, Column, ManyToOne, Unique, RelationId, OneToMany } from 'typeorm';

import { Account } from './account.entity';
import { Stream } from './stream.entity';
import { AbstractEntity } from '../abstract.entity';

@Entity()
@Unique(['email', 'account_id'])
export class User extends AbstractEntity<User> {
    @Column()
    @RelationId((account: Account) => account.id)
    account_id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    email_verified: boolean;

    @Column()
    verification_token?: string;

    @Column()
    reset_token?: string;

    @OneToMany(() => Stream, (stream) => stream.account)
    streams: Stream[];

    @ManyToOne(() => Account)
    account: Account;
}

import { Entity, Column, ManyToOne, Unique, JoinColumn, OneToMany } from 'typeorm';

import { Account } from './account.entity';
import { Stream } from './stream.entity';
import { AbstractEntity } from '../abstract.entity';

@Entity()
@Unique(['email', 'account'])
export class User extends AbstractEntity<User> {
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    email_verified: boolean;

    @Column({ nullable: true })
    verification_token?: string;

    @Column({ nullable: true })
    reset_token?: string;

    @Column()
    account_id: number;

    @OneToMany(() => Stream, (stream) => stream.user)
    streams: Stream[];

    @ManyToOne(() => Account, (account) => account.users)
    @JoinColumn({ name: 'account_id' })
    account: Account;
}

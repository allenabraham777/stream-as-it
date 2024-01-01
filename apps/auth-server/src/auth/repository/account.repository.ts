import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository, Account } from '@stream-as-it/dao';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AccountRepository extends AbstractRepository<Account> {
    protected readonly logger = new Logger(AccountRepository.name);

    constructor(
        @InjectRepository(Account)
        accountRepository: Repository<Account>,
        entityManager: EntityManager
    ) {
        super(accountRepository, entityManager);
    }
}

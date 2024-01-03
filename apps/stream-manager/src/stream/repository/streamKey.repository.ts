import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { AbstractRepository, StreamKey } from '@stream-as-it/dao';

@Injectable()
export class StreamKeyRepository extends AbstractRepository<StreamKey> {
    protected readonly logger = new Logger(StreamKeyRepository.name);

    constructor(
        @InjectRepository(StreamKey)
        streamKeyRepository: Repository<StreamKey>,
        entityManager: EntityManager
    ) {
        super(streamKeyRepository, entityManager);
    }
}

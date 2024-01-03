import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { AbstractRepository, Stream } from '@stream-as-it/dao';

@Injectable()
export class StreamRepository extends AbstractRepository<Stream> {
    protected readonly logger = new Logger(StreamRepository.name);

    constructor(
        @InjectRepository(Stream)
        streamRepository: Repository<Stream>,
        entityManager: EntityManager
    ) {
        super(streamRepository, entityManager);
    }
}

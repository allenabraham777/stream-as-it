import { Logger, NotFoundException } from '@nestjs/common';
import { AbstractEntity } from '../models/abstract.entity';
import { EntityManager, FindOptionsRelations, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class AbstractRepository<T extends AbstractEntity<T>> {
    protected abstract readonly logger: Logger;

    constructor(
        private readonly repository: Repository<T>,
        private readonly entityManager: EntityManager
    ) {}

    async create(entity: T, entityManager?: EntityManager): Promise<T> {
        const manager = entityManager || this.entityManager;
        return manager.save(entity);
    }

    async findOne(
        where: FindOptionsWhere<T>,
        relations: FindOptionsRelations<T> = {},
        entityManager?: EntityManager
    ): Promise<T> {
        const manager = entityManager || this.entityManager;

        const entity = await manager.withRepository(this.repository).findOne({ where, relations });

        if (!entity) {
            this.logger.warn('Document not found with where', where);
            throw new NotFoundException('Entity not found.');
        }

        return entity;
    }

    async findOneWithoutError(
        where: FindOptionsWhere<T>,
        relations: FindOptionsRelations<T> = {},
        entityManager?: EntityManager
    ): Promise<T> {
        const manager = entityManager || this.entityManager;

        return await manager.withRepository(this.repository).findOne({ where, relations });
    }

    async findOneAndUpdate(
        where: FindOptionsWhere<T>,
        partialEntity: QueryDeepPartialEntity<T>,
        entityManager?: EntityManager
    ) {
        const manager = entityManager || this.entityManager;

        const updateResult = await manager
            .withRepository(this.repository)
            .update(where, partialEntity);

        if (!updateResult.affected) {
            this.logger.warn('Entity not found with where', where);
            throw new NotFoundException('Entity not found.');
        }

        return this.findOne(where);
    }

    async find(where: FindOptionsWhere<T>, entityManager?: EntityManager) {
        const manager = entityManager || this.entityManager;

        return manager.withRepository(this.repository).findBy(where);
    }

    async findOneAndDelete(where: FindOptionsWhere<T>, entityManager?: EntityManager) {
        const manager = entityManager || this.entityManager;

        await manager.withRepository(this.repository).delete(where);
    }

    async transactionalOperation(
        operation: (transactionalEntityManager: EntityManager) => Promise<T>
    ): Promise<T> {
        return this.repository.manager.transaction(async (transactionalEntityManager) => {
            return await operation(transactionalEntityManager);
        });
    }
}

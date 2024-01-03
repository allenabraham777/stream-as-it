import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Stream, StreamKey } from '@stream-as-it/dao';
import { User } from '@stream-as-it/types';

import { AddStreamKeyDTO, CreateStreamDTO, UpdateStreamKeyDTO } from './stream.dto';
import { StreamKeySerializer, StreamSerializer } from './stream.serializer';
import { StreamRepository } from './repository/stream.repository';
import { StreamKeyRepository } from './repository/streamKey.repository';

@Injectable()
export class StreamService {
    constructor(
        private readonly streamRepository: StreamRepository,
        private readonly streamKeyRepository: StreamKeyRepository
    ) {}

    async createStream(
        createStreamDto: CreateStreamDTO,
        user: User,
        serializeData: boolean = false
    ) {
        const { stream_title, stream_description } = createStreamDto;
        const stream = await this.streamRepository.transactionalOperation(async (entityManager) => {
            const newStream = new Stream({
                stream_title,
                stream_description,
                is_live: false,
                account_id: user.account_id,
                user_id: user.id
            });
            return await this.streamRepository.create(newStream, entityManager);
        });
        if (serializeData) {
            return new StreamSerializer(stream);
        }
        return stream;
    }

    async findAllStreams(user: User, serializeData: boolean = false) {
        const { account_id } = user;
        const streams = await this.streamRepository.find({ account_id });
        if (serializeData) {
            return streams.map((stream) => new StreamSerializer(stream));
        }
        return streams;
    }

    async findStreamById(id: number, user: User, serializeData: boolean = false) {
        const { account_id } = user;
        const stream = await this.streamRepository.findOne(
            { id, account_id },
            { stream_keys: true }
        );
        if (!stream) {
            throw new HttpException('No such stream', HttpStatus.NOT_FOUND);
        }
        if (serializeData) {
            return new StreamSerializer(stream);
        }
        return stream;
    }

    async removeStreamById(id: number, user: User) {
        const { id: user_id, account_id } = user;
        try {
            await this.streamRepository.transactionalOperation(async (entityManager) => {
                await this.streamKeyRepository.findOneAndDelete(
                    {
                        stream_id: id,
                        account_id
                    },
                    entityManager
                );
                await this.streamRepository.findOneAndDelete(
                    {
                        id,
                        user_id,
                        account_id
                    },
                    entityManager
                );
                return null;
            });
        } catch (error) {
            if (error?.code === 'P2025') {
                throw new HttpException('No such stream', HttpStatus.NOT_FOUND);
            }
            throw new HttpException('Something went wrong.', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Stream deleted', HttpStatus.OK);
    }

    async addStreamKeys(
        addStreamKeyDTO: AddStreamKeyDTO,
        stream_id: number,
        user: User,
        serializeData: boolean = false
    ) {
        const { account_id } = user;
        const streamKey = await this.streamKeyRepository.transactionalOperation(
            async (entityManager) => {
                const existingStreamKey = await this.streamKeyRepository.findOneWithoutError({
                    stream_id,
                    platform: addStreamKeyDTO.platform,
                    account_id
                });
                if (existingStreamKey) {
                    throw new HttpException(
                        'Stream key already exists for the give platform',
                        HttpStatus.CONFLICT
                    );
                }
                const newStreamKey = new StreamKey({
                    ...addStreamKeyDTO,
                    account_id,
                    stream_id
                });
                return await this.streamKeyRepository.create(newStreamKey, entityManager);
            }
        );
        if (serializeData) {
            return new StreamKeySerializer(streamKey);
        }
        return streamKey;
    }

    async updateStreamKeyById(
        updateStreamKeyDTO: UpdateStreamKeyDTO,
        id: number,
        stream_id: number,
        user: User,
        serializeData: boolean = false
    ) {
        const { account_id } = user;
        const streamKey = await this.streamKeyRepository.transactionalOperation(
            async (entityManager) => {
                return this.streamKeyRepository.findOneAndUpdate(
                    {
                        id,
                        stream_id,
                        account_id
                    },
                    updateStreamKeyDTO,
                    entityManager
                );
            }
        );
        if (serializeData) {
            return new StreamKeySerializer(streamKey);
        }
        return streamKey;
    }

    async deleteStreamKeyById(id: number, stream_id: number, user: User) {
        const { account_id } = user;
        this.streamKeyRepository.findOneAndDelete({
            id,
            stream_id,
            account_id
        });

        return { success: true };
    }
}

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';

import { PrismaService, PRISMA_INJECTION_TOKEN } from '@stream-as-it/db';
import { User } from '@stream-as-it/types';

import { AddStreamKeyDTO, CreateStreamDTO } from './stream.dto';
import { StreamKeySerializer, StreamSerializer } from './stream.serializer';

@Injectable()
export class StreamService {
    constructor(@Inject(PRISMA_INJECTION_TOKEN) private prisma: PrismaService) {}

    async createStream(
        createStreamDto: CreateStreamDTO,
        user: User,
        serializeData: boolean = false
    ) {
        const { stream_title, stream_description } = createStreamDto;
        const stream = await this.prisma.$transaction(async (t) => {
            const stream = await t.stream.create({
                data: {
                    stream_title,
                    stream_description,
                    is_live: false,
                    account_id: user.account_id,
                    user_id: user.id
                }
            });
            return stream;
        });
        if (serializeData) {
            return new StreamSerializer(stream);
        }
        return stream;
    }

    async findAllStreams(user: User, serializeData: boolean = false) {
        const { id, account_id } = user;
        const streams = await this.prisma.stream.findMany({
            where: { account_id, user_id: id }
        });
        if (serializeData) {
            return streams.map((stream) => new StreamSerializer(stream));
        }
        return streams;
    }

    async findStreamById(id: number, user: User, serializeData: boolean = false) {
        const { id: user_id, account_id } = user;
        const stream = await this.prisma.stream.findFirst({
            where: { id, user_id, account_id },
            include: {
                stream_keys: true
            }
        });
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
            await this.prisma.stream.deleteSoft({
                where: {
                    id,
                    user_id,
                    account_id
                }
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
        const streamKey = await this.prisma.$transaction(async (t) => {
            const streamKey = await t.streamKey.create({
                data: {
                    ...addStreamKeyDTO,
                    account_id,
                    stream_id
                }
            });
            return streamKey;
        });
        if (serializeData) {
            return new StreamKeySerializer(streamKey);
        }
        return streamKey;
    }
}

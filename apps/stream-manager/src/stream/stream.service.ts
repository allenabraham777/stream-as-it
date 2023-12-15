import { Injectable } from '@nestjs/common';

import { PrismaService } from '@stream-as-it/db';

import { CreateStreamDTO } from './stream.dto';

@Injectable()
export class StreamService {
  constructor(private prisma: PrismaService) {}

  async create(
    createStreamDto: CreateStreamDTO,
    user: { account_id: number; id: number },
  ) {
    const { stream_title, stream_description } = createStreamDto;
    const stream = await this.prisma.$transaction(async (t) => {
      const stream = await t.stream.create({
        data: {
          stream_title,
          stream_description,
          is_live: false,
          account_id: user.account_id,
          user_id: user.id,
        },
      });
      return stream;
    });
    return stream;
  }

  findAll() {
    return `This action returns all stream`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stream`;
  }

  remove(id: number) {
    return `This action removes a #${id} stream`;
  }
}

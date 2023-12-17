import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { ZodValidationPipe } from '@stream-as-it/pipes';
import { BaseController } from '@stream-as-it/server-class';
import { Auth } from '@stream-as-it/types';

import { StreamService } from './stream.service';
import { CreateStreamDTO } from './stream.dto';
import { CreateStreamSchema } from './stream.schema';
import { StreamSerializer } from './stream.serializer';

@ApiTags('stream')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('stream')
export class StreamController extends BaseController {
    constructor(private readonly streamService: StreamService) {
        super();
    }

    @Post('new')
    async create(
        @Request() req: { user: Auth.User },
        @Body(new ZodValidationPipe(CreateStreamSchema))
        createStreamDto: CreateStreamDTO
    ) {
        const user = req.user;
        const stream = await this.streamService.createStream(createStreamDto, user);
        return this.serializeData(stream, StreamSerializer);
    }

    @Get()
    async findAll(@Request() req: { user: Auth.User }) {
        const { user } = req;
        const streams = await this.streamService.findAllStreams(user);
        return this.serializeData(streams, StreamSerializer);
    }

    @Get(':id')
    async findOne(@Request() req: { user: Auth.User }, @Param('id') id: string) {
        const { user } = req;
        const stream = await this.streamService.findStreamById(+id, user);
        return this.serializeData(stream, StreamSerializer);
    }

    @Delete(':id')
    async remove(@Request() req: { user: Auth.User }, @Param('id') id: string) {
        const { user } = req;
        return await this.streamService.removeStreamById(+id, user);
    }
}

import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Request,
    Put
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@stream-as-it/server-class';
import { User } from '@stream-as-it/types';

import { StreamService } from './stream.service';
import { AddStreamKeyDTO, CreateStreamDTO, UpdateStreamKeyDTO } from './stream.dto';
import { StreamKeySerializer, StreamSerializer } from './stream.serializer';

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
        @Request() req: { user: User },
        @Body()
        createStreamDto: CreateStreamDTO
    ) {
        const user = req.user;
        const stream = await this.streamService.createStream(createStreamDto, user);
        return this.serializeData(stream, StreamSerializer);
    }

    @Get()
    async findAll(@Request() req: { user: User }) {
        const { user } = req;
        const streams = await this.streamService.findAllStreams(user);
        return this.serializeData(streams, StreamSerializer);
    }

    @Get(':id')
    async findOne(@Request() req: { user: User }, @Param('id') id: string) {
        const { user } = req;
        const stream = await this.streamService.findStreamById(+id, user);

        return this.serializeData(stream, StreamSerializer);
    }

    @Delete(':id')
    async remove(@Request() req: { user: User }, @Param('id') id: string) {
        const { user } = req;
        return await this.streamService.removeStreamById(+id, user);
    }

    @Post(':stream_id/key/new')
    async addStreamKey(
        @Request() req: { user: User },
        @Param('stream_id') stream_id: string,
        @Body() addStreamKeyDTO: AddStreamKeyDTO
    ) {
        const { user } = req;
        const streamKey = await this.streamService.addStreamKeys(addStreamKeyDTO, +stream_id, user);
        return this.serializeData(streamKey, StreamKeySerializer);
    }

    @Put(':stream_id/key/:stream_key_id')
    async updateStreamKey(
        @Request() req: { user: User },
        @Param('stream_id') stream_id: string,
        @Param('stream_key_id') stream_key_id: string,
        @Body() updateStreamKeyDTO: UpdateStreamKeyDTO
    ) {
        const { user } = req;
        const streamKey = await this.streamService.updateStreamKeyById(
            updateStreamKeyDTO,
            +stream_key_id,
            +stream_id,
            user
        );
        return this.serializeData(streamKey, StreamKeySerializer);
    }

    @Delete(':stream_id/key/:stream_key_id')
    async deleteStreamKey(
        @Request() req: { user: User },
        @Param('stream_id') stream_id: string,
        @Param('stream_key_id') stream_key_id: string
    ) {
        const { user } = req;
        return await this.streamService.deleteStreamKeyById(+stream_key_id, +stream_id, user);
    }
}

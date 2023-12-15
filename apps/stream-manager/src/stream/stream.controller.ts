import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { BaseController } from '@stream-as-it/server-class';
import { ZodValidationPipe } from '@stream-as-it/pipes';

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
    @Request() req: { user: { account_id: number; id: number } },
    @Body(new ZodValidationPipe(CreateStreamSchema))
    createStreamDto: CreateStreamDTO,
  ) {
    const user = req.user;
    const stream = await this.streamService.create(createStreamDto, user);
    return this.serializeData(stream, StreamSerializer);
  }

  @Get()
  findAll() {
    return this.streamService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.streamService.remove(+id);
  }
}

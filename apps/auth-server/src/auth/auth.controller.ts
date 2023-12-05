import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ZodValidationPipe } from '@stream-as-it/pipes';
import { BaseController } from '@stream-as-it/server-class';
import { CreateUserSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { CreateUserDTO, UpdateUserDTO } from './auth.dto';
import { UserSerializer } from './auth.serializer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDTO,
  ) {
    const createdUser = await this.authService.create(createUserDto);
    return this.serializeData(createdUser, UserSerializer);
  }

  @Get()
  async findAll() {
    const users = await this.authService.findAll();
    return this.serializeData(users, UserSerializer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.authService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}

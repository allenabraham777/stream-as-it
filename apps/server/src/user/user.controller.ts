import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO, UpdateUserDTO } from './user.dto';
import { ZodValidationPipe } from 'pipes/zode-validation/zod-validation.pipe';
import { CreateUserSchema } from './user.schema';
import { UserSerializer } from './user.serializer';
import { BaseController } from 'base/base.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Post()
  async create(
    @Body(new ZodValidationPipe(CreateUserSchema)) createUserDto: CreateUserDTO,
  ) {
    const createdUser = await this.userService.create(createUserDto);
    return this.serializeData(createdUser, UserSerializer);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return this.serializeData(users, UserSerializer);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDTO) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}

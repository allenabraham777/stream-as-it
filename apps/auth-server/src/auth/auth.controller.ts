import { Controller, Post, Body } from '@nestjs/common';
import { ZodValidationPipe } from '@stream-as-it/pipes';
import { BaseController } from '@stream-as-it/server-class';
import { CreateUserSchema, LoginUserSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { RegisterUserDTO, LoginUserDTO } from './auth.dto';
import { LoginResponseSerializer, UserSerializer } from './auth.serializer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('register')
  async register(
    @Body(new ZodValidationPipe(CreateUserSchema))
    createUserDto: RegisterUserDTO,
  ) {
    const createdUser = await this.authService.register(createUserDto);
    return this.serializeData(createdUser, UserSerializer);
  }

  @Post('login')
  async login(
    @Body(new ZodValidationPipe(LoginUserSchema)) loginUserDTO: LoginUserDTO,
  ) {
    const token = await this.authService.login(loginUserDTO);
    return this.serializeData(token, LoginResponseSerializer);
  }
}

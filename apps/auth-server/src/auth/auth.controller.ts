import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { ZodValidationPipe } from '@stream-as-it/pipes';
import { BaseController } from '@stream-as-it/server-class';
import { CreateUserSchema, LoginUserSchema } from './auth.schema';
import { AuthService } from './auth.service';
import { RegisterUserDTO, LoginUserDTO } from './auth.dto';
import {
    LoginResponseSerializer,
    UserSerializer,
    UserVerificationResponseSerializer
} from './auth.serializer';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('auth')
@Controller('auth')
export class AuthController extends BaseController {
    constructor(private readonly authService: AuthService) {
        super();
    }

    @Post('register')
    async register(
        @Body(new ZodValidationPipe(CreateUserSchema))
        createUserDto: RegisterUserDTO
    ) {
        const createdUser = await this.authService.register(createUserDto);
        return this.serializeData(createdUser, UserSerializer);
    }

    @Post('login')
    async login(@Body(new ZodValidationPipe(LoginUserSchema)) loginUserDTO: LoginUserDTO) {
        const token = await this.authService.login(loginUserDTO);
        return this.serializeData(token, LoginResponseSerializer);
    }

    @Get('verify/:user_token/:verification_token')
    async verifyUser(@Param() params: { user_token: string; verification_token: string }) {
        const status = await this.authService.verifyUser(params.user_token, params.user_token);
        return this.serializeData(status, UserVerificationResponseSerializer);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    @Get('user/details')
    async getUserDetails(@Request() req) {
        const user = await this.authService.getUserDetails(req.user);
        return this.serializeData(user, UserSerializer);
    }
}

import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
import { BaseController } from '@stream-as-it/server-class';
import { AuthService } from './auth.service';
import { RegisterUserDTO, LoginUserDTO } from './auth.dto';
import {
    LoginResponseSerializer,
    RefreshTokenResponseSerializer,
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
    async register(@Body() createUserDto: RegisterUserDTO) {
        const createdUser = await this.authService.register(createUserDto);
        return this.serializeData(createdUser, UserSerializer);
    }

    @Post('login')
    async login(@Body() loginUserDTO: LoginUserDTO) {
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

    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt-refresh'))
    @Get('refresh')
    async refreshToken(@Request() req) {
        const tokens = await this.authService.refreshTokens(req.user.user_id, req.user.account_id);
        return this.serializeData(tokens, RefreshTokenResponseSerializer);
    }
}

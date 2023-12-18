import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { hash, compareSync } from 'bcrypt';
import * as crypto from 'crypto';

import { PrismaService, PRISMA_INJECTION_TOKEN } from '@stream-as-it/db';
import { MailService } from '@stream-as-it/email';
import { getTemplate } from '@stream-as-it/html-templates';

import { LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { LoginResponseSerializer, UserSerializer } from './auth.serializer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(PRISMA_INJECTION_TOKEN) private prisma: PrismaService,
        private mail: MailService,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: RegisterUserDTO, serializeData: boolean = false) {
        const { account_name, name, email, password } = createUserDto;
        const user = await this.prisma.$transaction(async (t) => {
            const isExistingAccount = await t.account.findFirst({
                where: { account_name }
            });

            if (isExistingAccount) {
                throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
            }
            const isExistingUser = await t.user.findFirst({
                where: { email }
            });
            if (isExistingUser) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }
            const account = await t.account.create({
                data: { account_name }
            });
            const hashedPassword = await hash(password, 10);
            const verificationToken = crypto.randomBytes(16).toString('hex');
            const user = await t.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    account_id: account.id,
                    verification_token: verificationToken
                }
            });
            return user;
        });
        const userToken = this.jwtService.sign(
            { id: user.id, account_id: user.account_id },
            { secret: process.env.VERIFY_SECRET }
        );
        const html = getTemplate('verification', {
            name: user.name,
            company: `${process.env.COMPANY}`,
            from: `${process.env.AUTHOR}`,
            link: `${process.env.CLIENT_URL}/verification/${userToken}/${user.verification_token}`
        });
        await this.mail.sendMail({
            to: user.email,
            subject: 'Verify your email address',
            text: 'Welcome to stream as it',
            html
        });

        if (serializeData) {
            return new UserSerializer(user);
        }

        return user;
    }

    async login(loginUserDto: LoginUserDTO, serializeData: boolean = false) {
        const user = await this.prisma.user.findFirst({
            where: { email: loginUserDto.email }
        });
        if (!user) {
            throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
        }
        const isValidPassword = compareSync(loginUserDto.password, user.password);
        if (!isValidPassword) {
            throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
        }

        if (!user.email_verified) {
            throw new HttpException('Please verify your email', HttpStatus.FORBIDDEN);
        }

        const accessToken = this.jwtService.sign(
            {
                id: user.id,
                account_id: user.account_id
            },
            {
                expiresIn: '2h'
            }
        );
        const refreshToken = this.jwtService.sign(
            {
                id: user.id,
                account_id: user.account_id
            },
            { secret: process.env.REFRESH_SECRET, expiresIn: '7d' }
        );
        if (serializeData) {
            return new LoginResponseSerializer({ accessToken, refreshToken, ...user });
        }

        return { accessToken, refreshToken, ...user };
    }

    async verifyUser(userToken: string, verificationToken: string) {
        const decoded = this.jwtService.verify(userToken, {
            secret: process.env.VERIFY_SECRET
        });

        await this.prisma.$transaction(async (t) => {
            const user = await t.user.findFirst({
                where: {
                    id: decoded.id,
                    account_id: decoded.account_id,
                    verification_token: verificationToken,
                    email_verified: false
                }
            });
            await t.user.update({
                where: {
                    id: decoded.id,
                    account_id: decoded.account_id,
                    verification_token: verificationToken,
                    email_verified: false
                },
                data: {
                    email_verified: true,
                    verification_token: null
                }
            });
            if (!user) throw new HttpException('Invalid operation', HttpStatus.BAD_REQUEST);
        });
        return { status: true };
    }

    async getUserDetails(
        { id, account_id }: { id: number; account_id: number },
        serializeData: boolean = false
    ) {
        const user = await this.prisma.user.findFirst({
            where: { id, account_id }
        });
        if (serializeData) {
            return new UserSerializer(user);
        }
        return user;
    }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compareSync } from 'bcrypt';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';

import { MailService } from '@stream-as-it/email';
import { getTemplate } from '@stream-as-it/html-templates';

import { LoginUserDTO, RegisterUserDTO } from './auth.dto';
import { LoginResponseSerializer, UserSerializer } from './auth.serializer';
import { UsersRepository } from './repository/user.repository';
import { Account, User } from '@stream-as-it/dao';
import { AccountRepository } from './repository/account.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly userRepository: UsersRepository,
        private readonly accountRepository: AccountRepository,
        private mail: MailService,
        private jwtService: JwtService
    ) {}

    async register(createUserDto: RegisterUserDTO, serializeData: boolean = false) {
        const { account_name, name, email, password } = createUserDto;

        const user = await this.userRepository.transactionalOperation(async (entityManager) => {
            const isExistingAccount = await this.accountRepository.findOneWithoutError(
                { account_name },
                {},
                entityManager
            );

            if (isExistingAccount) {
                throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
            }

            const isExistingUser = await this.userRepository.findOneWithoutError(
                { email },
                {},
                entityManager
            );

            if (isExistingUser) {
                throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
            }

            const newAccount = new Account({ account_name });
            const account = await this.accountRepository.create(newAccount, entityManager);

            const hashedPassword = await hash(password, 10);
            const verificationToken = crypto.randomBytes(16).toString('hex');
            const newUser = new User({
                name,
                email,
                password: hashedPassword,
                account_id: account.id,
                verification_token: verificationToken
            });
            return await this.userRepository.create(newUser, entityManager);
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
        this.mail.sendMail({
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
        const user = await this.userRepository.findOne({ email: loginUserDto.email });
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

        const { accessToken, refreshToken } = await this.getTokens(user.id, user.account_id);

        if (serializeData) {
            return new LoginResponseSerializer({ accessToken, refreshToken, ...user });
        }

        return { accessToken, refreshToken, ...user };
    }

    async verifyUser(userToken: string, verificationToken: string) {
        const decoded = this.jwtService.verify(userToken, {
            secret: process.env.VERIFY_SECRET
        });

        await this.userRepository.transactionalOperation(async (entityManager) => {
            return await this.userRepository.findOneAndUpdate(
                {
                    id: decoded.id,
                    account_id: decoded.account_id,
                    verification_token: verificationToken,
                    email_verified: false
                },
                {
                    email_verified: true,
                    verification_token: null
                },
                entityManager
            );
        });

        return { status: true };
    }

    async getUserDetails(
        { id, account_id }: { id: number; account_id: number },
        serializeData: boolean = false
    ) {
        const user = await this.userRepository.findOne({
            id,
            account_id
        });
        if (serializeData) {
            return new UserSerializer(user);
        }
        return user;
    }

    async refreshTokens(user_id: number, account_id: number) {
        const tokens = await this.getTokens(user_id, account_id);
        return tokens;
    }

    private async getTokens(user_id: number, account_id: number) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    user_id,
                    account_id
                },
                {
                    secret: process.env.JWT_SECRET,
                    expiresIn: '1h'
                }
            ),
            this.jwtService.signAsync(
                {
                    user_id,
                    account_id
                },
                {
                    secret: process.env.REFRESH_SECRET,
                    expiresIn: '7d'
                }
            )
        ]);

        return {
            accessToken,
            refreshToken
        };
    }
}

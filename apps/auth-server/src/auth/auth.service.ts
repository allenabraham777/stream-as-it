import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash, compareSync } from 'bcrypt';
import * as crypto from 'crypto';
import { sign } from 'jsonwebtoken';
import { PrismaService } from '@stream-as-it/db';
import { MailService } from '@stream-as-it/email';
import { getTemplate } from '@stream-as-it/html-templates';
import { LoginUserDTO, RegisterUserDTO, UpdateUserDTO } from './auth.dto';
import { LoginResponseSerializer, UserSerializer } from './auth.serializer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mail: MailService,
  ) {}

  async register(
    createUserDto: RegisterUserDTO,
    serializeData: boolean = false,
  ) {
    const { account_name, name, email, password } = createUserDto;
    const user = await this.prisma.$transaction(async (t) => {
      const isExistingAccount = await t.account.findFirst({
        where: { account_name },
      });
      console.log({ isExistingAccount });

      if (isExistingAccount) {
        throw new HttpException(
          'Account already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      const isExistingUser = await t.user.findFirst({
        where: { email },
      });
      if (isExistingUser) {
        throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
      }
      const account = await t.account.create({
        data: { account_name },
      });
      const hashedPassword = await hash(password, 10);
      const verificationToken = crypto.randomBytes(16).toString('hex');
      const user = await t.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          account_id: account.id,
          verification_token: verificationToken,
        },
      });
      return user;
    });
    const html = getTemplate('verification', {
      name: user.name,
      company: `${process.env.COMPANY}`,
      from: `${process.env.AUTHOR}`,
      link: `${process.env.CLIENT_URL}/verification/${user.verification_token}`,
    });
    await this.mail.sendMail({
      to: user.email,
      subject: 'Verify your email address',
      text: 'Welcome to stream as it',
      html,
    });

    if (serializeData) {
      return new UserSerializer(user);
    }

    return user;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async login(loginUserDto: LoginUserDTO, serializeData: boolean = false) {
    const user = await this.prisma.user.findFirst({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const isValidPassword = compareSync(loginUserDto.password, user.password);
    if (!isValidPassword) {
      throw new HttpException(
        'Invalid email or password',
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = sign(
      { id: user.id, account_id: user.account_id },
      process.env.JWT_SECRET,
      {
        expiresIn: '1d',
      },
    );
    if (serializeData) {
      return new LoginResponseSerializer({ token });
    }

    return { token };
  }

  async update(id: number, updateUserDto: UpdateUserDTO) {
    return await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

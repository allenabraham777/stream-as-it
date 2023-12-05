import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { PrismaService } from '@stream-as-it/db';
import { CreateUserDTO, UpdateUserDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDTO) {
    const { account_name, name, email, password } = createUserDto;
    const isExistingAccount = await this.prisma.account.findFirst({
      where: { account_name },
    });
    if (isExistingAccount) {
      throw new HttpException('Account already exists', HttpStatus.BAD_REQUEST);
    }
    const isExistingUser = await this.prisma.user.findFirst({
      where: { email },
    });
    if (isExistingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }
    const account = await this.prisma.account.create({
      data: { account_name },
    });
    const hashedPassword = await hash(password, 10);
    return await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        account_id: account.id,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
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

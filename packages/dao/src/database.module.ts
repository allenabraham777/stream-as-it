import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Stream, StreamKey, User } from 'models';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                url: configService.getOrThrow('DATABASE_URL'),
                database: configService.getOrThrow('DATABASE_NAME'),
                username: configService.getOrThrow('DATABASE_USERNAME'),
                password: configService.getOrThrow('DATABASE_PASSWORD'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('DATABASE_SYNCHRONIZE')
            }),
            inject: [ConfigService]
        }),
        TypeOrmModule.forFeature([Account, Stream, StreamKey, User])
    ]
})
export class DatabaseModule {}

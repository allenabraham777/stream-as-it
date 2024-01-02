import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account, Stream, StreamKey, User } from './models';
// import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                entities: [Account, Stream, StreamKey, User],
                type: 'postgres',
                host: configService.getOrThrow('POSTGRES_HOST'),
                port: configService.getOrThrow('POSTGRES_PORT'),
                database: configService.getOrThrow('POSTGRES_DB'),
                username: configService.getOrThrow('POSTGRES_USER'),
                password: configService.getOrThrow('POSTGRES_PASSWORD'),
                autoLoadEntities: true,
                synchronize: configService.getOrThrow('DATABASE_SYNCHRONIZE')
            }),
            inject: [ConfigService]
        })
    ]
})
export class DatabaseModule {
    static forFeature() {
        return TypeOrmModule.forFeature([Account, Stream, StreamKey, User]);
    }
}

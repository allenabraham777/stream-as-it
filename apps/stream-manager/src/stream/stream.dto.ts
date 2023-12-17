import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStreamDTO {
    @ApiProperty()
    @IsString()
    readonly stream_title: string;

    @ApiProperty()
    @IsString()
    readonly stream_description: string;
}

export class AddStreamKeyDTO {
    @ApiProperty()
    @IsString()
    readonly platform: string;

    @ApiProperty()
    @IsString()
    readonly stream_key: string;
}

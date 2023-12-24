import { IsString, IsOptional } from 'class-validator';
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
    readonly stream_url: string;

    @ApiProperty()
    @IsString()
    readonly stream_key: string;

    @ApiProperty()
    @IsString()
    readonly platform: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly video_id: string;
}

export class UpdateStreamKeyDTO {
    @ApiProperty()
    @IsString()
    readonly stream_url: string;

    @ApiProperty()
    @IsString()
    readonly stream_key: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly video_id: string;
}

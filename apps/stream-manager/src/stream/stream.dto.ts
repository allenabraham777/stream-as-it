import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStreamDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly stream_title: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly stream_description: string;
}

export class AddStreamKeyDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly stream_url: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly stream_key: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly platform: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly video_id: string;
}

export class UpdateStreamKeyDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly stream_url: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly stream_key: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    readonly video_id: string;
}

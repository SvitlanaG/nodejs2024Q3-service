import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    description: 'The name of the album',
    example: 'Dangerous',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The release year of the album',
    example: 1991,
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    description: 'The ID of the artist who created the album',
    example: 'a0da9b9a-0e4d-4389-8024-29acfe07dba9',
    required: false,
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({
    description: 'The name of the track',
    example: 'Remember the Time',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'The ID of the artist associated with this track',
    example: 'be6a7cd6-e191-4758-8d6f-378713735e1d',
    required: false,
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ApiProperty({
    description: 'The ID of the album associated with this track',
    example: 'a26ed444-641e-4b6b-a69e-84c0cb891b30',
    required: false,
    nullable: true,
  })
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @ApiProperty({
    description: 'The duration of the track in seconds',
    example: 239,
  })
  @IsInt()
  @Min(1)
  duration: number;
}

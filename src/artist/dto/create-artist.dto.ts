import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    description: 'The name of the artist',
    example: 'Michael Jackson',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy',
    example: true,
  })
  @IsBoolean()
  grammy: boolean;
}

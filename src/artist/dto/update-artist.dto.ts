import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({
    description: 'The name of the artist',
    example: 'Britney Spears',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy',
    example: false,
    required: false,
  })
  grammy?: boolean;
}

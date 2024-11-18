import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateFavDto } from './create-fav.dto';

export class UpdateFavDto extends PartialType(CreateFavDto) {
  @ApiProperty({
    description: 'The ID of the artist to update in favorites',
    example: '526b6e91-0fff-4cef-8a38-f78f27fd013b',
    required: false,
  })
  artistId?: string;

  @ApiProperty({
    description: 'The ID of the album to update in favorites',
    example: '6fe67c9b-a45b-456a-a89b-12d95223b06b',
    required: false,
  })
  albumId?: string;

  @ApiProperty({
    description: 'The ID of the track to update in favorites',
    example: '73c8129b-1406-4145-b020-a8ed48290d4d',
    required: false,
  })
  trackId?: string;
}

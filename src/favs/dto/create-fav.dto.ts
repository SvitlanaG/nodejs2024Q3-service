import { ApiProperty } from '@nestjs/swagger';

export class CreateFavDto {
  @ApiProperty({
    description: 'The ID of the artist to add to favorites',
    example: '73c8129b-1406-4145-b020-a8ed48290d4d',
    required: false,
  })
  artistId?: string;

  @ApiProperty({
    description: 'The ID of the album to add to favorites',
    example: '86aedf63-3598-49d5-bfe8-e6000fb4814f',
    required: false,
  })
  albumId?: string;

  @ApiProperty({
    description: 'The ID of the track to add to favorites',
    example: '01e7b19d-255c-443c-9568-904c383fb1b2',
    required: false,
  })
  trackId?: string;
}

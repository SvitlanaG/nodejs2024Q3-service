import { ApiProperty } from '@nestjs/swagger';

export class AlbumResponse {
  @ApiProperty({
    description: 'The album ID (UUID)',
    example: '8f510c98-6c9b-443b-95dc-44723f60650f',
  })
  id: string;

  @ApiProperty({ description: 'The album name', example: 'Dangerous' })
  name: string;

  @ApiProperty({
    description: 'The year the album was released',
    example: 1991,
  })
  year: number;

  @ApiProperty({
    description: 'The artist ID associated with the album',
    example: 'a0da9b9a-0e4d-4389-8024-29acfe07dba9',
  })
  artistId: string | null;
}

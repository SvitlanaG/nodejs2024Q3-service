import { ApiProperty } from '@nestjs/swagger';

export class ArtistResponse {
  @ApiProperty({
    description: 'The artist ID (UUID)',
    example: '8732c98c-c3f6-4996-9015-0df56b73a18d',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the artist',
    example: 'Michael Jackson',
  })
  name: string;

  @ApiProperty({
    description: 'Indicates if the artist has won a Grammy',
    example: true,
  })
  grammy: boolean;
}

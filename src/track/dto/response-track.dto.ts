import { ApiProperty } from '@nestjs/swagger';

export class TrackResponse {
  @ApiProperty({
    description: 'Unique identifier of the track',
    example: 'f07b6984-d50a-4820-928a-b67af098ddf4',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the track',
    example: 'Remember the Time',
  })
  name: string;

  @ApiProperty({
    description: 'ID of the artist who performed the track',
    example: 'be6a7cd6-e191-4758-8d6f-378713735e1d',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    description: 'ID of the album where the track belongs',
    example: 'a26ed444-641e-4b6b-a69e-84c0cb891b30',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    description: 'Duration of the track in seconds',
    example: 240,
  })
  duration: number;
}

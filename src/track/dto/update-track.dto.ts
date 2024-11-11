import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @ApiProperty({
    description: 'The name of the track',
    example: 'Updated Track Name',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'The ID of the artist associated with this track',
    example: '7192e97c-b453-474a-8c81-ce7ef0789766',
    required: false,
    nullable: true,
  })
  artistId?: string | null;

  @ApiProperty({
    description: 'The ID of the album associated with this track',
    example: '7d8b78d6-52dc-4d90-9b70-bacb07580b22',
    required: false,
    nullable: true,
  })
  albumId?: string | null;

  @ApiProperty({
    description: 'The duration of the track in seconds',
    example: 180,
    required: false,
  })
  duration?: number;
}

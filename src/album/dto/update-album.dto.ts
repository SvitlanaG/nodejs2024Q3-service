import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty({ description: 'The name of the album', required: false })
  name?: string;

  @ApiProperty({
    description: 'The release year of the album',
    required: false,
  })
  year?: number;

  @ApiProperty({
    description: 'The ID of the artist',
    required: false,
    nullable: true,
  })
  artistId?: string | null;
}

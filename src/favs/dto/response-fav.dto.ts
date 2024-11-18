import { ApiProperty } from '@nestjs/swagger';
import { ArtistResponse } from '../../artist/dto/response-artist.dto';
import { AlbumResponse } from '../../album/dto/response-album.dto';
import { TrackResponse } from '../../track/dto/response-track.dto';

export class FavoritesResponse {
  @ApiProperty({
    type: [ArtistResponse],
    description: 'List of favorite artists',
  })
  artists: ArtistResponse[];

  @ApiProperty({
    type: [AlbumResponse],
    description: 'List of favorite albums',
  })
  albums: AlbumResponse[];

  @ApiProperty({
    type: [TrackResponse],
    description: 'List of favorite tracks',
  })
  tracks: TrackResponse[];
}

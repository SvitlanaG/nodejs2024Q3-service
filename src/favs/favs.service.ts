import {
  Injectable,
  Inject,
  forwardRef,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { Favorites, FavoritesResponse } from './interfaces/favs.interface';

@Injectable()
export class FavsService {
  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,

    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
  ) {}

  private async validateItem(id: string, service: any, itemType: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ${itemType} ID`);
    }
    const item = await service.findOne(id);
    if (!item) {
      throw new UnprocessableEntityException(`${itemType} does not exist`);
    }
    return item;
  }

  async addTrack(trackId: string) {
    const track = await this.validateItem(trackId, this.trackService, 'Track');
    if (!this.favs.tracks.includes(track.id)) {
      this.favs.tracks.push(track.id);
    }
    return track;
  }

  async removeTrack(trackId: string) {
    return this.remove(trackId, 'track');
  }

  async addAlbum(albumId: string) {
    const album = await this.validateItem(albumId, this.albumService, 'Album');
    if (!this.favs.albums.includes(album.id)) {
      this.favs.albums.push(album.id);
    }
    return album;
  }

  async removeAlbum(albumId: string) {
    return this.remove(albumId, 'album');
  }

  async addArtist(artistId: string) {
    const artist = await this.validateItem(
      artistId,
      this.artistService,
      'Artist',
    );
    if (!this.favs.artists.includes(artist.id)) {
      this.favs.artists.push(artist.id);
    }
    return artist;
  }

  async removeArtist(artistId: string) {
    return this.remove(artistId, 'artist');
  }

  async findAll(): Promise<FavoritesResponse> {
    const fullArtists = await Promise.all(
      this.favs.artists.map(async (id) => {
        try {
          return await this.artistService.findOne(id);
        } catch {
          return null;
        }
      }),
    );

    const fullAlbums = await Promise.all(
      this.favs.albums.map(async (id) => {
        try {
          return await this.albumService.findOne(id);
        } catch {
          return null;
        }
      }),
    );

    const fullTracks = await Promise.all(
      this.favs.tracks.map(async (id) => {
        try {
          return await this.trackService.findOne(id);
        } catch {
          return null;
        }
      }),
    );

    return {
      artists: fullArtists.filter((artist) => artist !== null),
      albums: fullAlbums.filter((album) => album !== null),
      tracks: fullTracks.filter((track) => track !== null),
    };
  }

  private async remove(id: string, itemType: 'artist' | 'album' | 'track') {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ${itemType} ID`);
    }

    const favsArray = this.favs[itemType + 's'];
    const index = favsArray.indexOf(id);

    if (index === -1) {
      throw new NotFoundException(`${itemType} is not a favorite`);
    }

    favsArray.splice(index, 1);
    await this.removeReferences(id, itemType);

    return { message: `${itemType} removed from favorites` };
  }

  private async removeReferences(id: string, itemType: string) {
    if (itemType === 'artist') {
      await this.albumService.nullifyArtistId(id);
    } else if (itemType === 'album') {
      await this.trackService.nullifyAlbumId(id);
    }
  }
}

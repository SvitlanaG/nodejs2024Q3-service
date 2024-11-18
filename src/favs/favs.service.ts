import {
  Injectable,
  BadRequestException,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { PrismaService } from '../../prisma/prisma.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { TrackService } from '../track/track.service';
import { FavoritesResponse } from './interfaces/favs.interface';

@Injectable()
export class FavsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
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

    await this.prisma.favorites.update({
      where: { id: 'default' },
      data: {
        tracks: {
          connect: { id: track.id },
        },
      },
    });

    return track;
  }

  async removeTrack(trackId: string) {
    return this.remove(trackId, 'tracks');
  }

  async addAlbum(albumId: string) {
    const album = await this.validateItem(albumId, this.albumService, 'Album');
    await this.prisma.favorites.update({
      where: { id: 'default' },
      data: {
        albums: {
          connect: { id: album.id },
        },
      },
    });
    return album;
  }

  async removeAlbum(albumId: string) {
    return this.remove(albumId, 'albums');
  }

  async addArtist(artistId: string) {
    const artist = await this.validateItem(
      artistId,
      this.artistService,
      'Artist',
    );
    await this.prisma.favorites.update({
      where: { id: 'default' },
      data: {
        artists: {
          connect: { id: artist.id },
        },
      },
    });
    return artist;
  }

  async removeArtist(artistId: string) {
    return this.remove(artistId, 'artists');
  }

  async findAll(): Promise<FavoritesResponse> {
    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 'default' },
      include: {
        tracks: true,
        albums: true,
        artists: true,
      },
    });

    if (!favorites) {
      throw new NotFoundException('Favorites not found');
    }

    return {
      artists: favorites.artists,
      albums: favorites.albums,
      tracks: favorites.tracks,
    };
  }

  private async remove(id: string, type: 'artists' | 'albums' | 'tracks') {
    if (!isUUID(id)) {
      throw new BadRequestException(`Invalid ${type.slice(0, -1)} ID`);
    }

    const favorites = await this.prisma.favorites.findUnique({
      where: { id: 'default' },
    });

    if (!favorites || !favorites[type].includes(id)) {
      throw new NotFoundException(`${type.slice(0, -1)} is not a favorite`);
    }

    const updatedArray = favorites[type].filter((item) => item !== id);

    await this.prisma.favorites.update({
      where: { id: 'default' },
      data: {
        [type]: updatedArray,
      },
    });

    return { message: `${type.slice(0, -1)} removed from favorites` };
  }
}

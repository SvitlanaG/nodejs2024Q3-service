import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { Favorites } from './interfaces/favs.interface';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { isUUID } from 'class-validator';

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

  async create(createFavDto: CreateFavDto) {
    const { artistId, albumId, trackId } = createFavDto;

    if (artistId) {
      const artist = await this.validateItem(
        artistId,
        this.artistService,
        'Artist',
      );
      this.favs.artists.push(artist.id);
    }

    if (albumId) {
      const album = await this.validateItem(
        albumId,
        this.albumService,
        'Album',
      );
      this.favs.albums.push(album.id);
    }

    if (trackId) {
      const track = await this.validateItem(
        trackId,
        this.trackService,
        'Track',
      );
      this.favs.tracks.push(track.id);
    }

    return this.findAll();
  }

  async findAll() {
    const fullArtists = await Promise.all(
      this.favs.artists.map((id) => this.artistService.findOne(id)),
    );
    const fullAlbums = await Promise.all(
      this.favs.albums.map((id) => this.albumService.findOne(id)),
    );
    const fullTracks = await Promise.all(
      this.favs.tracks.map((id) => this.trackService.findOne(id)),
    );

    return {
      artists: fullArtists,
      albums: fullAlbums,
      tracks: fullTracks,
    };
  }

  async update(id: string, type: 'artist' | 'album' | 'track') {
    const service = this.getServiceByType(type);
    const item = await this.validateItem(id, service, type);

    const favsArray = this.favs[type + 's'];
    if (!favsArray.includes(item.id)) {
      favsArray.push(item.id);
    }
    return { message: `${type} added to favorites` };
  }

  async remove(id: string, type: 'artist' | 'album' | 'track') {
    const service = this.getServiceByType(type);
    const item = await this.validateItem(id, service, type);

    const favsArray = this.favs[type + 's'];
    const index = favsArray.indexOf(item.id);

    if (index === -1) {
      throw new NotFoundException(`${type} is not a favorite`);
    }
    favsArray.splice(index, 1);
    return { message: `${type} removed from favorites` };
  }

  private getServiceByType(type: 'artist' | 'album' | 'track') {
    switch (type) {
      case 'artist':
        return this.artistService;
      case 'album':
        return this.albumService;
      case 'track':
        return this.trackService;
      default:
        throw new BadRequestException(`Invalid favorite type: ${type}`);
    }
  }
}

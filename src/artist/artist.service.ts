import {
  Injectable,
  Inject,
  forwardRef,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from '../album/album.service';
import { TrackService } from '../track/track.service';
import { FavsService } from '../favs/favs.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './interfaces/artist.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
  private artists: Artist[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,

    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      ...createArtistDto,
      id: uuidv4(),
    };
    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((artist) => artist.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    const updatedArtist = {
      ...this.artists[artistIndex],
      ...updateArtistDto,
    };
    this.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string): Artist {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    this.albumService.nullifyArtistId(id);
    this.trackService.nullifyAlbumId(id);
    this.favsService.remove(id, 'artist');
    return this.artists.splice(artistIndex, 1)[0];
  }
}

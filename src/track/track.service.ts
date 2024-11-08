import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './interfaces/track.interface';
import { v4 as uuidv4 } from 'uuid';
import { AlbumService } from '../album/album.service';
import { FavsService } from '../favs/favs.service';

@Injectable()
export class TrackService {
  private tracks: Track[] = [];

  constructor(
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,

    @Inject(forwardRef(() => FavsService))
    private readonly favsService: FavsService,
  ) {}

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return track;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    const updatedTrack = {
      ...this.tracks[trackIndex],
      ...updateTrackDto,
    };
    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string): Track {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    this.favsService.remove(id, 'track');
    return this.tracks.splice(trackIndex, 1)[0];
  }

  nullifyAlbumId(albumId: string) {
    this.tracks = this.tracks.map((track) =>
      track.albumId === albumId ? { ...track, albumId: null } : track,
    );
  }
}

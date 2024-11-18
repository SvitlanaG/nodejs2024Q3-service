import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate as isUuid } from 'uuid';
import { TrackResponse } from './dto/response-track.dto';
import { Track } from './interfaces/track.interface';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackResponse> {
    const track = await this.prisma.track.create({
      data: createTrackDto,
    });
    return this.toTrackResponse(track);
  }

  async findAll(): Promise<TrackResponse[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks.map(this.toTrackResponse);
  }

  async findOne(id: string): Promise<TrackResponse> {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }
    return this.toTrackResponse(track);
  }

  async update(
    id: string,
    updateTrackDto: UpdateTrackDto,
  ): Promise<TrackResponse> {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });
    return this.toTrackResponse(updatedTrack);
  }

  async remove(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const track = await this.prisma.track.findUnique({
      where: { id },
    });

    if (!track) {
      throw new NotFoundException(`Track with ID ${id} not found`);
    }

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    return this.prisma.track.delete({
      where: { id },
    });
  }

  async nullifyAlbumId(albumId: string) {
    await this.prisma.track.updateMany({
      where: { albumId },
      data: { albumId: null },
    });
  }

  async nullifyArtistId(artistId: string) {
    await this.prisma.track.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }

  private toTrackResponse(track: any): TrackResponse {
    return {
      id: track.id,
      name: track.name,
      artistId: track.artistId,
      albumId: track.albumId,
      duration: track.duration,
    };
  }

  async findMany({
    where,
  }: {
    where: { id: { in: string[] } };
  }): Promise<Track[]> {
    return this.prisma.track.findMany({
      where,
    });
  }
}

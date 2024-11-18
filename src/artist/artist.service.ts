import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { validate as isUuid } from 'uuid';
import { Artist } from './interfaces/artist.interface';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with ID ${id} not found`);
    }

    await this.prisma.track.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    await this.prisma.album.updateMany({
      where: { artistId: id },
      data: { artistId: null },
    });

    const favoritesToUpdate = await this.prisma.favorites.findMany({
      where: {
        artists: {
          some: {
            id: id,
          },
        },
      },
    });

    for (const favorite of favoritesToUpdate) {
      await this.prisma.favorites.update({
        where: { id: favorite.id },
        data: {
          artists: {
            disconnect: { id },
          },
        },
      });
    }

    return this.prisma.artist.delete({
      where: { id },
    });
  }

  async findMany({
    where,
  }: {
    where: { id: { in: string[] } };
  }): Promise<Artist[]> {
    return this.prisma.artist.findMany({
      where,
    });
  }
}

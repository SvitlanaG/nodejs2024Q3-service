import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate as isUuid } from 'uuid';
import { Album } from './interfaces/album.interface';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: createAlbumDto,
    });
  }

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    if (!isUuid(id)) {
      throw new BadRequestException('Invalid UUID format');
    }

    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    await this.prisma.track.updateMany({
      where: { albumId: id },
      data: { albumId: null },
    });

    const favoritesToUpdate = await this.prisma.favorites.findMany({
      where: {
        albums: {
          some: {
            id: id,
          },
        },
      },
      include: {
        albums: true,
      },
    });

    for (const favorite of favoritesToUpdate) {
      await this.prisma.favorites.update({
        where: { id: favorite.id },
        data: {
          albums: {
            disconnect: { id },
          },
        },
      });
    }

    return this.prisma.album.delete({
      where: { id },
    });
  }

  async findMany({
    where,
  }: {
    where: { id: { in: string[] } };
  }): Promise<Album[]> {
    return this.prisma.album.findMany({
      where,
    });
  }
}

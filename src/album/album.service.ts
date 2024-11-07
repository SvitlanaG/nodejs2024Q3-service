import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './interfaces/album.interface';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AlbumService {
  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((album) => album.id === id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }

    const updatedAlbum = {
      ...this.albums[albumIndex],
      ...updateAlbumDto,
    };
    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  remove(id: string): Album {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return this.albums.splice(albumIndex, 1)[0];
  }

  nullifyArtistId(artistId: string) {
    this.albums = this.albums.map((album) =>
      album.artistId === artistId ? { ...album, artistId: null } : album,
    );
  }
}

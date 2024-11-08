import { Injectable } from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { Favorites } from './interfaces/favs.interface';
import { Album } from '../album/interfaces/album.interface';
import { Artist } from '../artist/interfaces/artist.interface';
import { Track } from '../track/interfaces/track.interface';

@Injectable()
export class FavsService {
  private favs: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  private artistData: Artist[] = [];
  private albumData: Album[] = [];
  private trackData: Track[] = [];

  create(createFavDto: CreateFavDto) {
    const { artistId, albumId, trackId } = createFavDto;

    if (artistId) {
      this.favs.artists.push(artistId);
    }
    if (albumId) {
      this.favs.albums.push(albumId);
    }
    if (trackId) {
      this.favs.tracks.push(trackId);
    }

    return this.findAll();
  }

  findAll() {
    const fullArtists = this.favs.artists
      .map((id) => this.artistData.find((artist) => artist.id === id))
      .filter((artist): artist is Artist => artist !== undefined);

    const fullAlbums = this.favs.albums
      .map((id) => this.albumData.find((album) => album.id === id))
      .filter((album): album is Album => album !== undefined);

    const fullTracks = this.favs.tracks
      .map((id) => this.trackData.find((track) => track.id === id))
      .filter((track): track is Track => track !== undefined);

    return {
      artists: fullArtists,
      albums: fullAlbums,
      tracks: fullTracks,
    };
  }

  findOne(id: string, type: 'artist' | 'album' | 'track') {
    switch (type) {
      case 'artist':
        return this.favs.artists.includes(id) ? id : null;
      case 'album':
        return this.favs.albums.includes(id) ? id : null;
      case 'track':
        return this.favs.tracks.includes(id) ? id : null;
      default:
        return null;
    }
  }

  update(id: string, updateFavDto: UpdateFavDto) {
    const { artistId, albumId, trackId } = updateFavDto;

    if (artistId) {
      const index = this.favs.artists.indexOf(id);
      if (index !== -1) {
        this.favs.artists[index] = artistId;
      }
    }

    if (albumId) {
      const index = this.favs.albums.indexOf(id);
      if (index !== -1) {
        this.favs.albums[index] = albumId;
      }
    }

    if (trackId) {
      const index = this.favs.tracks.indexOf(id);
      if (index !== -1) {
        this.favs.tracks[index] = trackId;
      }
    }

    return this.favs;
  }

  remove(id: string, type: 'artist' | 'album' | 'track') {
    switch (type) {
      case 'artist':
        this.favs.artists = this.favs.artists.filter((artist) => artist !== id);
        break;
      case 'album':
        this.favs.albums = this.favs.albums.filter((album) => album !== id);
        break;
      case 'track':
        this.favs.tracks = this.favs.tracks.filter((track) => track !== id);
        break;
      default:
        break;
    }
    return this.favs;
  }
}

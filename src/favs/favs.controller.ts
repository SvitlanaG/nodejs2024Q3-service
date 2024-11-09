import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UnprocessableEntityException,
  NotFoundException,
} from '@nestjs/common';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  async addTrack(@Param('id') id: string) {
    try {
      return await this.favsService.addTrack(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Track does not exist');
      }
      throw error;
    }
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  async addAlbum(@Param('id') id: string) {
    try {
      return await this.favsService.addAlbum(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Album does not exist');
      }
      throw error;
    }
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async addArtist(@Param('id') id: string) {
    try {
      return await this.favsService.addArtist(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException('Artist does not exist');
      }
      throw error;
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    this.favsService.removeArtist(id);
  }
}

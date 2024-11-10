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
import { ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { FavsService } from './favs.service';
import { FavoritesResponse } from './dto/response-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites, split by entity type' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved all favorites',
    type: FavoritesResponse,
  })
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add a track to favorites' })
  @ApiParam({
    name: 'id',
    description: 'Track ID to be added to favorites',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'Track successfully added to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid track ID format (not UUID)',
  })
  @ApiResponse({
    status: 422,
    description: 'Track does not exist',
  })
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
  @ApiOperation({ summary: 'Delete a track from favorites' })
  @ApiParam({
    name: 'id',
    description: 'Track ID to be deleted from favorites',
    type: String,
  })
  @ApiResponse({
    status: 204,
    description: 'Track successfully removed from favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid track ID format (not UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track not found in favorites',
  })
  removeTrack(@Param('id') id: string) {
    this.favsService.removeTrack(id);
  }

  @Post('album/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add an album to favorites' })
  @ApiParam({
    name: 'id',
    description: 'Album ID to be added to favorites',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'Album successfully added to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format (not UUID)',
  })
  @ApiResponse({
    status: 422,
    description: 'Album does not exist',
  })
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
  @ApiOperation({ summary: 'Delete an album from favorites' })
  @ApiParam({
    name: 'id',
    description: 'Album ID to be deleted from favorites',
    type: String,
  })
  @ApiResponse({
    status: 204,
    description: 'Album successfully removed from favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format (not UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found in favorites',
  })
  removeAlbum(@Param('id') id: string) {
    this.favsService.removeAlbum(id);
  }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add an artist to favorites' })
  @ApiParam({
    name: 'id',
    description: 'Artist ID to be added to favorites',
    type: String,
  })
  @ApiResponse({
    status: 201,
    description: 'Artist successfully added to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format (not UUID)',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist does not exist',
  })
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
  @ApiOperation({ summary: 'Delete an artist from favorites' })
  @ApiParam({
    name: 'id',
    description: 'Artist ID to be deleted from favorites',
    type: String,
  })
  @ApiResponse({
    status: 204,
    description: 'Artist successfully removed from favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format (not UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found in favorites',
  })
  removeArtist(@Param('id') id: string) {
    this.favsService.removeArtist(id);
  }
}

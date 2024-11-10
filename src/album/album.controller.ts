import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumResponse } from './dto/response-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new album' })
  @ApiBody({
    description: 'The album data for creation',
    type: CreateAlbumDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Album successfully created',
    type: AlbumResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing required fields or invalid data',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'List of all albums',
    type: [AlbumResponse],
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single album by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The album ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Album record found',
    type: AlbumResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found with the given ID',
  })
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album info' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The album ID',
    required: true,
  })
  @ApiBody({
    description: 'The data required to update the album',
    type: UpdateAlbumDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Album updated successfully',
    type: AlbumResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found with the given ID',
  })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an album by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The album ID to be deleted',
    required: true,
  })
  @ApiResponse({
    status: 204,
    description: 'Album successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid album ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album not found with the given ID',
  })
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}

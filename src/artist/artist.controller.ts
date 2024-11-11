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
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistResponse } from './dto/response-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new artist' })
  @ApiBody({
    description: 'The artist data for creation',
    type: CreateArtistDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Artist successfully created',
    type: ArtistResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing required fields or invalid data',
  })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    description: 'List of all artists',
    type: [ArtistResponse],
  })
  findAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single artist by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The artist ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Artist record found',
    type: ArtistResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found with the given ID',
  })
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist info' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The artist ID',
    required: true,
  })
  @ApiBody({
    description: 'The data required to update the artist',
    type: UpdateArtistDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Artist updated successfully',
    type: ArtistResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found with the given ID',
  })
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an artist by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The artist ID to be deleted',
    required: true,
  })
  @ApiResponse({
    status: 204,
    description: 'Artist successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid artist ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist not found with the given ID',
  })
  remove(@Param('id') id: string) {
    return this.artistService.remove(id);
  }
}

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
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackResponse } from './dto/response-track.dto';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({
    status: 201,
    description: 'The track has been successfully created.',
    type: TrackResponse,
  })
  create(@Body() createTrackDto: CreateTrackDto): TrackResponse {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({
    status: 200,
    description: 'Return all track records',
    type: [TrackResponse],
  })
  findAll(): TrackResponse[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single track by ID' })
  @ApiParam({ name: 'id', description: 'Track ID', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'The found track record',
    type: TrackResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Track with the specified ID does not exist',
  })
  findOne(@Param('id') id: string): TrackResponse {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a track by ID' })
  @ApiParam({ name: 'id', description: 'Track ID', type: 'string' })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({
    status: 200,
    description: 'The updated track record',
    type: TrackResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'Track with the specified ID does not exist',
  })
  update(
    @Param('id') id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ): TrackResponse {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a track by ID' })
  @ApiParam({ name: 'id', description: 'Track ID', type: 'string' })
  @ApiResponse({
    status: 204,
    description: 'The track has been successfully deleted',
  })
  @ApiResponse({
    status: 404,
    description: 'Track with the specified ID does not exist',
  })
  remove(@Param('id') id: string): void {
    this.trackService.remove(id);
  }
}

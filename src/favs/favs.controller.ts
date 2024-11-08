import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post()
  create(@Body() createFavDto: CreateFavDto) {
    return this.favsService.create(createFavDto);
  }

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('type') type: 'artist' | 'album' | 'track',
  ) {
    return this.favsService.findOne(id, type);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFavDto: UpdateFavDto) {
    return this.favsService.update(id, updateFavDto);
  }

  @Delete(':id')
  remove(
    @Param('id') id: string,
    @Query('type') type: 'artist' | 'album' | 'track',
  ) {
    return this.favsService.remove(id, type);
  }
}

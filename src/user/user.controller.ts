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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponse } from './dto/response-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    description: 'The user data for creation',
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: UserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - Missing required fields or invalid data',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponse],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The user ID',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User record found',
    type: UserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the given ID',
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user password' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The user ID',
    required: true,
  })
  @ApiBody({
    description: 'The data required to update the password',
    type: UpdatePasswordDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Password updated successfully',
    type: UserResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the given ID',
  })
  @ApiResponse({
    status: 403,
    description: 'Incorrect old password',
  })
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'The user ID to be deleted',
    required: true,
  })
  @ApiResponse({
    status: 204,
    description: 'User successfully deleted',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user ID format (not a valid UUID)',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found with the given ID',
  })
  remove(@Param('id') id: string) {
    this.userService.remove(id);
  }
}

import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({
    description: 'The user ID (UUID)',
    example: 'a29bbb80-cb76-4de6-a338-2b7dac4f44a7',
  })
  id: string;

  @ApiProperty({ description: 'The user login', example: 'test_user' })
  login: string;

  @ApiProperty({ description: 'The user version number', example: 1 })
  version: number;

  @ApiProperty({
    description: 'The timestamp when the user was created',
    example: 1616870789,
  })
  createdAt: number;

  @ApiProperty({
    description: 'The timestamp when the user was last updated',
    example: 1616870889,
  })
  updatedAt: number;
}

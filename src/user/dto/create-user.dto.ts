import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The login of the user',
    example: 'testUser',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    description: 'Confirm the password',
    example: 'SecurePassword123',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}

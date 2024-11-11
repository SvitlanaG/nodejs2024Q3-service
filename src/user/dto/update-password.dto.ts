import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    description: 'The current password of the user',
    example: 'SecurePassword123',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    description: 'The new password to be set',
    example: 'newSecurePassword456',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

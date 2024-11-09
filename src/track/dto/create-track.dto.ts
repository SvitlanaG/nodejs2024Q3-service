import {
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
  Min,
  IsNotEmpty,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @Min(1)
  duration: number;
}

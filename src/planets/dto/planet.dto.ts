import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreatePlanetDTO {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsBoolean()
  isDestroyed: boolean;

  @IsString()
  description: string;
}

export class UpdatePlanetDTO {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsBoolean()
  isDestroyed: boolean;

  @IsOptional()
  @IsString()
  description: string;
}

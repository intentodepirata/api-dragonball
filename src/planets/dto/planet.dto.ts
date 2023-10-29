import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
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

//Agregar todos los campos opcionales
export class UpdatePlanetDTO extends PartialType(CreatePlanetDTO) {}

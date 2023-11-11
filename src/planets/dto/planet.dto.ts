import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
export class CreatePlanetDTO {
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  isDestroyed: boolean;
  @ApiProperty()
  @IsString()
  description: string;
}

//Agregar todos los campos opcionales
export class UpdatePlanetDTO extends PartialType(CreatePlanetDTO) {}

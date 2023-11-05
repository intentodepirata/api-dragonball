import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Affiliation } from 'src/constants/affiliation';
import { Gender } from 'src/constants/gender';
import { Race } from 'src/constants/race';
import { Planet } from 'src/planets/entities/planet.entity';

export class CreateCharacterDTO {
  @IsString()
  name: string;

  @IsEnum(Race)
  race: Race;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  ki: string;

  @IsString()
  maxKi: string;

  @IsString()
  description: string;

  @IsEnum(Affiliation)
  affiliation: Affiliation;

  @IsString()
  originPlanet: string;
}

//Agregar todos los campos opcionales
export class UpdateCharacterDTO extends PartialType(CreateCharacterDTO) {}

import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Affiliation } from 'src/constants/affiliation';
import { Gender } from 'src/constants/gender';
import { Race } from 'src/constants/race';

export class CreateCharacterDTO {
  @IsString()
  name: string;

  @IsEnum(Race)
  race: Race;

  @IsEnum(Gender)
  gender: Gender;

  @IsString()
  age: string;

  @IsInt()
  maxKi: number;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsEnum(Affiliation)
  affiliation: Affiliation;
}

//Agregar todos los campos opcionales
export class UpdateCharacterDTO extends PartialType(CreateCharacterDTO) {}

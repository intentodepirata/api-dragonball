import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Affiliation } from 'src/constants/affiliation';
import { Gender } from 'src/constants/gender';
import { Race } from 'src/constants/race';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

export class CreateCharacterDTO {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ enum: Race })
  @IsEnum(Race)
  race: Race;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty()
  @IsString()
  ki: string;

  @ApiProperty()
  @IsString()
  maxKi: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ enum: Affiliation })
  @IsEnum(Affiliation)
  affiliation: Affiliation;

  @ApiProperty()
  @IsString()
  originPlanet: string;
}

//Agregar todos los campos opcionales
export class UpdateCharacterDTO extends PartialType(CreateCharacterDTO) {}
